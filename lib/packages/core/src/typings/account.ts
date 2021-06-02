/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */

import { Keys } from '@signumjs/crypto';
import { Transaction } from './transaction';
import { AssetBalance } from './assetBalance';
import { UnconfirmedAssetBalance } from './unconfirmedAssetBalance';

// TODO: reduce this to simple response type (DTO). All the info her inside is application dependendent (i.e. Phoenix)
// - move this class to Phoenix (Web/Desktop/Mobile) and substitute by DTO
/**
* Account class
*
* The account class serves as a model for a Burstcoin account.
* It's meant to model the response from BRS API, except publicKey
* has been moved into the keys object.
 * @module core
*/
export class Account {
    public account: string;
    public accountRS: string;
    public accountRSExtended: string;
    public assetBalances: AssetBalance[];
    public balanceNQT: string;
    public description: string;
    public effectiveBalanceNQT: string;
    public keys: Keys;
    public name: string;
    public pinHash: string;
    public selected: boolean;
    public transactions: Transaction[];
    public type: string;
    public unconfirmedAssetBalances: UnconfirmedAssetBalance[];
    public unconfirmedBalanceNQT: string;
    public commitmentNQT: string;
    public committedBalanceNQT: string;
    public confirmed: boolean;

    constructor(data: any = {}) {
        this.account = data.account || undefined;
        this.accountRS = data.accountRS || undefined;
        this.accountRSExtended = data.accountRSExtended || undefined;
        this.assetBalances = data.assetBalances || undefined;
        this.balanceNQT = data.balanceNQT || 0;
        this.commitmentNQT = data.commitmentNQT || 0;
        this.committedBalanceNQT = data.committedBalanceNQT || 0;
        this.description = data.description || undefined;
        this.effectiveBalanceNQT = data.effectiveBalanceNQT || 0;
        if (data.publicKey || data.keys !== undefined) {
            this.pinHash = data.pinHash || undefined;
            this.keys = {
                publicKey: data.publicKey || data.keys.publicKey,
                signPrivateKey: data.keys.signPrivateKey,
                agreementPrivateKey: data.keys.agreementPrivateKey,
            };
        }
        this.name = data.name || undefined;
        this.selected = data.selected || false;
        if (data.transactions !== undefined && data.transactions.length > 0) {
            this.transactions = data.transactions;
        } else {
            this.transactions = [];
        }
        this.type = data.type || 'offline';
        this.unconfirmedAssetBalances = data.unconfirmedAssetBalances || undefined;
        this.unconfirmedBalanceNQT = data.unconfirmedBalanceNQT || 0;
        this.confirmed = data.confirmed || false;
    }
}
