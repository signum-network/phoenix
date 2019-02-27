import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';

import { StoreService } from 'app/store/store.service';
import { Settings } from 'app/settings';
import { Account, composeApi, ApiSettings, Api, TransactionList, AliasList, Balance, UnconfirmedTransactionList } from '@burstjs/core';
import { generateMasterKeys, Keys, encryptAES, hashSHA256, getAccountIdFromPublicKey } from '@burstjs/crypto';
import { isBurstAddress, convertNumericIdToAddress, convertAddressToNumericId, convertNumberToNQTString, convertNQTStringToNumber } from '@burstjs/util';
import { environment } from 'environments/environment';


@Injectable()
export class AccountService {
  private nodeUrl: string;
  private api: Api;

  public currentAccount: BehaviorSubject<any> = new BehaviorSubject(undefined);

  constructor(private storeService: StoreService) {
    this.storeService.settings.subscribe((settings: Settings) => {
      this.nodeUrl = settings.node;
    });

    const apiSettings = new ApiSettings(environment.defaultNode, 'burst');
    this.api = composeApi(apiSettings);
  }

  public setCurrentAccount(account: Account): void {
    this.currentAccount.next(account);
  }

  // FIXME: any as return type is shitty...will introduce a better execption handling
  public getAccountTransactions(id: string): Promise<TransactionList | any> {
    return this.api.account.getAccountTransactions(id);
  }

  public generateSendTransactionQRCodeAddress(id: string): Promise<string> {
    return this.api.account.generateSendTransactionQRCodeAddress(id);
  }

  public getAliases(id: string): Promise<AliasList> {
    return this.api.account.getAliases(id);
  }

  public getAccountBalance(id: string): Promise<Balance> {
    return this.api.account.getAccountBalance(id);
  }

  public getUnconfirmedTransactions(id: string): Promise<UnconfirmedTransactionList> {
    return this.api.account.getUnconfirmedAccountTransactions(id);
  }

  /*
  * Method responsible for creating a new active account from a passphrase.
  * Generates keys for an account, encrypts them with the provided key and saves them.
  * TODO: error handling of asynchronous method calls
  */
  public createActiveAccount({ passphrase, pin = '' }): Promise<Account> {
    return new Promise(async (resolve, reject) => {
      const account: Account = new Account();
      // import active account
      account.type = 'active';
      const keys = generateMasterKeys(passphrase);

      const newKeys = new Keys();
      newKeys.publicKey = keys.publicKey;

      const encryptedKey = encryptAES(keys.signPrivateKey, hashSHA256(pin));
      newKeys.signPrivateKey = encryptedKey;

      const encryptedSignKey = encryptAES(keys.agreementPrivateKey, hashSHA256(pin));
      newKeys.agreementPrivateKey = encryptedSignKey;
      account.keys = newKeys;
      account.pinHash = hashSHA256(pin + keys.publicKey);

      const id = getAccountIdFromPublicKey(keys.publicKey);
      account.id = id;

      const address = convertNumericIdToAddress(id);
      account.address = address;

      await this.selectAccount(account);
      return this.storeService.saveAccount(account)
        .then(acc => {
          resolve(acc);
        });
    });
  }

  /*
  * Method responsible for importing an offline account.
  * Creates an account object with no keys attached.
  */
  public createOfflineAccount(address: string): Promise<Account> {
    return new Promise((resolve, reject) => {

      if (!isBurstAddress(address)) {
        reject('Invalid Burst Address');
      }

      const account: Account = new Account();
      const accountId = convertAddressToNumericId(address);
      this.storeService.findAccount(accountId)
        .then(async found => {
          if (found === undefined) {
            // import offline account
            account.type = 'offline';
            account.address = address;
            account.id = accountId;
            await this.selectAccount(account);
            return this.storeService.saveAccount(account)
              .then(resolve);
          } else {
            reject('Burstcoin address already imported!');
          }
        });
    });
  }

  /*
  * Method responsible for removing an existing account.
  */
  public removeAccount(account: Account): Promise<boolean> {
    return this.storeService.removeAccount(account).catch(error => error)
  }

  /*
  * Method responsible for selecting a different account.
  */
  public selectAccount(account: Account): Promise<Account> {
    return new Promise((resolve, reject) => {
      this.storeService.selectAccount(account)
        .then(account => {
          // this.synchronizeAccount(account);
        });
      this.setCurrentAccount(account);
      resolve(account);
    });
  }


  /*
  * Method responsible for synchronizing an account with the blockchain.
  */
  public synchronizeAccount(account: Account): Promise<Account> {
    return new Promise(async (resolve, reject) => {
      try {
        const balance = await this.getAccountBalance(account.id);
        // @ts-ignore
        if (balance.errorCode) {
          // @ts-ignore
          throw new Error(balance.errorDescription);
        }
        account.balance = convertNQTStringToNumber(balance.balanceNQT);
        account.unconfirmedBalance = convertNQTStringToNumber(balance.unconfirmedBalanceNQT);
        const transactions = await this.getAccountTransactions(account.id);
        account.transactions = transactions;
        const unconfirmedTransactionsResponse = await this.getUnconfirmedTransactions(account.id)
        account.transactions = unconfirmedTransactionsResponse.unconfirmedTransactions
          .concat(account.transactions);
        this.storeService.saveAccount(account).catch(error => { reject(error) })
        resolve(account);
      } catch(e) {
        console.log(e);
      }
    });
  }
}
