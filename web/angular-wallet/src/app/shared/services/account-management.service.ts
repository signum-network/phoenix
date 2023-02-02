import { Injectable } from '@angular/core';
import { StoreService } from 'app/store/store.service';
import { Account, Transaction } from '@signumjs/core';
import { NetworkService } from '../../network/network.service';
import { uniqBy } from 'lodash';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { WalletAccount } from 'app/util/WalletAccount';
import { interval, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { LedgerService } from 'app/ledger.service';
import { NotifierService } from 'angular-notifier';
import { I18nService } from './i18n.service';

@Injectable({
  providedIn: 'root'
})
export class AccountManagementService {

  private accountPolling$: Subscription;

  constructor(private storeService: StoreService,
              private networkService: NetworkService,
              private progressBarService: FuseProgressBarService,
              private notificationService: NotifierService,
              private i18nService: I18nService,
              private ledgerService: LedgerService
  ) {
  }

  private async fetchAccountsRecentTransactions(account: WalletAccount): Promise<Transaction[]> {
    const lastKnownTransactionTimestamp = account.transactions.length
      ? account.transactions[0].timestamp
      : 0;


    const { transactions } = await this.ledgerService.ledger.account.getAccountTransactions({
      accountId: account.account,
      includeIndirect: true,
      resolveDistributions: true,
      timestamp: lastKnownTransactionTimestamp.toString(10)
    });
    return transactions;
  }

  private async fetchAccountsPendingTransactions(account: WalletAccount): Promise<Transaction[]> {
    const { unconfirmedTransactions } = await this.ledgerService.ledger.account.getUnconfirmedAccountTransactions(account.account);
    return unconfirmedTransactions;
  }

  private async fetchAccountFromChain(accountId: string): Promise<Account> {
    return this.ledgerService.ledger.account.getAccount({
      accountId,
      includeCommittedAmount: true,
      includeEstimatedCommitment: true
    });
  }


  public getSelectedAccount(): WalletAccount {
    return this.storeService.getSelectedAccount();
  }

  public async selectAccount(account: WalletAccount): Promise<void> {
    // FIXME: check if null accounts is acceptable - or how to deal with "nulled" accounts
    this.storeService.setSelectedAccount(account);
    if (account) {
      this.progressBarService.show();
      await this.synchronizeAccount(account, false);
      this.progressBarService.hide();
      this.listenToAccount(account);
    }
  }

  private listenToAccount(account: WalletAccount): void {
    if (this.accountPolling$) {
      this.accountPolling$.unsubscribe();
    }
    // check for pending tx all 10 secs, but only all 30 secs for confirmed tx
    this.accountPolling$ = interval(10_000)
      .pipe(
        tap(async () => this.synchronizeAccount(account, true)),
        filter(i => i % 3 === 0)
      )
      .subscribe(async () => {
        await this.synchronizeAccount(account, false);
      });
  }


  private async synchronizeAccount(accountRef: WalletAccount, pendingOnly: boolean): Promise<void> {
    try {
      if (pendingOnly) {
        await this.syncPendingAccountTransactions(accountRef);
      } else {
        await Promise.all([
          this.syncAccountDetails(accountRef),
          this.syncAccountTransactions(accountRef)
        ]);
      }
      this.storeService.saveAccount(accountRef);
    } catch (e) {
      console.warn('Error while syncing account', accountRef.accountRS, e);
      if (e.name === 'QuotaExceededError'){
        this.notificationService.show({
          type: 'error',
          message: this.i18nService.getTranslation('error_storage_quota_exceeded')
        });
      }
    }
  }

  private async syncAccountTransactions(accountRef: WalletAccount): Promise<void> {
    const { transactions } = accountRef;
    const [recentTransactions, pendingTransactions] = await Promise.all([
      this.fetchAccountsRecentTransactions(accountRef),
      this.fetchAccountsPendingTransactions(accountRef)
    ]);
    const prunedTransactions = uniqBy([...pendingTransactions, ...recentTransactions, ...transactions], 'transaction');
    prunedTransactions.sort((a, b) => b.timestamp - a.timestamp);
    accountRef.transactions = prunedTransactions;
  }

  private async syncPendingAccountTransactions(accountRef: WalletAccount): Promise<void> {
    const { transactions } = accountRef;
    const pendingTransactions = await this.fetchAccountsPendingTransactions(accountRef);
    const prunedTransactions = uniqBy([...pendingTransactions, ...transactions], 'transaction');
    prunedTransactions.sort((a, b) => b.timestamp - a.timestamp);
    accountRef.transactions = prunedTransactions;

    // TODO: desktop notifications - maybe better in a central component?
    //     // @ts-ignore - Send notifications for new transactions
    //     if (window.Notification) {
    //       unconfirmed
    //         .filter(({ transaction }) => this.isNewTransaction(transaction))
    //         .map((transaction) => this.sendNewTransactionNotification(transaction));
    //     }
  }

  private async syncAccountDetails(accountRef: WalletAccount): Promise<void> {
    const remoteAccount = await this.fetchAccountFromChain(accountRef.account);
    // Only update what you really need...
    // ATTENTION: Do not try to iterate over all keys and update then
    // It will fail!!!
    accountRef.networkName = this.storeService.getSettings().networkName;
    accountRef.name = remoteAccount.name;
    accountRef.description = remoteAccount.description;
    accountRef.assetBalances = remoteAccount.assetBalances;
    accountRef.unconfirmedAssetBalances = remoteAccount.unconfirmedAssetBalances;
    accountRef.committedBalanceNQT = remoteAccount.committedBalanceNQT;
    accountRef.balanceNQT = remoteAccount.balanceNQT;
    accountRef.unconfirmedBalanceNQT = remoteAccount.unconfirmedBalanceNQT;
    accountRef.accountRSExtended = remoteAccount.accountRSExtended;
    accountRef.accountRS = remoteAccount.accountRS;
    if (!accountRef.keys.publicKey && remoteAccount.publicKey) {
      accountRef.keys.publicKey = remoteAccount.publicKey;
    }
  }

  public async addAccount(account: WalletAccount): Promise<WalletAccount> {
    const existingAccount = this.findAccount(account.account);
    if (!existingAccount) {
      this.storeService.saveAccount(account);
      await this.selectAccount(account);
      return account;
    } else {
      throw new Error('Address already imported!');
    }
  }

  public hasAccounts(): boolean {
      return this.storeService.getAllAccounts().length > 0;
  }

  public removeAccount(accountId: string): void {
    this.storeService.removeAccount(accountId);
  }

  public findAccount(accountId: string, network?: string): WalletAccount | null {
    return this.storeService.findAccount(accountId, network)
  }

  public getAllAccounts(): WalletAccount[] {
    const  {networkName} = this.storeService.getSelectedNode();
    // this forces change detection
    return [...this.storeService.getAllAccountsByNetwork(networkName)];
  }
}
