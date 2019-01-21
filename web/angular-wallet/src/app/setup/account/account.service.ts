import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout'

import { StoreService } from "app/store/store.service";
import { Settings } from "app/settings";
import { Account, Keys, BurstUtil } from "@burst/core";
import { generateMasterKeys, encryptAES, hashSHA256, getAccountIdFromPublicKey, getBurstAddressFromAccountId, getAccountIdFromBurstAddress } from "@burst/crypto";

@Injectable()
export class AccountService {
    private nodeUrl: string;

    public currentAccount: BehaviorSubject<any> = new BehaviorSubject(undefined);

    constructor(private storeService: StoreService) {
        this.storeService.settings.subscribe((settings: Settings) => {
            this.nodeUrl = settings.node;
        });
    }

    public setCurrentAccount(account: Account) {
        this.currentAccount.next(account);
    }

    /*
    * Method responsible for creating a new active account from a passphrase.
    * Generates keys for an account, encrypts them with the provided key and saves them.
    * TODO: error handling of asynchronous method calls
    */
    public createActiveAccount({ passphrase, pin = "" }): Promise<Account> {
        return new Promise((resolve, reject) => {
            let account: Account = new Account();
            // import active account
            account.type = "active";
            const keys = generateMasterKeys(passphrase);

            let newKeys = new Keys();
            newKeys.publicKey = keys.publicKey;

            const encryptedKey = encryptAES(keys.signPrivateKey, hashSHA256(pin))
            newKeys.signPrivateKey = encryptedKey;

            const encrypedSignKey = encryptAES(keys.agreementPrivateKey, hashSHA256(pin));
            newKeys.agreementPrivateKey = encrypedSignKey;
            account.keys = newKeys;
            account.pinHash = hashSHA256(pin + keys.publicKey);
            
            const id = getAccountIdFromPublicKey(keys.publicKey)
            account.id = id;

            const address = getBurstAddressFromAccountId(id)
            account.address = address;

            return this.storeService.saveAccount(account)
                .then(account => {
                    resolve(account);
                });
        });
    }

    /*
    * Method responsible for importing an offline account.
    * Creates an account object with no keys attached.
    */
    public createOfflineAccount(address: string): Promise<Account> {
        return new Promise((resolve, reject) => {

            if (!BurstUtil.isValid(address)) {
                reject("Invalid Burst Address");
            }

            let account: Account = new Account();

            this.storeService.findAccount(BurstUtil.decode(address))
                .then(found => {
                    if (found == undefined) {
                        // import offline account
                        account.type = "offline";
                        account.address = address;
                        const id = getAccountIdFromBurstAddress(address)
                        account.id = id;
                        return this.storeService.saveAccount(account)
                            .then(account => {
                                resolve(account);
                            });
                    } else {
                        reject("Burstcoin address already imported!");
                    }
                })
        });
    }

    /*
    * Method responsible for selecting a different account.
    */
    public selectAccount(account: Account): Promise<Account> {
        return new Promise((resolve, reject) => {
            this.storeService.selectAccount(account)
                .then(account => {
                    // this.synchronizeAccount(account);
                })
            this.setCurrentAccount(account);
            resolve(account);
        });
    }
}
