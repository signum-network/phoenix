import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as Loki from 'lokijs';
import { StoreConfig } from './store.config';
import { Settings } from 'app/store/settings';
import { WalletAccount } from '../util/WalletAccount';
import { Subject, timer } from 'rxjs';
import { environment } from '../../environments/environment';
import { NodeInfo } from 'app/shared/types';
import { Address } from '@signumjs/core';

const CollectionName = {
  Account: 'accounts',
  AccountV2: 'accounts_V2',
  Settings: 'settings',
  Migration: '_migration'
};

// type WalletAccount = WalletAccount & { _id: string };

function createAccountSurrogateKey(account: WalletAccount): string {
  return `${account.networkName || environment.defaultNodeNetwork}-${account.account}`;
}
function getNetworknameFromAccount(account: WalletAccount): string {
  if (account.networkName){
    return account.networkName;
  }
  const _id = account._id;
  return  _id.substr(0, _id.lastIndexOf('-'));
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
   * Triggers when the network changes, i.e. Signum <-> Signum-TEST
   */
  public networkChanged$: Subject<string> = new Subject();

  /**
   * Triggers everytime a new account was selected
   */
  public accountSelected$: Subject<WalletAccount> = new Subject();

  /**
   * Triggers everytime the selected account was updated, i.e. new balance, new transactions, new description etc.
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
    const accountsV2 = this.store.getCollection<WalletAccount>(CollectionName.AccountV2);
    const result = accounts.chain().data();
    for (const a of result) {
      const walletAccount = new WalletAccount(a);
      walletAccount._id = createAccountSurrogateKey(a);
      walletAccount.networkName = getNetworknameFromAccount(walletAccount);
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
      if (selectedAccount) {
        this.accountSelected$.next(selectedAccount);
        this.accountUpdated$.next(selectedAccount);
      }
      const selectedNode = this.getSelectedNode();
      if (selectedNode) {
        this.nodeSelected$.next(selectedNode);
      }
      const selectedLanguage = this.getSelectedLanguage();
      if (selectedLanguage) {
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
      const accounts = this.store.getCollection<WalletAccount>(CollectionName.AccountV2);
      let updatedAccount;
      if (!account.isStored()) {
        const newAccount = account;
        newAccount.networkName = newAccount.networkName || this.getSelectedNode().networkName;
        newAccount._id = createAccountSurrogateKey(newAccount);
        accounts.insert(newAccount);
        updatedAccount = newAccount;
      } else {
        const existingAccount = accounts.by('_id', account._id);
        existingAccount.balanceNQT = account.balanceNQT;
        existingAccount.unconfirmedBalanceNQT = account.unconfirmedBalanceNQT;
        existingAccount.committedBalanceNQT = account.committedBalanceNQT;
        existingAccount.accountRSExtended = account.accountRSExtended;
        existingAccount.accountRS = account.accountRS;
        existingAccount.assetBalances = account.assetBalances;
        existingAccount.type = account.type;
        existingAccount.name = account.name;
        existingAccount.description = account.description;
        // do not overwrite potentially stored private keys, but update public key
        if (!existingAccount.keys.publicKey && account.keys.publicKey){
          existingAccount.keys.publicKey = account.keys.publicKey;
        }
        existingAccount.transactions = account.transactions;
        existingAccount.confirmed = account.confirmed;
        accounts.update(existingAccount);
        updatedAccount = existingAccount;
      }

      this.persist();
      if (this.getSelectedAccount().account === account.account){
        this.accountUpdated$.next(new WalletAccount(updatedAccount));
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
      this.persist();
    } catch (e) {
      // ignore error
    }
  }

  public getAllAccountsByNetwork(network: string): WalletAccount[] {
    return this.withReady(() => {
      const collection = this.store.getCollection<WalletAccount>(CollectionName.AccountV2);
      const accounts = collection.where( (a) =>  getNetworknameFromAccount(a) === network);
      return accounts.map( a => new WalletAccount(a));
    });
  }

  public getAllAccounts(): WalletAccount[] {
    return this.withReady(() => {
      const accounts = this.store.getCollection<WalletAccount>(CollectionName.AccountV2);
      return accounts.find().map((dba) => new WalletAccount(dba));
    });
  }

  public getSettings(): Settings {
    return this.withReady<Settings>(() => {
      const settings = this.store.getCollection<Settings>(CollectionName.Settings);
      const results = settings.find();
      return results.length ? results[0] : new Settings();
    });
  }

  public updateSettings(partialSettings: Partial<Settings>, propagateUpdate = true): void {
    this.withReady<void>(() => {
      const collection = this.store.getCollection(CollectionName.Settings);
      const settings = this.getSettings();
      const newSettings = {
        ...settings,
        ...partialSettings
      };
      collection.update(newSettings);

      this.persist();
      if (propagateUpdate) {
        this.settingsUpdated$.next(newSettings);
        if (partialSettings.language) {
          this.languageSelected$.next(newSettings.language);
        }
        if (partialSettings.node) {
          this.nodeSelected$.next({
            nodeUrl: partialSettings.node,
            addressPrefix: partialSettings.addressPrefix,
            networkName: partialSettings.networkName
          });
        }
      }
    });
  }

  public setSelectedAccount(account: WalletAccount): void {
    this.withReady<void>(() => {
      const id = account.account;
      this.updateSettings({ selectedAccountId: id }, false);
      const selectedAccount = this.getSelectedAccount();
      this.accountSelected$.next(selectedAccount);
    });
  }

  public removeAccount(accountId: string): void {
    this.withReady(() => {
      // we remove all accounts of all networks
      const accounts = this.store.getCollection<WalletAccount>(CollectionName.AccountV2);
      accounts.chain().find({ account: accountId }).remove();
      this.persist();
    });
  }

  public setSelectedNode(nodeInfo: NodeInfo, forced = false): void {
    this.withReady(() => {
      const { nodeUrl, networkName, addressPrefix } = nodeInfo;
      const currentSettings = this.getSettings();
      const previousNetworkName = currentSettings.networkName;
      const hasNetworkChanged = previousNetworkName !== networkName;
      if (currentSettings.node !== nodeUrl || hasNetworkChanged || forced) {
        this.updateSettings({ node: nodeUrl, networkName, addressPrefix }, false);
        this.nodeSelected$.next(nodeInfo);
      }
      if (hasNetworkChanged){
        this.migrateAccountsBetweenNetworks(previousNetworkName, networkName, addressPrefix);
        this.networkChanged$.next(networkName);
        const selectedAccount = this.getSelectedAccount();
        // const accounts = this.store.getCollection<WalletAccount>(CollectionName.AccountV2);
        // const newSelectedAccount = accounts.by('_id', `${networkName}-${selectedAccount.account}`);
        // this.accountSelected$.next(new WalletAccount(newSelectedAccount));
       }
    });
  }

  private migrateAccountsBetweenNetworks(fromNetwork: string, toNetwork: string, addressPrefix: string): void {
      // eventually creates an account object stored for one network for the other network
      const collection = this.store.getCollection<WalletAccount>(CollectionName.AccountV2);
      const accountsToBeMigrated = collection.where(a => getNetworknameFromAccount(a) === fromNetwork);
      accountsToBeMigrated.forEach( a => {
        const targetId = `${toNetwork}-${a.account}`;
        const hasMigrated = collection.by('_id', targetId);
        if (!hasMigrated){
            const newAccount = new WalletAccount();
            newAccount._id = targetId;
            const address = a.keys.publicKey ? Address.fromPublicKey(a.keys.publicKey, addressPrefix) : Address.fromNumericId(a.account, addressPrefix);
            newAccount.account = address.getNumericId();
            newAccount.accountRS = address.getReedSolomonAddress();
            newAccount.accountRSExtended = a.keys.publicKey ? address.getReedSolomonAddressExtended() : undefined;
            newAccount.keys = a.keys;
            newAccount.type = a.type;
            newAccount.networkName = toNetwork;
            collection.insert(newAccount);
        }
      });
      this.persist();
  }

  public getSelectedAccount(): WalletAccount | null {
    return this.withReady<WalletAccount | null>(() => {

      const collection = this.store.getCollection<WalletAccount>(CollectionName.AccountV2);
      const fallbackSelection = () => {
        const accounts = collection.where(a => getNetworknameFromAccount(a) === settings.networkName);
        if (accounts.length) {
          this.updateSettings({ selectedAccountId: accounts[0].account }, false);
          return new WalletAccount(accounts[0]);
        }
        return null;
      };

      const settings = this.getSettings();
      if (settings.selectedAccountId) {
        const accList = collection.where((a) => a.account === settings.selectedAccountId && getNetworknameFromAccount(a) === settings.networkName);
        return accList.length ? new WalletAccount(accList[0]) : fallbackSelection();
      } else {
        fallbackSelection();
      }
    });
  }

  public findAccount(accountId: string, networkName?: string): WalletAccount | null {
    const collection = this.store.getCollection<WalletAccount>(CollectionName.AccountV2);
    const query = networkName
      ? { '$and': [{ 'account' : accountId}, { 'networkName' : networkName }] }
      : { 'account' : accountId};

    const found = collection.find( query );
    return found.length ? new WalletAccount(found[0]) : null;
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
