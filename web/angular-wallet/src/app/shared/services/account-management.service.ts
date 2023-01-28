import { Injectable } from '@angular/core';
import { StoreService } from 'app/store/store.service';
import { Account, Address, Transaction } from '@signumjs/core';
import { ApiService } from '../../api.service';
import { NetworkService } from '../../network/network.service';
import { uniqBy } from 'lodash';
import { Settings } from '../../store/settings';
import { FuseProgressBarService } from '@fuse/components/progress-bar/progress-bar.service';
import { WalletAccount } from 'app/util/WalletAccount';
import { interval, Subscription } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import { Recipient } from '../../components/recipient-input/recipient-input.component';

@Injectable({
  providedIn: 'root'
})
export class AccountManagementService {

  private showDesktopNotifications: boolean;
  private accountPolling$: Subscription;

  constructor(private storeService: StoreService,
              private networkService: NetworkService,
              private progressBarService: FuseProgressBarService,
              private apiService: ApiService
  ) {
    this.storeService
      .settingsUpdated$
      .subscribe((settings: Settings) => {
        if (!settings) {
          return;
        }
        this.showDesktopNotifications = settings.showDesktopNotifications;
      });
  }

  private async fetchAccountsRecentTransactions(account: WalletAccount): Promise<Transaction[]> {
    const lastKnownTransactionTimestamp = account.transactions.length
      ? account.transactions[0].timestamp
      : 0;


    const { transactions } = await this.apiService.ledger.account.getAccountTransactions({
      accountId: account.account,
      includeIndirect: true,
      resolveDistributions: true,
      timestamp: lastKnownTransactionTimestamp.toString(10)
    });
    return transactions;
  }

  private async fetchAccountsPendingTransactions(account: WalletAccount): Promise<Transaction[]> {
    const { unconfirmedTransactions } = await this.apiService.ledger.account.getUnconfirmedAccountTransactions(account.account);
    return unconfirmedTransactions;
  }

  private async fetchAccountFromChain(accountId: string): Promise<Account> {
    return this.apiService.ledger.account.getAccount({
      accountId,
      includeCommittedAmount: true,
      includeEstimatedCommitment: true
    });
  }


  public getSelectedAccount(): WalletAccount {
    return this.storeService.getSelectedAccount();
  }

  public async selectAccount(account: WalletAccount): Promise<void> {
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


  private async synchronizeAccount(accountRef: WalletAccount, pendingOnly: boolean): Promise<WalletAccount> {
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
      return accountRef;
    } catch (e) {
      console.warn('Error while syncing account', accountRef.accountRS, e);
    }
  }

  private async syncAccountTransactions(accountRef: WalletAccount): Promise<void> {
    const { transactions } = accountRef;

    console.log('syncAccountTransactions', transactions.length);

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
    const existingAccount = this.findAccountById(account.account);
    if (!existingAccount) {
      this.storeService.saveAccount(account);
      await this.selectAccount(account);
      return account;
    } else {
      throw new Error('Address already imported!');
    }
  }


  public removeAccount(account: WalletAccount): void {
    this.storeService.removeAccount(account);
  }

  public findAccountById(accountId: string): WalletAccount | null {
    return this.getAllAccounts().find( ({account}) => account === accountId);
  }
  public getAllAccounts(): WalletAccount[] {
    const  {networkName} = this.storeService.getSelectedNode();
    return this.storeService.getAllAccountsByNetwork(networkName);
  }
}
