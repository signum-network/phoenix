import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from 'environments/environment';
import { StoreService } from 'app/store/store.service';

import {
  Address,
  Api,
  Balance,
  BlockList,
  Transaction,
  TransactionId,
  TransactionList,
  TransactionMiningSubtype,
  TransactionType,
  UnconfirmedTransactionList,
  GetAccountTransactionsArgs
} from '@signumjs/core';
import { decryptAES, encryptAES, generateMasterKeys, hashSHA256, Keys } from '@signumjs/crypto';
import { Amount } from '@signumjs/util';
import { HttpClientFactory, HttpError } from '@signumjs/http';
import { ApiService } from '../../api.service';
import { I18nService } from 'app/layout/components/i18n/i18n.service';
import { NetworkService } from '../../network/network.service';
import { KeyDecryptionException } from '../../util/exceptions/KeyDecryptionException';
import { adjustLegacyAddressPrefix } from '../../util/adjustLegacyAddressPrefix';
import { uniqBy } from 'lodash';
import { Settings } from '../../store/settings';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { WalletAccount } from 'app/util/WalletAccount';
import { DescriptorData } from '@signumjs/standards';
import { constants } from '../../constants';

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
  public currentAccount$: BehaviorSubject<WalletAccount> = new BehaviorSubject(undefined);
  private transactionsSeenInNotifications: string[] = [];
  private accountPrefix: string;
  private showDesktopNotifications: boolean;

  constructor(private storeService: StoreService,
              private networkService: NetworkService,
              private progressBarService: FuseProgressBarService,
              private apiService: ApiService,
              private i18nService: I18nService) {
    this.storeService.settingsUpdated$.subscribe((settings: Settings) => {
      if (!settings){ return; }
      this.showDesktopNotifications = settings.showDesktopNotifications;
    });

    this.networkService.networkInfo$.subscribe(() => {
      this.accountPrefix = this.networkService.getAddressPrefix();
    });
  }

  // public updateCurrentAccount(account: WalletAccount): void {
  //   this.currentAccount$.next(account);
  // }

  public async getAddedCommitments(account: WalletAccount): Promise<TransactionList> {
    return this.apiService.ledger.account.getAccountTransactions({
      accountId: account.account,
      type: TransactionType.Mining,
      subtype: TransactionMiningSubtype.AddCommitment,
      includeIndirect: false
    });
  }

  public async getAccountTransactions(args: GetAccountTransactionsArgs
  ): Promise<TransactionList> {
    args.includeIndirect = true;
    args.resolveDistributions = true;
    try {
      const transactions = await this.apiService.ledger.account.getAccountTransactions(args);
      return Promise.resolve(transactions);
    } catch (e) {
      const EC_INVALID_ARG = 4;
      if (e.data.errorCode === EC_INVALID_ARG) {
        return this.apiService.ledger.account.getAccountTransactions(args);
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
    return this.apiService.ledger.account.generateSendTransactionQRCodeAddress(
      id,
      amountNQT,
      feeSuggestionType,
      feeNQT,
      immutable
    );
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
    return this.apiService.ledger.account.getAccountBalance(id);
  }

  public getUnconfirmedTransactions(id: string): Promise<UnconfirmedTransactionList> {
    return this.apiService.ledger.account.getUnconfirmedAccountTransactions(id);
  }

  public async getAccount(accountId: string): Promise<WalletAccount> {
    // const supportsPocPlus = await this.apiService.supportsPocPlus();
    // const includeCommittedAmount = supportsPocPlus || undefined;
    const account = await this.apiService.ledger.account.getAccount({
      accountId,
      includeCommittedAmount: true,
      includeEstimatedCommitment: true
    });
    return adjustLegacyAddressPrefix(new WalletAccount(account));
  }

  public getCurrentAccount(): Promise<WalletAccount> {
    return Promise.resolve(this.currentAccount$.getValue());
  }

  public setAccountInfo({
                          name,
                          description,
                          feePlanck,
                          deadline,
                          pin,
                          keys
                        }: SetAccountInfoRequest): Promise<TransactionId> {
    const senderPrivateKey = this.getPrivateKey(keys, pin);
    return this.apiService.ledger.account.setAccountInfo({
      name,
      description,
      feePlanck,
      senderPrivateKey,
      senderPublicKey: keys.publicKey,
      deadline
    }) as Promise<TransactionId>;
  }

  public setRewardRecipient({
                              recipientId,
                              feePlanck,
                              deadline,
                              pin,
                              keys
                            }: SetRewardRecipientRequest): Promise<TransactionId> {
    const senderPrivateKey = this.getPrivateKey(keys, pin);
    return this.apiService.ledger.account.setRewardRecipient({
      recipientId,
      senderPrivateKey,
      senderPublicKey: keys.publicKey,
      deadline,
      feePlanck
    }) as Promise<TransactionId>;
  }

  public async getRewardRecipient(recipientId: string): Promise<WalletAccount | null> {
    const { rewardRecipient } = await this.apiService.ledger.account.getRewardRecipient(recipientId);
    if (rewardRecipient) {
      const acct = await this.apiService.ledger.account.getAccount({ accountId: rewardRecipient });
      return new WalletAccount(acct);
    }
    return null;
  }

  public setCommitment({
                         amountPlanck,
                         feePlanck,
                         pin,
                         keys,
                         isRevoking
                       }: SetCommitmentRequest): Promise<TransactionId> {
    const senderPrivateKey = this.getPrivateKey(keys, pin);

    const args = {
      amountPlanck,
      senderPrivateKey,
      senderPublicKey: keys.publicKey,
      feePlanck
    };

    return (isRevoking
      ? this.apiService.ledger.account.removeCommitment(args)
      : this.apiService.ledger.account.addCommitment(args)) as Promise<TransactionId>;
  }

  public createActiveAccount({ passphrase, pin = '' }): Promise<WalletAccount> {
    return new Promise(async (resolve) => {
      const account = new WalletAccount();
      account.type = 'active';
      const keys = generateMasterKeys(passphrase);
      const encryptedKey = encryptAES(keys.signPrivateKey, hashSHA256(pin));
      const encryptedSignKey = encryptAES(keys.agreementPrivateKey, hashSHA256(pin));

      account.keys = {
        publicKey: keys.publicKey,
        signPrivateKey: encryptedKey,
        agreementPrivateKey: encryptedSignKey
      };

      const address = Address.fromPublicKey(keys.publicKey, this.accountPrefix);
      account.account = address.getNumericId();
      account.accountRS = address.getReedSolomonAddress();

      await this.selectAccount(account);
      const savedAccount = await this.synchronizeAccount(account);
      resolve(savedAccount);
    });
  }

  public async createOfflineAccount(reedSolomonAddress: string): Promise<WalletAccount> {
    const account = new WalletAccount();
    const address = Address.fromReedSolomonAddress(reedSolomonAddress);
    const existingAccount = await this.storeService.findAccountByIdLegacy(address.getNumericId());
    if (existingAccount === undefined) {
      account.type = 'offline';
      account.accountRS = reedSolomonAddress;
      account.account = address.getNumericId();
      await this.selectAccount(account);
      return this.synchronizeAccount(account);
    } else {
      throw new Error('Address already imported!');
    }
  }

  public removeAccount(account: WalletAccount): Promise<boolean> {
    return this.storeService.removeAccountLegacy(account).catch(error => error);
  }

  public async selectAccount(account: WalletAccount): Promise<WalletAccount> {
    this.currentAccount$.next(account);
    let acc = await this.storeService.selectAccountLegacy(account);
    acc = await this.synchronizeAccount(acc);
    return acc;
  }

  public async synchronizeAccount(account: WalletAccount, onlyPendingTransactions = false): Promise<WalletAccount> {
    if (onlyPendingTransactions) {
      await this.syncAccountUnconfirmedTransactions(account);
    } else {
      await Promise.all([
        this.syncAccountDetails(account),
        this.syncAccountTransactions(account),
        this.syncAccountUnconfirmedTransactions(account)
      ]);
    }
    // TODO: verify if this really works
    // if (account.account === this.currentAccount$.getValue().account) {
    //   this.updateCurrentAccount(account); // emits update event
    // }

    this.storeService.saveAccount(account);
    return account;
  }

  public isNewTransaction(transactionId: string): boolean {
    return (!this.transactionsSeenInNotifications[transactionId]);
  }

  public sendNewTransactionNotification(transaction: Transaction): void {

    if (!this.showDesktopNotifications) {
      return;
    }

    // TODO: create a notification factory according the type and show proper notifications
    if (transaction.type !== TransactionType.Payment) {
      return;
    }

    this.transactionsSeenInNotifications[transaction.transaction] = true;
    const incoming = transaction.recipient === this.currentAccount$.value.account;
    const amount = Amount.fromPlanck(transaction.amountNQT);
    const totalAmount = amount.clone().add(Amount.fromPlanck(transaction.feeNQT));


    let header = '';
    let body = '';
    if (incoming) {
      // Account __a__ got __b__ from __c__
      header = this.i18nService.getTranslation('youve_got_burst');
      body = this.i18nService.getTranslation('youve_got_from')
        .replace('__a__', transaction.recipientRS)
        .replace('__b__', amount.toString())
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

  private async syncAccountUnconfirmedTransactions(account: WalletAccount): Promise<void> {
    try {
      const orderByTimestamp = (a, b) => a.timestamp > b.timestamp ? -1 : 1;
      const unconfirmedTransactionsResponse = await this.getUnconfirmedTransactions(account.account);
      const unconfirmed = unconfirmedTransactionsResponse.unconfirmedTransactions.sort(orderByTimestamp);
      account.transactions = uniqBy(unconfirmed.concat(account.transactions), 'transaction');

      // @ts-ignore - Send notifications for new transactions
      if (window.Notification) {
        unconfirmed
          .filter(({ transaction }) => this.isNewTransaction(transaction))
          .map((transaction) => this.sendNewTransactionNotification(transaction));
      }
    } catch (e) {
      console.log(e);
    }
  }

  private async syncAccountTransactions(account: WalletAccount): Promise<void> {
    try {
      const { account: accountId, transactions } = account;
      let transactionList = transactions.slice(0, 500); // max supported tx
      if (transactions.length > 0) {
        const timestamp = transactions[0].timestamp.toString(10);
        const { transactions: recentTransactions } = await this.getAccountTransactions({
          accountId,
          timestamp
        });
        transactionList = recentTransactions.concat(transactions);
      } else {
        transactionList = (await this.getAccountTransactions({ accountId })).transactions;
      }
      account.transactions = uniqBy(transactionList, 'transaction');
    } catch (e) {
      account.transactions = [];
    }
  }

  private async syncAccountDetails(account: WalletAccount): Promise<void> {
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
      account.accountRS = remoteAccount.accountRS;
      if (!remoteAccount.keys) {
        console.log('no keys - syncAccountDetails', remoteAccount);
      }
    } catch (e) {
      console.warn(e);
    }
  }

  public async activateAccount(account: WalletAccount): Promise<void> {
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

  public async getForgedBlocks(account: WalletAccount): Promise<BlockList> {
    return this.apiService.ledger.account.getAccountBlocks({ accountId: account.account });
  }


  public getAvatarUrlFromAccount(account: WalletAccount): string {
    try {
      const descriptor = DescriptorData.parse(account.description, false);
      return `${constants.ipfsGateway}/${descriptor.avatar.ipfsCid}`;
    } catch (e) {
      return '';
    }
  }

}
