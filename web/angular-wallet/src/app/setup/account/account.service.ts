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
import { I18nService } from 'app/shared/services/i18n.service';
import { NetworkService } from 'app/network/network.service';
import { KeyDecryptionException } from 'app/util/exceptions/KeyDecryptionException';
import { adjustLegacyAddressPrefix } from 'app/util/adjustLegacyAddressPrefix';
import { Settings } from 'app/store/settings';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { WalletAccount } from 'app/util/WalletAccount';
import { DescriptorData } from '@signumjs/standards';
import { constants } from 'app/constants';
import { LedgerService } from 'app/ledger.service';

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
  private showDesktopNotifications: boolean;

  constructor(private storeService: StoreService,
              private networkService: NetworkService,
              private progressBarService: FuseProgressBarService,
              private ledgerService: LedgerService,
              private i18nService: I18nService) {
    this.storeService.settingsUpdated$.subscribe((settings: Settings) => {
      if (!settings){ return; }
      this.showDesktopNotifications = settings.showDesktopNotifications;
    });
  }

  public async getAddedCommitments(account: WalletAccount): Promise<TransactionList> {
    return this.ledgerService.ledger.account.getAccountTransactions({
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
      const transactions = await this.ledgerService.ledger.account.getAccountTransactions(args);
      return Promise.resolve(transactions);
    } catch (e) {
      const EC_INVALID_ARG = 4;
      if (e.data.errorCode === EC_INVALID_ARG) {
        return this.ledgerService.ledger.account.getAccountTransactions(args);
      } else {
        throw e;
      }
    }
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


  public getUnconfirmedTransactions(id: string): Promise<UnconfirmedTransactionList> {
    return this.ledgerService.ledger.account.getUnconfirmedAccountTransactions(id);
  }

  public async getAccount(accountId: string): Promise<WalletAccount> {
    const account = await this.ledgerService.ledger.account.getAccount({
      accountId,
      includeCommittedAmount: true,
      includeEstimatedCommitment: true
    });
    return new WalletAccount(account);
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
    return this.ledgerService.ledger.account.setAccountInfo({
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
    return this.ledgerService.ledger.account.setRewardRecipient({
      recipientId,
      senderPrivateKey,
      senderPublicKey: keys.publicKey,
      deadline,
      feePlanck
    }) as Promise<TransactionId>;
  }

  public async getRewardRecipient(recipientId: string): Promise<WalletAccount | null> {
    const { rewardRecipient } = await this.ledgerService.ledger.account.getRewardRecipient(recipientId);
    if (rewardRecipient) {
      const acct = await this.ledgerService.ledger.account.getAccount({ accountId: rewardRecipient });
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
      ? this.ledgerService.ledger.account.removeCommitment(args)
      : this.ledgerService.ledger.account.addCommitment(args)) as Promise<TransactionId>;
  }



  // private async syncAccountUnconfirmedTransactions(account: WalletAccount): Promise<void> {
  //   try {
  //     const orderByTimestamp = (a, b) => a.timestamp > b.timestamp ? -1 : 1;
  //     const unconfirmedTransactionsResponse = await this.getUnconfirmedTransactions(account.account);
  //     const unconfirmed = unconfirmedTransactionsResponse.unconfirmedTransactions.sort(orderByTimestamp);
  //     account.transactions = uniqBy(unconfirmed.concat(account.transactions), 'transaction');
  //
  //     // @ts-ignore - Send notifications for new transactions
  //     if (window.Notification) {
  //       unconfirmed
  //         .filter(({ transaction }) => this.isNewTransaction(transaction))
  //         .map((transaction) => this.sendNewTransactionNotification(transaction));
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  // private async syncAccountTransactions(account: WalletAccount): Promise<void> {
  //   try {
  //     const { account: accountId, transactions } = account;
  //     let transactionList = transactions ;// transactions.slice(0, 500); // max supported tx
  //     if (transactions.length > 0) {
  //       const timestamp = transactions[0].timestamp.toString(10);
  //       const { transactions: recentTransactions } = await this.getAccountTransactions({
  //         accountId,
  //         timestamp
  //       });
  //       transactionList = recentTransactions.concat(transactions);
  //     } else {
  //       transactionList = (await this.getAccountTransactions({ accountId })).transactions;
  //     }
  //     account.transactions = uniqBy(transactionList, 'transaction');
  //   } catch (e) {
  //     account.transactions = [];
  //   }
  // }
  //
  // private async syncAccountDetails(account: WalletAccount): Promise<void> {
  //   try {
  //     const remoteAccount = await this.getAccount(account.account);
  //     // Only update what you really need...
  //     // ATTENTION: Do not try to iterate over all keys and update then
  //     // It will fail :shrug
  //     account.name = remoteAccount.name;
  //     account.description = remoteAccount.description;
  //     account.assetBalances = remoteAccount.assetBalances;
  //     account.unconfirmedAssetBalances = remoteAccount.unconfirmedAssetBalances;
  //     account.committedBalanceNQT = remoteAccount.committedBalanceNQT;
  //     account.balanceNQT = remoteAccount.balanceNQT;
  //     account.unconfirmedBalanceNQT = remoteAccount.unconfirmedBalanceNQT;
  //     account.accountRSExtended = remoteAccount.accountRSExtended;
  //     account.accountRS = remoteAccount.accountRS;
  //     if (!remoteAccount.keys) {
  //       console.log('no keys - syncAccountDetails', remoteAccount);
  //     }
  //   } catch (e) {
  //     console.warn(e);
  //   }
  // }

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
    return this.ledgerService.ledger.account.getAccountBlocks({ accountId: account.account });
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
