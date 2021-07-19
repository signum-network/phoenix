import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {environment} from 'environments/environment';
import {StoreService} from 'app/store/store.service';

import {
  Account,
  Address,
  AliasList,
  Api,
  Asset,
  AssetList,
  Balance,
  BlockList,
  Transaction,
  TransactionId,
  TransactionList,
  TransactionMiningSubtype,
  TransactionType,
  UnconfirmedTransactionList
} from '@signumjs/core';
import {decryptAES, encryptAES, generateMasterKeys, hashSHA256, Keys} from '@signumjs/crypto';
import {Amount} from '@signumjs/util';
import {HttpClientFactory, HttpError} from '@signumjs/http';
import {ApiService} from '../../api.service';
import {I18nService} from 'app/layout/components/i18n/i18n.service';
import {NetworkService} from '../../network/network.service';
import {KeyDecryptionException} from '../../util/exceptions/KeyDecryptionException';
import {AddressPrefix, GetAccountTransactionsArgs} from '@signumjs/core/src';
import {adjustLegacyAddressPrefix} from '../../util/adjustLegacyAddressPrefix';
import {uniqBy} from 'lodash';

interface SetAccountInfoRequest {
  name: string;
  description: string;
  deadline: number;
  feePlanck: string;
  pin: string;
  keys: Keys;
}

interface SetRewardRecipientRequest {
  recipientId: string;
  deadline: number;
  feePlanck: string;
  pin: string;
  keys: Keys;
}

interface SetAliasRequest {
  aliasName: string;
  aliasURI: string;
  deadline: number;
  feeNQT: string;
  pin: string;
  keys: Keys;
}

interface SetCommitmentRequest {
  amountPlanck: string;
  feePlanck: string;
  pin: string;
  keys: Keys;
  isRevoking: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class AccountService {
  public currentAccount: BehaviorSubject<Account> = new BehaviorSubject(undefined);
  private api: Api;
  private transactionsSeenInNotifications: string[] = [];
  private accountPrefix: AddressPrefix.MainNet | AddressPrefix.TestNet;

  constructor(private storeService: StoreService,
              private networkService: NetworkService,
              private apiService: ApiService,
              private i18nService: I18nService) {
    this.storeService.settings.subscribe(() => {
      this.api = this.apiService.api;
    });

    this.networkService.isMainNet$.subscribe(() => {
      this.accountPrefix = this.networkService.isMainNet() ? AddressPrefix.MainNet : AddressPrefix.TestNet;
    });
  }

  public setCurrentAccount(account: Account): void {
    this.currentAccount.next(account);
  }

  public async getAddedCommitments(account: Account): Promise<TransactionList> {
    return this.api.account.getAccountTransactions({
      accountId: account.account,
      type: TransactionType.Mining,
      subtype: TransactionMiningSubtype.AddCommitment,
      includeIndirect: false,
    });
  }

  public async getAccountTransactions(args: GetAccountTransactionsArgs
  ): Promise<TransactionList> {
    args.includeIndirect = true;
    try {
      const transactions = await this.api.account.getAccountTransactions(args);
      return Promise.resolve(transactions);
    } catch (e) {
      const EC_INVALID_ARG = 4;
      if (e.data.errorCode === EC_INVALID_ARG) {
        return await this.api.account.getAccountTransactions(args);
      } else {
        throw e;
      }
    }
  }

  public generateSendTransactionQRCodeAddress(
    id: string,
    amountNQT?: number,
    feeSuggestionType?: string,
    feeNQT?: number,
    immutable?: boolean): Promise<string> {
    return this.api.account.generateSendTransactionQRCodeAddress(
      id,
      amountNQT,
      feeSuggestionType,
      feeNQT,
      immutable
    );
  }

  public getAlias(name: string): Promise<any> {
    return this.api.alias.getAliasByName(name);
  }

  public getAliases(id: string): Promise<AliasList> {
    return this.api.account.getAliases(id);
  }

  public getAsset(id: string): Promise<Asset> {
    return this.api.asset.getAsset(id);
  }

  public getAssets(id: number): Promise<AssetList> {
    return this.api.asset.getAllAssets(id);
  }

  public setAlias({aliasName, aliasURI, feeNQT, deadline, pin, keys}: SetAliasRequest): Promise<TransactionId> {
    const senderPrivateKey = this.getPrivateKey(keys, pin);
    return this.api.account.setAlias(aliasName, aliasURI, feeNQT, keys.publicKey, senderPrivateKey, deadline);
  }

  private getPrivateKey(keys, pin): string {
    try {
      const privateKey = decryptAES(keys.signPrivateKey, hashSHA256(pin));
      if (!privateKey) {
        throw new Error('Key Decryption Exception');
      }
      return privateKey;
    } catch (e) {
      throw new KeyDecryptionException();
    }
  }

  public getAccountBalance(id: string): Promise<Balance> {
    return this.api.account.getAccountBalance(id);
  }

  public getUnconfirmedTransactions(id: string): Promise<UnconfirmedTransactionList> {
    return this.api.account.getUnconfirmedAccountTransactions(id);
  }

  public async getAccount(accountId: string): Promise<Account> {
    const supportsPocPlus = await this.apiService.supportsPocPlus();
    const includeCommittedAmount = supportsPocPlus || undefined;
    const account = await this.api.account.getAccount({
      accountId,
      includeCommittedAmount,
    });

    return adjustLegacyAddressPrefix(account);
  }

  public getCurrentAccount(): Promise<Account> {
    return Promise.resolve(this.currentAccount.getValue());
  }

  public setAccountInfo({name, description, feePlanck, deadline, pin, keys}: SetAccountInfoRequest): Promise<TransactionId> {
    const senderPrivateKey = this.getPrivateKey(keys, pin);
    return this.api.account.setAccountInfo({
      name,
      description,
      feePlanck,
      senderPrivateKey,
      senderPublicKey: keys.publicKey,
      deadline
    });
  }

  public setRewardRecipient({recipientId, feePlanck, deadline, pin, keys}: SetRewardRecipientRequest): Promise<TransactionId> {
    const senderPrivateKey = this.getPrivateKey(keys, pin);
    return this.api.account.setRewardRecipient({
      recipientId,
      senderPrivateKey,
      senderPublicKey: keys.publicKey,
      deadline,
      feePlanck,
    });
  }

  public async getRewardRecipient(recipientId: string): Promise<Account | null> {
    const {rewardRecipient} = await this.api.account.getRewardRecipient(recipientId);
    return rewardRecipient
      ? this.api.account.getAccount({accountId: rewardRecipient})
      : null;
  }

  public setCommitment({amountPlanck, feePlanck, pin, keys, isRevoking}: SetCommitmentRequest): Promise<TransactionId> {
    const senderPrivateKey = this.getPrivateKey(keys, pin);

    const args = {
      amountPlanck,
      senderPrivateKey,
      senderPublicKey: keys.publicKey,
      feePlanck,
    };

    return isRevoking
      ? this.api.account.removeCommitment(args)
      : this.api.account.addCommitment(args);
  }

  public createActiveAccount({passphrase, pin = ''}): Promise<Account> {
    return new Promise(async (resolve, reject) => {
      const account: Account = new Account();
      // import active account
      account.type = 'active';
      account.confirmed = false;
      const keys = generateMasterKeys(passphrase);
      const encryptedKey = encryptAES(keys.signPrivateKey, hashSHA256(pin));
      const encryptedSignKey = encryptAES(keys.agreementPrivateKey, hashSHA256(pin));

      account.keys = {
        publicKey: keys.publicKey,
        signPrivateKey: encryptedKey,
        agreementPrivateKey: encryptedSignKey
      };
      account.pinHash = hashSHA256(pin + keys.publicKey);

      const address = Address.fromPublicKey(keys.publicKey, this.accountPrefix);
      account.account = address.getNumericId();
      account.accountRS = address.getReedSolomonAddress();

      await this.selectAccount(account);
      const savedAccount = await this.synchronizeAccount(account);
      resolve(savedAccount);
    });
  }

  public async createOfflineAccount(reedSolomonAddress: string): Promise<Account> {
    const account: Account = new Account();
    const address = Address.fromReedSolomonAddress(reedSolomonAddress);
    const existingAccount = await this.storeService.findAccount(address.getNumericId());
    if (existingAccount === undefined) {
      // import offline account
      account.type = 'offline';
      account.confirmed = false;
      account.accountRS = reedSolomonAddress;
      account.account = address.getNumericId();
      await this.selectAccount(account);
      return this.synchronizeAccount(account);
    } else {
      throw new Error('Address already imported!');
    }
  }

  public removeAccount(account: Account): Promise<boolean> {
    return this.storeService.removeAccount(account).catch(error => error);
  }

  public selectAccount(account: Account): Promise<Account> {
    return new Promise((resolve, reject) => {
      this.storeService.selectAccount(account)
        .then(acc => {
          this.synchronizeAccount(acc);
        });
      this.setCurrentAccount(account);
      resolve(account);
    });
  }

  public synchronizeAccount(account: Account): Promise<Account> {
    return new Promise(async (resolve, reject) => {
      await this.syncAccountDetails(account);
      await this.syncAccountTransactions(account);
      await this.syncAccountUnconfirmedTransactions(account);
      this.storeService.saveAccount(account).catch(reject);
      resolve(account);
    });
  }

  public isNewTransaction(transactionId: string): boolean {
    return (!this.transactionsSeenInNotifications[transactionId]);
  }

  public sendNewTransactionNotification(transaction: Transaction): void {


    // TODO: create a notification factory according the type and show proper notifications
    if (transaction.type !== TransactionType.Payment) {
      return;
    }

    this.transactionsSeenInNotifications[transaction.transaction] = true;
    const incoming = transaction.recipient === this.currentAccount.value.account;
    const amount = Amount.fromPlanck(transaction.amountNQT);
    const totalAmount = amount.clone().add(Amount.fromPlanck(transaction.feeNQT));

    let header = '';
    let body = '';
    if (incoming) {
      // Account __a__ got __b__ from __c__
      header = this.i18nService.getTranslation('youve_got_burst');
      body = this.i18nService.getTranslation('youve_got_from')
        .replace('__a__', transaction.recipientRS)
        .replace('__b__', totalAmount.toString())
        .replace('__c__', transaction.senderRS);
    } else {
      // Account __a__ sent __b__ to __c__
      header = this.i18nService.getTranslation('you_sent_burst');
      body = this.i18nService.getTranslation('you_sent_to')
        .replace('__a__', transaction.senderRS)
        .replace('__b__', totalAmount.toString())
        .replace('__c__', transaction.recipientRS);
    }

    // @ts-ignore
    return window.Notification && new window.Notification(
      header,
      {
        body,
        title: 'Phoenix'
      });

  }

  public async syncAccountUnconfirmedTransactions(account: Account): Promise<void> {
    try {
      const unconfirmedTransactionsResponse = await this.getUnconfirmedTransactions(account.account);
      account.transactions = uniqBy(unconfirmedTransactionsResponse.unconfirmedTransactions.concat(account.transactions), 'transaction');

      // @ts-ignore - Send notifications for new transactions
      if (window.Notification) {
        unconfirmedTransactionsResponse.unconfirmedTransactions
          .sort((a, b) => a.timestamp > b.timestamp ? -1 : 1)
          .filter(({transaction}) => this.isNewTransaction(transaction))
          .map((transaction) => this.sendNewTransactionNotification(transaction));
      }
    } catch (e) {
      console.log(e);
    }
  }

  public async syncAccountTransactions(account: Account): Promise<void> {
    try {
      const {account: accountId, transactions} = account;
      let transactionList = transactions.slice(0, 500); // max supported tx
      if (transactions.length > 0) {
        const timestamp = transactions[0].timestamp.toString(10);
        const {transactions: recentTransactions} = await this.getAccountTransactions({
          accountId,
          timestamp
        });
        transactionList = recentTransactions.concat(transactions);
      } else {
        transactionList = (await this.getAccountTransactions({accountId})).transactions;
      }
      account.transactions = uniqBy(transactionList, 'transaction');
    } catch (e) {
      account.transactions = [];
    }
  }

  private async syncAccountDetails(account: Account): Promise<void> {
    try {
      const remoteAccount = await this.getAccount(account.account);
      // Only update what you really need...
      // ATTENTION: Do not try to iterate over all keys and update then
      // It will fail :shrug
      account.name = remoteAccount.name;
      account.description = remoteAccount.description;
      account.assetBalances = remoteAccount.assetBalances;
      account.unconfirmedAssetBalances = remoteAccount.unconfirmedAssetBalances;
      account.committedBalanceNQT = remoteAccount.committedBalanceNQT;
      account.balanceNQT = remoteAccount.balanceNQT;
      account.unconfirmedBalanceNQT = remoteAccount.unconfirmedBalanceNQT;
      account.accountRSExtended = remoteAccount.accountRSExtended;
      // @ts-ignore
      account.confirmed = !!remoteAccount.publicKey;
    } catch (e) {
      account.confirmed = false;
      console.log(e);
    }
  }

  public async activateAccount(account: Account): Promise<void> {
    try {

      if (!account.keys) {
        console.warn('Account does not have keys...ignored');
        return;
      }

      const isMainNet = this.networkService.isMainNet();
      const activatorUrl = isMainNet
        ? environment.activatorServiceUrl.mainNet
        : environment.activatorServiceUrl.testNet;

      const http = HttpClientFactory.createHttpClient(activatorUrl);
      const payload = {
        account: account.account,
        publickey: account.keys.publicKey,
        ref: `phoenix-${environment.version}`
      };
      await http.post('/api/activate', payload);
    } catch (e) {
      if (e instanceof HttpError) {
        const message = e.data && e.data.message;
        throw new Error(message || 'Unknown Error while requesting activation service');
      }
      throw e;
    }
  }

  public async getForgedBlocks(account: Account): Promise<BlockList> {
    return this.api.account.getAccountBlocks({accountId: account.account});
  }


}
