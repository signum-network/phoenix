import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as Loki from 'lokijs';
import { StoreConfig } from './store.config';
import { Settings } from 'app/settings';
import { Account, Block } from '@burstjs/core';

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
    public init() {
        let blocks = this.store.getCollection('blocks');
        if (blocks == null) {
            blocks = this.store.addCollection('blocks', { unique: ['blockHeight'] });
        }
        let accounts = this.store.getCollection('accounts');
        if (accounts == null) {
            accounts = this.store.addCollection('accounts', { unique: ['account'] });
        }
        let settings = this.store.getCollection('settings');
        if (settings == null) {
            settings = this.store.addCollection('settings', { unique: ['id', 'language', 'node', 'notification', 'patchnotes', 'theme'] });
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

    public setReady(state: boolean) {
        this.ready.next(state);
    }

    public setSettings(state: Settings) {
        this.settings.next(state);
    }

    /*
    * Method reponsible for saving/updating Account objects to the database.
    */
    public saveAccount(account: Account): Promise<Account> {
        return new Promise((resolve, reject) => {
            if (this.ready.value) {
                this.store.loadDatabase({}, () => {
                    const accounts = this.store.getCollection('accounts');
                    const rs = accounts.find({ account: account.account });
                    if (rs.length == 0) {
                        accounts.insert(account);
                    } else {
                        accounts.chain().find({ account: account.account }).update(w => {
                            w.balanceNQT = account.balanceNQT;
                            w.type = account.type;
                            w.selected = account.selected;
                            w.name = account.name;
                            w.keys = account.keys;
                            w.transactions = account.transactions;
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
                    const accounts = this.store.getCollection('accounts');
                    let rs = accounts.find({ selected: true });
                    if (rs.length > 0) {
                        const account = new Account(rs[0]);
                        resolve(account);
                    } else {
                        rs = accounts.find();
                        if (rs.length > 0) {
                            accounts.chain().find({ account: rs[0].account }).update(w => {
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
                    const accounts = this.store.getCollection('accounts');
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

    /*
    * Method reponsible for fetching all accounts from the database.
    */
    public getAllAccounts(): Promise<Account[]> {
        return new Promise((resolve, reject) => {
            if (this.ready.value) {
                const accounts = this.store.getCollection('accounts');
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
                const accounts = this.store.getCollection('accounts');
                const rs = accounts.find({ account: account });
                if (account && rs.length > 0) {
                    const account = new Account(rs[0]);
                    resolve(account);
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
                    const accounts = this.store.getCollection('accounts');
                    const rs = accounts.chain().find({ account: account.account }).remove();
                    this.store.saveDatabase();
                    resolve(true);
                });
            } else {
                reject(false);
            }
        });
    }

    /*
    * Method reponsible for saving/updating the global Settings object to the database.
    */
    public saveSettings(save: Settings): Promise<Settings> {
        return new Promise((resolve, reject) => {
            if (this.ready.value) {
                this.store.loadDatabase({}, () => {
                    const settings = this.store.getCollection('settings');
                    const rs = settings.find({ id: save.id });

                    if (rs.length > 0) {
                        settings.chain().find({ id: save.id }).update(s => {
                            s.currency = save.currency;
                            s.language = save.language;
                            s.node = save.node;
                            s.version = save.version;
                            s.theme = save.theme;
                            s.contacts = save.contacts;
                            s.agree = save.agree;
                        });
                    } else {
                        settings.insert(save);
                    }
                    this.store.saveDatabase();
                    this.setSettings(save);
                    resolve(save);
                });
            } else {
                reject(undefined);
            }
        });
    }

    /*
    * Method reponsible for fetching the global Settings object from the database.
    */
    public getSettings(): Promise<Settings> {
        return new Promise((resolve, reject) => {
            if (this.ready.value) {
                const settings = this.store.getCollection('settings');
                const rs = settings.find();
                resolve(new Settings(rs[0]));
            } else {
                resolve(new Settings());
            }
        });
    }

    /*
    * Method reponsible for fetching block(s) from the database.
    */
    public getBlocks(blockHeight: number, count: number=1): Promise<Block[]> {
        return new Promise((resolve, reject) => {
            if (this.ready.value) {
                const blocks = this.store.getCollection('blocks');
                const block = blocks.find({ blockHeight: { '$lte': blockHeight } });
                if (block.length) {
                    resolve(block.slice(0, count));
                }
                resolve(undefined);
            } else {
                reject(undefined);
            }
        });
    }
    /*
    * Method reponsible for saving/updating a block in the database.
    */
    public saveBlock(block: Block): Promise<Block> {
        return new Promise((resolve, reject) => {
            if (this.ready.value) {
                this.store.loadDatabase({}, () => {
                    const blocks = this.store.getCollection('blocks');
                    const existingBlocks = blocks.find({ blockHeight: block.height });
                    if (existingBlocks.length > 0) {
                        existingBlocks.chain().find({ blockHeight: block.height }).update((existingBlock: Block) => { 
                            return { 
                                ...existingBlock, 
                                ...block
                            };
                        });
                    } else {
                        blocks.insert(block);
                    }
                    this.store.saveDatabase();
                    resolve(block);
                });
            } else {
                reject(undefined);
            }
        });
    }
}
