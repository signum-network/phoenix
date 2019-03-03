/** @module core */

/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */

import { Keys } from '@burstjs/crypto';
import { Transaction } from './transaction';
import { AssetBalance } from './assetBalance';
import { UnconfirmedAssetBalance } from './unconfirmedAssetBalance';

/**
* Account class
*
* The account class serves as a model for a Burstcoin account.
* It's meant to model the response from BRS API, except publicKey
* has been moved into the keys object.
*/
export class Account {
    public account: string;
    public accountRS: string;
    public assetBalances: AssetBalance[]
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

    constructor(data: any = {}) {
        this.account = data.account || undefined;
        this.accountRS = data.accountRS || undefined;
        this.assetBalances = data.assetBalances || undefined;
        this.balanceNQT = data.balanceNQT || 0;
        this.description = data.description || undefined;
        this.effectiveBalanceNQT = data.effectiveBalanceNQT || 0;
        if (data.publicKey || data.keys !== undefined) {
            this.keys = new Keys();
            this.pinHash = data.pinHash || undefined;
            this.keys.publicKey = data.publicKey || data.keys.publicKey || undefined;
            this.keys.signPrivateKey = data.keys.signPrivateKey || undefined;
            this.keys.agreementPrivateKey = data.keys.agreementPrivateKey || undefined;
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
    }
}
