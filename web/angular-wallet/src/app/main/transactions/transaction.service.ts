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
import {Keys, decryptAES, hashSHA256, encryptMessage} from '@burstjs/crypto';
import {ApiService} from '../../api.service';
import {AccountService} from 'app/setup/account/account.service';
import {convertAddressToNumericId} from '@burstjs/util/out';
import {StoreService} from 'app/store/store.service';
import {Settings} from 'app/settings';
import {LedgerService} from '../../ledger/ledger.service';

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
  shouldEncryptMessage?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private transactionApi: TransactionApi;

  public currentAccount: BehaviorSubject<any> = new BehaviorSubject(undefined);

  constructor(apiService: ApiService, private accountService: AccountService, private storeService: StoreService, private ledgerService: LedgerService) {
    this.transactionApi = apiService.api.transaction;
    this.storeService.settings.subscribe((settings: Settings) => {
      this.transactionApi = apiService.api.transaction;
    });
  }

  public getTransaction(id: string): Promise<Transaction> {
    return this.transactionApi.getTransaction(id);
  }

  private getSendersPrivateKey(pin: string, keys: Keys): string { // TODO don't do this if signFunc is null
    return decryptAES(keys.signPrivateKey, hashSHA256(pin));
  }

  public async sendMoneyMultiOut({transaction, pin, keys, sameAmount}: SendMoneyMultiOutRequest): Promise<TransactionId> {
    const signFunc = await this.accountService.getCustomSignFunc();
    let senderPrivateKey: string;
    if (signFunc === null) {
      senderPrivateKey = decryptAES(keys.signPrivateKey, hashSHA256(pin));
    }
    return this.transactionApi.sendMoneyMultiOut(transaction, keys.publicKey, senderPrivateKey, transaction.recipients, sameAmount, signFunc);
  }

  public async sendBurstToMultipleRecipients(request: SendBurstMultipleRequest): Promise<TransactionId> {
    const {fee, keys, pin, recipientAmounts} = request;
    return this.transactionApi.sendAmountToMultipleRecipients(
      recipientAmounts,
      fee,
      keys.publicKey,
      this.getSendersPrivateKey(pin, keys),
      await this.accountService.getCustomSignFunc()
    );
  }

  public async sendSameBurstToMultipleRecipients(request: SendBurstMultipleSameRequest): Promise<TransactionId> {
    const {amountNQT, fee, keys, pin, recipientIds} = request;
    return this.transactionApi.sendSameAmountToMultipleRecipients(
      amountNQT,
      fee,
      recipientIds,
      keys.publicKey,
      this.getSendersPrivateKey(pin, keys),
      await this.accountService.getCustomSignFunc()
    );
  }

  public async sendBurst(request: SendBurstRequest): Promise<TransactionId> {
    try {
      const {pin, amount, fee, recipientId, message, shouldEncryptMessage, keys, deadline} = request;
      const signFunc = await this.accountService.getCustomSignFunc();

      let attachment: Attachment;
      if (message && shouldEncryptMessage) {
        const recipient = await this.accountService.getAccount(recipientId);
        const agreementPrivateKey = decryptAES(keys.agreementPrivateKey, hashSHA256(pin));
        const encryptedMessage = encryptMessage(
          message,
          // @ts-ignore
          recipient.publicKey,
          agreementPrivateKey
        );
        attachment = new AttachmentEncryptedMessage(encryptedMessage);
      } else if (message) {
        attachment = new AttachmentMessage({message, messageIsText: true});
      }

      return this.transactionApi.sendAmount(
        amount,
        fee,
        recipientId,
        keys.publicKey,
        signFunc == null ? this.getSendersPrivateKey(pin, keys) : null,
        attachment,
        deadline,
        signFunc);
    } catch (e) {
      console.log(e);
    }
  }
}
