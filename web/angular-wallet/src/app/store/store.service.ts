import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as Loki from 'lokijs';
import { StoreConfig } from './store.config';
import { Settings } from 'app/settings';
import { adjustLegacyAddressPrefix } from '../util/adjustLegacyAddressPrefix';
import { WalletAccount } from '../util/WalletAccount';
const CollectionName = {
  Account: 'accounts',
  Settings: 'settings',
  Migration: '_migration'
};

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private store: any;
  public ready: BehaviorSubject<any> = new BehaviorSubject(false);
  public settings: BehaviorSubject<any> = new BehaviorSubject(false);

  constructor(
    private storeConfig: StoreConfig
  ) {
    this.store = new Loki(storeConfig.databaseName, {
      autoload: true,
      autoloadCallback: this.init.bind(this),
      adapter: storeConfig.persistenceAdapter
    });
  }

  private isVersionMigrated(v: string): boolean {
    let migrations = this.store.getCollection(CollectionName.Migration);
    if (!migrations) {
      migrations = this.store.addCollection(CollectionName.Migration, { unique: 'version' });
      migrations.insert({ version: v, migrated: false });
      this.store.saveDatabase();
    }
    return migrations.findOne({ version: v }).migrated;
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

  /*
  * Called on db start
  */
  public init(): void {
    let accounts = this.store.getCollection(CollectionName.Account);
    if (!accounts) {
      accounts = this.store.addCollection(CollectionName.Account, { unique: ['account'] });
    }
    let settings = this.store.getCollection(CollectionName.Settings);
    if (!settings) {
      settings = this.store.addCollection(CollectionName.Settings, { unique: ['id'] });
      settings.insert(new Settings());
    }


    this.migrateVersionV1_4_1();

    this.store.saveDatabase();
    this.setReady(true);
    this.getSettings()
      .then(s => {
        this.setSettings(s);
      })
      .catch(error => {
        this.setSettings(new Settings());
      });
  }

  public setReady(state: boolean): void {
    this.ready.next(state);
  }

  public setSettings(state: Settings): void {
    this.settings.next(state);
  }

  public saveAccount(account: WalletAccount): Promise<WalletAccount> {

    account = adjustLegacyAddressPrefix(account);

    return new Promise((resolve, reject) => {
      if (this.ready.value) {
        this.store.loadDatabase({}, () => {
          const accounts = this.store.getCollection(CollectionName.Account);
          const rs = accounts.find({ account: account.account });
          if (rs.length === 0) {
            accounts.insert(account);
          } else {
            accounts.chain().find({ account: account.account }).update(w => {
              // Only update what you really need...
              // ATTENTION: Do not try to iterate over all keys and update then
              // It will fail :shrug
              // look at account.service.ts for the counter part
              w.balanceNQT = account.balanceNQT;
              w.unconfirmedBalanceNQT = account.unconfirmedBalanceNQT;
              w.committedBalanceNQT = account.committedBalanceNQT;
              w.accountRSExtended = account.accountRSExtended;
              w.assetBalances = account.assetBalances;
              w.type = account.type;
              w.selected = account.selected;
              w.name = account.name;
              w.description = account.description;
              w.keys = account.keys;
              w.transactions = account.transactions;
              w.confirmed = account.confirmed;
            });
          }
          this.store.saveDatabase();
          resolve(account);
        });

      } else {
        reject(undefined);
      }
    });
  }

  /*
  * Method reponsible for getting the selected account from the database.
  */
  public getSelectedAccount(): Promise<WalletAccount> {
    return new Promise((resolve, reject) => {
      if (this.ready.value) {

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

  /*
  * Method reponsible for selecting a new Account.
  */
  public selectAccount(account: WalletAccount): Promise<WalletAccount> {
    return new Promise((resolve, reject) => {
      if (this.ready.value) {
        this.store.loadDatabase({}, () => {
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

  public getAllAccounts(): Promise<WalletAccount[]> {
    return new Promise((resolve, reject) => {
      if (this.ready.value) {
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

  public findAccount(accountId: string): Promise<WalletAccount> {
    return new Promise((resolve, reject) => {
      if (this.ready.value) {
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

  public removeAccount(account: WalletAccount): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.ready.value) {
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

  public saveSettings(newSettings: Settings): Promise<Settings> {
    return new Promise((resolve, reject) => {
      if (!this.ready.value) {
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
        this.setSettings(newSettings);
        resolve(newSettings);
      });
    });
  }

  public getSettings(): Promise<Settings> {
    return new Promise((resolve, reject) => {
      if (this.ready.value) {
        const settings = this.store.getCollection(CollectionName.Settings);
        const rs = settings.find();
        resolve(rs[0]);
      } else {
        resolve(new Settings());
      }
    });
  }
}
