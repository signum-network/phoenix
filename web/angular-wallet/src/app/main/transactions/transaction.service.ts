import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/timeout';

import { composeApi, ApiSettings, Attachment } from '@burstjs/core';
import { environment } from 'environments/environment.prod';
import { Keys, decryptAES, hashSHA256 } from '@burstjs/crypto';
import { HttpError } from '@burstjs/http/out';
import { NotifierService } from 'angular-notifier';
import { UtilService } from 'app/util.service';

interface SendMoneyRequest {
    transaction: {
        amountNQT: number,
        feeNQT: string,
        attachment: Attachment,
        deadline: number,
        fullHash: string,
        type: number,
    };
    pin: string;
    keys: Keys;
    recipientAddress: string;
}

@Injectable({
    providedIn: 'root'
})
export class TransactionService {
    private api: any; // todo

    public currentAccount: BehaviorSubject<any> = new BehaviorSubject(undefined);

    constructor(private notifierService: NotifierService,
        private utilService: UtilService) {
        this.notifierService = notifierService;
        const apiSettings = new ApiSettings(environment.defaultNode, 'burst');
        this.api = composeApi(apiSettings);
    }

    public getTransaction(id: string) {
        return this.api.transaction.getTransaction(id);
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
        return this.api.transaction.sendMoney(transaction, keys.publicKey, senderPrivateKey, recipientAddress);
    }
}
