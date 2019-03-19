import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ApiSettings, Attachment, TransactionApi } from '@burstjs/core';
import { environment } from 'environments/environment.prod';
import { Keys, decryptAES, hashSHA256 } from '@burstjs/crypto';
import {ApiService} from '../../api.service';

interface SendMoneyRequest {
    transaction: {
        amountNQT: string;
        feeNQT: string;
        attachment: Attachment;
        deadline: number;
        fullHash: string;
        type: number;
    };
    pin: string;
    keys: Keys;
    recipientAddress: string;
}

interface SendMoneyMultiOutRequest {
    transaction: {
        feeNQT: string;
        recipients: string;
        deadline: number;
        amountNQT?: string;
        fullHash?: string;
    };
    pin: string;
    sameAmount: boolean;
    keys: Keys;
}

@Injectable({
    providedIn: 'root'
})
export class TransactionService {
    private transactionApi: TransactionApi;

    public currentAccount: BehaviorSubject<any> = new BehaviorSubject(undefined);

    constructor(apiService: ApiService) {
        const apiSettings = new ApiSettings(environment.defaultNode, 'burst');
        this.transactionApi = apiService.api.transaction;
    }

    public getTransaction(id: string) {
        return this.transactionApi.getTransaction(id);
    }

    public async sendMoney({ transaction, pin, keys, recipientAddress }: SendMoneyRequest) {
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
        const senderPrivateKey = decryptAES(keys.signPrivateKey, hashSHA256(pin));
        return this.transactionApi.sendMoney(transaction, keys.publicKey, senderPrivateKey, recipientAddress);
    }
    public async sendMoneyMultiOut({ transaction, pin, keys, sameAmount }: SendMoneyMultiOutRequest) : Promise<TransactionId> {
        const senderPrivateKey = decryptAES(keys.signPrivateKey, hashSHA256(pin));
        return this.transactionApi.sendMoneyMultiOut(transaction, keys.publicKey, senderPrivateKey, transaction.recipients, sameAmount);
    }
}
