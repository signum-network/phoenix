import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {
  TransactionApi,
  TransactionId,
  AttachmentEncryptedMessage,
  AttachmentMessage,
  Attachment,
  MultioutRecipientAmount, Transaction
} from '@burstjs/core';
import {Keys, decryptAES, hashSHA256, encryptMessage, encryptData, EncryptedMessage, EncryptedData} from '@burstjs/crypto';
import {ApiService} from '../../api.service';
import {AccountService} from 'app/setup/account/account.service';
import {convertHexStringToByteArray} from '@burstjs/util';
import {StoreService} from 'app/store/store.service';
import {Settings} from 'app/settings';

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

interface SendBurstMultipleSameRequest {
  amountNQT: string;
  fee: string;
  deadline?: number;
  keys: Keys;
  pin: string;
  recipientIds: string[];
}

interface SendBurstMultipleRequest {
  fee: string;
  deadline?: number;
  recipientAmounts: MultioutRecipientAmount[];
  pin: string;
  keys: Keys;
}

interface SendBurstRequest {
  amount: string;
  deadline?: number;
  fee: string;
  keys: Keys;
  message?: string;
  pin: string;
  recipientId: string;
  messageIsText: boolean;
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

  public getTransaction(id: string): Promise<Transaction> {
    return this.transactionApi.getTransaction(id);
  }

  private getSendersPrivateKey(pin: string, keys: Keys): string {
    return decryptAES(keys.signPrivateKey, hashSHA256(pin));
  }

  public async sendBurstToMultipleRecipients(request: SendBurstMultipleRequest): Promise<TransactionId> {
    const {fee, keys, pin, recipientAmounts} = request;
    return this.transactionApi.sendAmountToMultipleRecipients(
      recipientAmounts,
      fee,
      keys.publicKey,
      this.getSendersPrivateKey(pin, keys)
    );
  }

  public async sendSameBurstToMultipleRecipients(request: SendBurstMultipleSameRequest): Promise<TransactionId> {
    const {amountNQT, fee, keys, pin, recipientIds} = request;
    return this.transactionApi.sendSameAmountToMultipleRecipients(
      amountNQT,
      fee,
      recipientIds,
      keys.publicKey,
      this.getSendersPrivateKey(pin, keys)
    );
  }

  public async sendBurst(request: SendBurstRequest): Promise<TransactionId> {

    const {pin, amount, fee, recipientId, message, messageIsText, shouldEncryptMessage, keys} = request;

    let attachment: Attachment;
    if (message && shouldEncryptMessage) {
      const recipient = await this.accountService.getAccount(recipientId);
      const agreementPrivateKey = decryptAES(keys.agreementPrivateKey, hashSHA256(pin));
      let encryptedMessage: EncryptedMessage | EncryptedData;
      if (messageIsText) {
        encryptedMessage = encryptMessage(
          message,
          // @ts-ignore
          recipient.publicKey,
          agreementPrivateKey
        );
      } else {
        encryptedMessage = encryptData(
          new Uint8Array(convertHexStringToByteArray(message)),
          // @ts-ignore
          recipient.publicKey,
          agreementPrivateKey
        );
      }

      attachment = new AttachmentEncryptedMessage(encryptedMessage);
    } else if (message) {
      attachment = new AttachmentMessage({message, messageIsText});
    }

    return this.transactionApi.sendAmount(
      amount,
      fee,
      recipientId,
      keys.publicKey,
      this.getSendersPrivateKey(pin, keys),
      attachment);
  }

}
