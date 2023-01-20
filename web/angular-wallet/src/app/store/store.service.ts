import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as Loki from 'lokijs';
import { StoreConfig } from './store.config';
import { PartialSettings, Settings } from 'app/store/settings';
import { adjustLegacyAddressPrefix } from '../util/adjustLegacyAddressPrefix';
import { WalletAccount } from '../util/WalletAccount';
import { Subject, timer } from 'rxjs';
import { environment } from '../../environments/environment';
import { NodeInfo } from 'app/shared/types';

const CollectionName = {
  Account: 'accounts',
  AccountV2: 'accounts_V2',
  Settings: 'settings',
  Migration: '_migration'
};

type DbWalletAccount = WalletAccount & { _id: string };

function createAccountSurrogateKey(account: WalletAccount): string {
  return `${account.networkName || environment.defaultNodeNetwork}-${account.account}`;
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private store: Loki;
  /**
   * Indicates whether store is ready, i.e. all loaded - triggers only once - on startup
   */
  public ready$: BehaviorSubject<boolean> = new BehaviorSubject(false);
  /**
   * Triggers everytime the settings were updated
   */
  public settingsUpdated$: BehaviorSubject<Settings> = new BehaviorSubject(null);

  /**
   * Triggers everytime a new language was selected
   */
  public languageSelected$: BehaviorSubject<string> = new BehaviorSubject('');
  /**
   * Triggers everytime a new node was selected
   */
  public nodeSelected$: Subject<NodeInfo> = new Subject();

  /**
   * Triggers everytime a new account was selected
   */
  public accountSelected$: Subject<WalletAccount> = new Subject();

  /**
   * Triggers everytime the current account was updated, i.e. new balance, new transactions, new description etc.
   */
  public accountUpdated$: Subject<WalletAccount> = new Subject();



  constructor(
    private storeConfig: StoreConfig
  ) {
    this.store = new Loki(storeConfig.databaseName, {
      autoload: true,
      autoloadCallback: this.init.bind(this),
      adapter: storeConfig.persistenceAdapter,
      verbose: !environment.production
    });
  }

  private persist(): void {
    this.store.saveDatabase();
  }

  private isVersionMigrated(v: string): boolean {
    let migrations = this.store.getCollection(CollectionName.Migration);
    if (!migrations) {
      migrations = this.store.addCollection(CollectionName.Migration, { unique: ['version'] });
      migrations.insert({ version: v, migrated: false });
      this.store.saveDatabase();
    }
    const migration = migrations.findOne({ version: v });
    return migration ? migration.migrated : false;
  }

  private setVersionMigrated(v: string): void {
    const migrations = this.store.getCollection(CollectionName.Migration);
    migrations.chain().find({ version: v }).update((m) => {
      m.migrated = true;
    });
  }

  private migrateVersionV1_4_1(): void {
    const Version = '1.4.1';
    if (this.isVersionMigrated(Version)) {
      return;
    }
    this.invalidateAccountTransactions();
    this.setVersionMigrated(Version);
  }

  private migrateVersionV1_5_0(): void {
    const Version = '1.5.0';
    if (this.isVersionMigrated(Version)) {
      return;
    }
    console.log('Migrating V1.5.0...');
    const accounts = this.store.getCollection<WalletAccount>(CollectionName.Account);
    if (!accounts) {
      return;
    }
    const accountsV2 = this.store.getCollection<DbWalletAccount>(CollectionName.AccountV2);
    const result = accounts.chain().data();
    for (const a of result) {
      const walletAccount = new WalletAccount(a) as DbWalletAccount;
      walletAccount._id = createAccountSurrogateKey(a);
      walletAccount.transactions = [];
      accountsV2.insert(walletAccount);
    }
    this.store.removeCollection(CollectionName.Account);
    this.setVersionMigrated(Version);
    console.log('Migration V1.5.0 successfully executed...');
  }

  /*
  * Called on db start
  */
  private init(): void {
    if (!this.store.getCollection(CollectionName.AccountV2)) {
      this.store.addCollection(CollectionName.AccountV2, { unique: ['_id'] });
    }
    let settingsCollection = this.store.getCollection(CollectionName.Settings);
    if (!settingsCollection) {
      settingsCollection = this.store.addCollection(CollectionName.Settings, { unique: ['id'] });
      settingsCollection.insert(new Settings());
    }

    this.migrateVersionV1_4_1();
    this.migrateVersionV1_5_0();

    this.persist();

    const results = settingsCollection.find();
    this.settingsUpdated$.next(results.length ? results[0] : new Settings());
    this.ready$.next(true);

    // hacky shit to dispatch first selections
    timer(1).subscribe(() => {
      const selectedAccount = this.getSelectedAccount();
      if (selectedAccount){
        this.accountSelected$.next(selectedAccount);
      }
      const selectedNode = this.getSelectedNode();
      if (selectedNode){
        this.nodeSelected$.next(selectedNode);
      }

      const selectedLanguage = this.getSelectedLanguage();
      if (selectedLanguage){
        this.languageSelected$.next(selectedLanguage);
      }
    });

  }

  private withReady<T = any>(fn: Function): T {
    if (this.ready$.value) {
      return fn();
    } else {
      console.warn('Database is not ready yet...');
    }
  }

  public saveAccount(account: WalletAccount): void {
    this.withReady<void>(() => {
      const accounts = this.store.getCollection(CollectionName.AccountV2);
      const existingAccount = accounts.by('_id', createAccountSurrogateKey(account));
      if (!existingAccount) {
        accounts.insert(account);
        return;
      }
      // Only update what you really need...
      // ATTENTION: Do not try to iterate over all keys and update then
      // It will fail :shrug
      // look at account.service.ts for the counter part
      existingAccount.balanceNQT = account.balanceNQT;
      existingAccount.unconfirmedBalanceNQT = account.unconfirmedBalanceNQT;
      existingAccount.committedBalanceNQT = account.committedBalanceNQT;
      existingAccount.accountRSExtended = account.accountRSExtended;
      existingAccount.accountRS = account.accountRS;
      existingAccount.assetBalances = account.assetBalances;
      existingAccount.type = account.type;
      existingAccount.name = account.name;
      existingAccount.description = account.description;
      existingAccount.keys = account.keys;
      existingAccount.transactions = account.transactions;
      existingAccount.confirmed = account.confirmed;
      accounts.update(existingAccount);

      this.accountUpdated$.next(new WalletAccount(existingAccount));
    });
  }


  /**
   * @deprecated use getSelectedAccount
   */
  public getSelectedAccountLegacy(): Promise<WalletAccount> {
    return new Promise((resolve, reject) => {
      if (this.ready$.value) {

        this.store.loadDatabase({}, () => {
          const accounts = this.store.getCollection(CollectionName.Account);
          let rs = accounts.find({ selected: true });
          if (rs.length > 0) {
            const account = new WalletAccount(rs[0]);
            resolve(adjustLegacyAddressPrefix(account));
          } else {
            rs = accounts.find();
            if (rs.length > 0) {
              accounts.chain().find({ account: rs[0].account }).update(a => {
                a.selected = true;
              });
              const storedAccount = new WalletAccount(rs[0]);
              this.store.saveDatabase();
              resolve(adjustLegacyAddressPrefix(storedAccount));
            } else {
              reject(undefined);
            }
            reject(undefined);
          }
        });
      } else {
        reject(undefined);
      }
    });
  }

  public invalidateAccountTransactions(): void {
    try {
      // tslint:disable-next-line:no-console
      console.debug('Invalidating Transactions of accounts...');
      const accounts = this.store.getCollection(CollectionName.Account);
      accounts.chain()
        .where(a => a.transactions.length > 0)
        .update(a => {
          a.transactions = [];
        });
      this.store.saveDatabase();
    } catch (e) {
      // ignore error
    }
  }

  public selectAccountLegacy(account: WalletAccount): Promise<WalletAccount> {
    return new Promise((resolve, reject) => {
      if (this.ready$.value) {
        this.store.loadDatabase({}, () => {
          // @ts-ignore
          account.selected = true;
          const accounts = this.store.getCollection(CollectionName.Account);
          accounts.chain().find({ selected: true }).update(w => {
            w.selected = false;
          });
          accounts.chain().find({ account: account.account }).update(w => {
            w.selected = true;
          });
          this.store.saveDatabase();
          resolve(account);
        });
      } else {
        reject(undefined);
      }
    });
  }

  // returns only with unique ids....
  public getAllAccountsDistinct(): WalletAccount[] {
    return this.withReady(() => {
      const accounts = this.store.getCollection<DbWalletAccount>(CollectionName.AccountV2);
      const distinctMap = new Map<string, WalletAccount>();
      const allAccounts = accounts.find();
      for (const a of allAccounts) {
        if (!distinctMap.has(a.account)) {
          distinctMap.set(a.account, new WalletAccount(a));
        }
      }
      return Array.from(distinctMap.values());
    });
  }

  public getAllAccounts(): WalletAccount[] {
    return this.withReady(() => {
      const accounts = this.store.getCollection<DbWalletAccount>(CollectionName.AccountV2);
      return accounts.find().map((dba) => new WalletAccount(dba));
    });
  }

  public getAllAccountsLegacy(): Promise<WalletAccount[]> {
    return new Promise((resolve, reject) => {
      if (this.ready$.value) {
        const accounts = this.store.getCollection(CollectionName.Account);
        const rs = accounts.find();
        const ws = [];
        rs.map(storedAccount => {
          try {
            const account = adjustLegacyAddressPrefix(new WalletAccount(storedAccount));
            ws.push(account);
          } catch (e) {
            console.warn('Error in getAllAccounts:', e, { storedAccount });
          }
        });
        resolve(ws);
      } else {
        reject([]);
      }
    });
  }

  public findAccountByIdLegacy(accountId: string): Promise<WalletAccount> {
    return new Promise((resolve, reject) => {
      if (this.ready$.value) {
        const accounts = this.store.getCollection(CollectionName.Account);
        const rs = accounts.find({ account: accountId });
        if (accountId && rs.length > 0) {
          const storedAccount = new WalletAccount(rs[0]);
          resolve(adjustLegacyAddressPrefix(storedAccount));
        } else {
          resolve(undefined);
        }
      } else {
        reject(undefined);
      }
    });
  }

  public removeAccountLegacy(account: WalletAccount): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.ready$.value) {
        this.store.loadDatabase({}, () => {
          const accounts = this.store.getCollection(CollectionName.Account);
          accounts.chain().find({ account: account.account }).remove();
          this.store.saveDatabase();
          resolve(true);
        });
      } else {
        reject(false);
      }
    });
  }

  public saveSettingsLegacy(newSettings: Settings): Promise<Settings> {
    return new Promise((resolve, reject) => {
      if (!this.ready$.value) {
        return reject();
      }

      this.store.loadDatabase({}, () => {
        const settings = this.store.getCollection(CollectionName.Settings);
        const rs = settings.find({ id: newSettings.id });

        if (rs.length > 0) {
          settings.update(newSettings);
        } else {
          settings.insert(newSettings);
        }
        this.store.saveDatabase();
        this.settingsUpdated$.next(newSettings);
        resolve(newSettings);
      });
    });
  }

  public getSettingsLegacy(): Promise<Settings> {
    return new Promise((resolve, reject) => {
      if (this.ready$.value) {
        const settings = this.store.getCollection(CollectionName.Settings);
        const rs = settings.find();
        resolve(rs[0]);
      } else {
        resolve(new Settings());
      }
    });
  }

  public getSettings(): Settings {
    return this.withReady<Settings>(() => {
      const settings = this.store.getCollection<Settings>(CollectionName.Settings);
      const results = settings.find();
      return results.length ? results[0] : new Settings();
    });
  }

  public updateSettings(partialSettings: PartialSettings, propagateUpdate = true): void {
    this.withReady<void>(() => {
      const collection = this.store.getCollection(CollectionName.Settings);
      const newSettings = {
        ...this.getSettings(),
        ...partialSettings
      };

      collection.update(newSettings);
      this.persist();
      if (propagateUpdate){
        this.settingsUpdated$.next(newSettings);
      }
    });
  }

  public setSelectedAccount(account: WalletAccount): void {
    this.withReady<void>(() => {
      const currentSettings = this.getSettings();
      const id = createAccountSurrogateKey(account);
      if (id !== currentSettings.selectedAccountId) {
        this.updateSettings({selectedAccountId: createAccountSurrogateKey(account)}, false);
        const selectedAccount = this.getSelectedAccount();
        this.accountSelected$.next(selectedAccount);
      }
    });
  }

  private findAccount(account: WalletAccount): DbWalletAccount {
    return this.withReady(() => {
      const accounts = this.store.getCollection<DbWalletAccount>(CollectionName.AccountV2);
      return accounts.by('_id', createAccountSurrogateKey(account));
    });
  }

  public removeAccount(account: WalletAccount): void {
    this.withReady(() => {
      const accounts = this.store.getCollection<DbWalletAccount>(CollectionName.AccountV2);
      const found = accounts.by('_id', createAccountSurrogateKey(account));
      if (found) {
        accounts.remove(found);
        this.persist();
      }
    });
  }

  public setSelectedNode(nodeInfo: NodeInfo): void {
    this.withReady(() => {
      const {nodeUrl, networkName} = nodeInfo;
      const currentSettings = this.getSettings();
      if (currentSettings.node !== nodeUrl || currentSettings.networkName !== networkName) {
        this.updateSettings({node: nodeUrl, networkName}, false);
        this.nodeSelected$.next({
          nodeUrl,
          networkName
        });
      }
    });
  }

  public getSelectedAccount(): WalletAccount | null {
    return this.withReady<WalletAccount | null>(() => {
      const settings = this.getSettings();
      const collection = this.store.getCollection(CollectionName.AccountV2);
      if (settings.selectedAccountId) {
        return collection.by('_id', settings.selectedAccountId);
      } else {
        const accounts = collection.chain().data();
        return accounts.length ? new WalletAccount(accounts[0]) : null;
      }
    });
  }

  public getSelectedNode(): NodeInfo {
    return this.withReady<NodeInfo>(() => {
      const { node: nodeUrl, networkName } = this.getSettings();
      return {
        nodeUrl,
        networkName
      };
    });
  }

  public getSelectedLanguage(): string {
    return this.withReady<string>(() => {
      const { language } = this.getSettings();
      return language;
    });
  }
}
