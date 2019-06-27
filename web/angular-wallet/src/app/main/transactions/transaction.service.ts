import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {TransactionApi, TransactionId, AttachmentEncryptedMessage, AttachmentMessage, Attachment} from '@burstjs/core';
import {Keys, decryptAES, hashSHA256, encryptMessage} from '@burstjs/crypto';
import {ApiService} from '../../api.service';
import {AccountService} from 'app/setup/account/account.service';
import {convertAddressToNumericId} from '@burstjs/util/out';
import {StoreService} from 'app/store/store.service';
import {Settings} from 'app/settings';

interface SendMoneyRequest {
  transaction: {
    amountNQT: string;
    feeNQT: string;
    attachment: AttachmentEncryptedMessage | AttachmentMessage;
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

interface SendBurstRequest {
  fee: string;
  amount: string;
  recipientId: string;
  deadline: number;
  pin: string;
  keys: Keys;
  message?: string;
  shouldEncryptMessage?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private transactionApi: TransactionApi;

  public currentAccount: BehaviorSubject<any> = new BehaviorSubject(undefined);

  constructor(apiService: ApiService, private accountService: AccountService, private storeService: StoreService) {
    this.transactionApi = apiService.api.transaction;
    this.storeService.settings.subscribe((settings: Settings) => {
      this.transactionApi = apiService.api.transaction;
    });
  }

  public getTransaction(id: string) {
    return this.transactionApi.getTransaction(id);
  }

  public async sendMoneyMultiOut({transaction, pin, keys, sameAmount}: SendMoneyMultiOutRequest): Promise<TransactionId> {
    const senderPrivateKey = decryptAES(keys.signPrivateKey, hashSHA256(pin));
    return this.transactionApi.sendMoneyMultiOut(transaction, keys.publicKey, senderPrivateKey, transaction.recipients, sameAmount);
  }

  public async sendBurst(request: SendBurstRequest): Promise<TransactionId> {

    const {pin, amount, fee, recipientId, message, shouldEncryptMessage, keys} = request;
    const {publicKey, signPrivateKey}  = keys;

    let attachment: Attachment;
    if (message && shouldEncryptMessage){
        const recipient = await this.accountService.getAccount(recipientId);
        const agreementPrivateKey = decryptAES(keys.agreementPrivateKey, hashSHA256(pin));
      const encryptedMessage = encryptMessage(
          message,
          // @ts-ignore
          recipient.publicKey,
          agreementPrivateKey
        );
        attachment = new AttachmentEncryptedMessage(encryptedMessage);
    }
    else if (message){
      attachment = new AttachmentMessage({message, messageIsText: true} );
    }

    const senderPrivateKey = decryptAES(signPrivateKey, hashSHA256(pin));
    return this.transactionApi.sendAmount(
      amount,
      fee,
      recipientId,
      publicKey,
      senderPrivateKey,
      attachment);
  }

}
