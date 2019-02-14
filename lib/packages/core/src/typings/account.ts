/**
 * Original work Copyright (c) 2018 PoC-Consortium  
 * Modified work Copyright (c) 2019 Burst Apps Team
 */

import { Keys } from '@burstjs/crypto';
import { Transaction } from './transaction';

/*
* Account class
*
* The account class serves as a model for a Burstcoin account.
* Each account contains its Burst address and numeric id.
*/
export class Account {
    public id: string;
    public address: string;
    public alias: string;
    public balance: number;
    public keys: Keys;
    public pinHash: string;
    public selected: boolean;
    public transactions: Transaction[];
    public type: string;
    public unconfirmedBalance: number;

    constructor(data: any = {}) {
        this.id = data.id || undefined;
        this.address = data.address || undefined;
        this.alias = data.alias || undefined;
        this.balance = data.balance || 0;
        if (data.keys !== undefined) {
            this.keys = new Keys();
            this.pinHash = data.pinHash || undefined;
            this.keys.publicKey = data.keys.publicKey || undefined;
            this.keys.signPrivateKey = data.keys.signPrivateKey || undefined;
            this.keys.agreementPrivateKey = data.keys.agreementPrivateKey || undefined;
        }
        this.selected = data.selected || false;
        if (data.transactions !== undefined && data.transactions.length > 0) {
            this.transactions = data.transactions;
        } else {
            this.transactions = [];
        }
        this.type = data.type || 'offline';
        this.unconfirmedBalance = data.unconfirmedBalance || 0;
    }
} 
