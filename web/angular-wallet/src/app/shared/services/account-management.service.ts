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

  constructor(private storeService: StoreService,
              private networkService: NetworkService,
              private progressBarService: FuseProgressBarService,
              private notificationService: NotifierService,
              private i18nService: I18nService,
              private ledgerService: LedgerService
  ) {
  }

  private async fetchAccountsRecentTransactions(account: WalletAccount): Promise<Transaction[]> {
    const confirmedTransactions = account.transactions.filter(({ confirmations }) => confirmations !== undefined);
    const lastKnownConfirmedTransactionTimestamp = confirmedTransactions.length
      ? confirmedTransactions[0].timestamp
      : 0;


    const { transactions } = await this.ledgerService.ledger.account.getAccountTransactions({
      accountId: account.account,
      includeIndirect: true,
      resolveDistributions: true,
      timestamp: lastKnownConfirmedTransactionTimestamp.toString(10)
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
    let selected = this.storeService.getSelectedAccount();
    if (!selected){
      const all = this.storeService.getAllAccounts();
      if (all.length > 0) {
        selected = all[0];
        this.storeService.setSelectedAccount(selected);
      }
    }
    return selected;
  }

  public async selectAccount(account: WalletAccount): Promise<void> {
    // FIXME: check if null accounts is acceptable - or how to deal with "nulled" accounts
    this.storeService.setSelectedAccount(account);
    if (account) {
      this.progressBarService.show();
      await this.synchronizeAccount(account, false);
      this.progressBarService.hide();
    }
  }

  public async synchronizeAccount(accountRef: WalletAccount, pendingOnly: boolean): Promise<WalletAccount> {
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
      if (e.name === 'QuotaExceededError') {
        this.notificationService.show({
          type: 'error',
          message: this.i18nService.getTranslation('error_storage_quota_exceeded')
        });
      }
    } finally {
      return accountRef;
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
    accountRef.isSafe = !!remoteAccount.publicKey;
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
    return this.storeService.findAccount(accountId, network);
  }

  public getAllAccounts(): WalletAccount[] {
    const { networkName } = this.storeService.getSelectedNode();
    // this forces change detection
    return [...this.storeService.getAllAccountsByNetwork(networkName)];
  }

}
