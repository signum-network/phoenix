import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import * as Loki from 'lokijs';
import {StoreConfig} from './store.config';
import {Settings} from 'app/settings';
import {Account} from '@burstjs/core';

const CollectionName = {
  Account: 'accounts',
  Settings: 'settings',
};

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private store: any;
  public ready: BehaviorSubject<any> = new BehaviorSubject(false);
  public settings: BehaviorSubject<any> = new BehaviorSubject(false);

  constructor(private storeConfig: StoreConfig) {
    this.store = new Loki(storeConfig.databaseName, {
      autoload: true,
      autoloadCallback: this.init.bind(this),
      adapter: storeConfig.persistenceAdapter
    });
  }

  /*
  * Called on db start
  */
  public init(): void {
    let accounts = this.store.getCollection(CollectionName.Account);
    if (!accounts) {
      accounts = this.store.addCollection(CollectionName.Account, {unique: ['account']});
    }
    let settings = this.store.getCollection(CollectionName.Settings);
    if (!settings) {
      settings = this.store.addCollection(CollectionName.Settings, {unique: ['id']});
      settings.insert(new Settings());
    }

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

  /*
  * Method reponsible for saving/updating Account objects to the database.
  */
  public saveAccount(account: Account): Promise<Account> {
    return new Promise((resolve, reject) => {
      if (this.ready.value) {
        this.store.loadDatabase({}, () => {
          const accounts = this.store.getCollection(CollectionName.Account);
          const rs = accounts.find({account: account.account});
          if (rs.length === 0) {
            accounts.insert(account);
          } else {
            accounts.chain().find({account: account.account}).update(w => {
              Object.keys(account).forEach( k => {
                w[k] = account[k];
              });
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
  public getSelectedAccount(): Promise<Account> {
    return new Promise((resolve, reject) => {
      if (this.ready.value) {

        this.store.loadDatabase({}, () => {
          const accounts = this.store.getCollection(CollectionName.Account);
          let rs = accounts.find({selected: true});
          if (rs.length > 0) {
            const account = new Account(rs[0]);
            resolve(account);
          } else {
            rs = accounts.find();
            if (rs.length > 0) {
              accounts.chain().find({account: rs[0].account}).update(w => {
                w.selected = true;
              });
              const w = new Account(rs[0]);
              this.store.saveDatabase();
              resolve(w);
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

  /*
  * Method reponsible for selecting a new Account.
  */
  public selectAccount(account: Account): Promise<Account> {
    return new Promise((resolve, reject) => {
      if (this.ready.value) {
        this.store.loadDatabase({}, () => {
          account.selected = true;
          const accounts = this.store.getCollection(CollectionName.Account);
          accounts.chain().find({selected: true}).update(w => {
            w.selected = false;
          });
          accounts.chain().find({account: account.account}).update(w => {
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

  /*
  * Method reponsible for fetching all accounts from the database.
  */
  public getAllAccounts(): Promise<Account[]> {
    return new Promise((resolve, reject) => {
      if (this.ready.value) {
        const accounts = this.store.getCollection(CollectionName.Account);
        const rs = accounts.find();
        const ws = [];
        rs.map(single => {
          ws.push(new Account(single));
        });
        resolve(ws);
      } else {
        reject([]);
      }
    });
  }

  /*
  * Method reponsible for finding an account by its numeric id from the database.
  */
  public findAccount(account: string): Promise<Account> {
    return new Promise((resolve, reject) => {
      if (this.ready.value) {
        const accounts = this.store.getCollection(CollectionName.Account);
        const rs = accounts.find({account: account});
        if (account && rs.length > 0) {
          resolve(new Account(rs[0]));
        } else {
          resolve(undefined);
        }
      } else {
        reject(undefined);
      }
    });
  }

  /*
  * Method reponsible for removing an account from the database.
  */
  public removeAccount(account: Account): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (this.ready.value) {
        this.store.loadDatabase({}, () => {
          const accounts = this.store.getCollection(CollectionName.Account);
          const rs = accounts.chain().find({account: account.account}).remove();
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
        const rs = settings.find({id: newSettings.id});

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
