import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ApiSettings, Attachment, TransactionApi, TransactionId, EncryptedMessage, Message } from '@burstjs/core';
import { environment } from 'environments/environment.prod';
import { Keys, decryptAES, hashSHA256, getAccountIdFromPublicKey, encryptMessage } from '@burstjs/crypto';
import { ApiService } from '../../api.service';
import { AccountService } from 'app/setup/account/account.service';
import { convertAddressToNumericId } from '@burstjs/util/out';

interface SendMoneyRequest {
    transaction: {
        amountNQT: string;
        feeNQT: string;
        attachment: EncryptedMessage | Message;
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

    constructor(apiService: ApiService, private accountService: AccountService) {
        const apiSettings = new ApiSettings(environment.defaultNode, 'burst');
        this.transactionApi = apiService.api.transaction;
    }

    public getTransaction(id: string) {
        return this.transactionApi.getTransaction(id);
    }

    public async sendMoney({ transaction, pin, keys, recipientAddress }: SendMoneyRequest) {
        if (transaction.attachment && (<EncryptedMessage>transaction.attachment).data) {

            const recipientAccountId = await convertAddressToNumericId(recipientAddress); 
            const recipient = await this.accountService.getAccount(recipientAccountId);
            const agreementPrivateKey = decryptAES(keys.agreementPrivateKey, hashSHA256(pin));
            const encryptedMessage = await encryptMessage((<EncryptedMessage>transaction.attachment).data,
            // @ts-ignore
            recipient.publicKey, 
            agreementPrivateKey);
            transaction.attachment =  encryptedMessage;
            transaction.attachment.type = 'encrypted_message'; 
        }
        const senderPrivateKey = decryptAES(keys.signPrivateKey, hashSHA256(pin));
        return this.transactionApi.sendMoney(transaction, keys.publicKey, senderPrivateKey, recipientAddress);
    }
    public async sendMoneyMultiOut({ transaction, pin, keys, sameAmount }: SendMoneyMultiOutRequest) : Promise<TransactionId> {
        const senderPrivateKey = decryptAES(keys.signPrivateKey, hashSHA256(pin));
        return this.transactionApi.sendMoneyMultiOut(transaction, keys.publicKey, senderPrivateKey, transaction.recipients, sameAmount);
    }
}
