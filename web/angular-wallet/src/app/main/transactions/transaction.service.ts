import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';

import { compose, ApiSettings, Transaction, EncryptedMessage, Attachment } from '@burstjs/core';
import { environment } from 'environments/environment.prod';
import { Keys, getAccountIdFromPublicKey, encryptMessage } from '@burstjs/crypto';

interface TransactionRequest {
    transaction: {
        recipientAddress: string,
        amountNQT: number,
        feeNQT: string,
        attachment: Attachment,
        deadline: number,
        fullHash: string,
        type: number,
    },
    pin: string,
    keys: Keys
};

@Injectable()
export class TransactionService {
    private api: any; //todo

    public currentAccount: BehaviorSubject<any> = new BehaviorSubject(undefined);

    constructor() {
        const apiSettings = new ApiSettings(environment.defaultNode, 'burst');
        this.api = compose(apiSettings);
    }

    public getTransaction(id: string) {
        return this.api.transaction.getTransaction(id);
    }

    public async sendBurst({ transaction, pin, keys }: TransactionRequest) {
        let transactionToSend = {
            senderPublicKey: keys.publicKey,
            ...transaction
        };

        // todo
        // if (transactionToSend.attachment && transactionToSend.attachment.encryptedMessage) {
        //     const recipientPublicKey = await getAccountIdFromPublicKey(transaction.recipientAddress);
        //     const encryptedMessage = await encryptMessage(transactionToSend.attachment.encryptedMessage,
        //         keys.agreementPrivateKey, this.accountService.hashPinEncryption(pin), recipientPublicKey);
        //     transactionToSend = {
        //         attachment: new EncryptedMessage({
        //             data: encryptedMessage.m,
        //             nonce: encryptedMessage.n,
        //             isText: true
        //         }),
        //         ...transactionToSend
        //     };
        // }
        return true; // todo: call sendMoney then postTransaction
    }
}