import {Injectable} from '@angular/core';
import {
  TransactionId,
  AttachmentEncryptedMessage,
  AttachmentMessage,
  Attachment,
  MultioutRecipientAmount
} from '@signumjs/core';
import {Keys, encryptMessage, encryptData, EncryptedMessage, EncryptedData} from '@signumjs/crypto';
import {AccountService} from 'app/setup/account/account.service';
import {convertHexStringToByteArray} from '@signumjs/util';
import {getPrivateSigningKey} from 'app/util/security/getPrivateSigningKey';
import {getPrivateEncryptionKey} from 'app/util/security/getPrivateEncryptionKey';
import { LedgerService } from 'app/ledger.service';

interface SendSignaMultipleSameRequest {
  amountNQT: string;
  fee: string;
  deadline?: number;
  keys: Keys;
  pin: string;
  recipientIds: string[];
}

interface SendSignaMultipleRequest {
  fee: string;
  deadline?: number;
  recipientAmounts: MultioutRecipientAmount[];
  pin: string;
  keys: Keys;
}

interface SendSignaRequest {
  amount: string;
  deadline?: number;
  fee: string;
  keys: Keys;
  message?: string;
  pin: string;
  recipientId: string;
  recipientPublicKey: string;
  messageIsText: boolean;
  shouldEncryptMessage?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SendMoneyService {

  constructor(private ledgerService: LedgerService,
              private accountService: AccountService) {
  }

  public sendAmountToMultipleRecipients(request: SendSignaMultipleRequest): Promise<TransactionId> {
    const {fee, keys, pin, recipientAmounts} = request;
    return this.ledgerService.ledger.transaction.sendAmountToMultipleRecipients({
      senderPublicKey: keys.publicKey,
      senderPrivateKey: getPrivateSigningKey(pin, keys),
      recipientAmounts,
      feePlanck: fee
    }) as Promise<TransactionId>;
  }

  public sendSameAmountToMultipleRecipients(request: SendSignaMultipleSameRequest): Promise<TransactionId> {
    const {amountNQT, fee, keys, pin, recipientIds} = request;
    return this.ledgerService.ledger.transaction.sendSameAmountToMultipleRecipients({
      amountPlanck: amountNQT,
      feePlanck: fee,
      recipientIds,
      senderPrivateKey: getPrivateSigningKey(pin, keys),
      senderPublicKey: keys.publicKey
    }) as Promise<TransactionId>;
  }

  public async sendAmount(request: SendSignaRequest): Promise<TransactionId> {

    const {pin, amount, fee, recipientId, message, messageIsText, shouldEncryptMessage, keys, recipientPublicKey} = request;

    let attachment: Attachment;
    if (message && shouldEncryptMessage) {
      const recipient = await this.accountService.getAccount(recipientId);
      if (!recipient.keys.publicKey) {
        throw new ErrorEvent('error_recipient_no_public_key');
      }
      const agreementPrivateKey = getPrivateEncryptionKey(pin, keys);
      let encryptedMessage: EncryptedMessage | EncryptedData;
      if (messageIsText) {
        encryptedMessage = encryptMessage(
          message,
          recipient.keys.publicKey,
          agreementPrivateKey
        );
      } else {
        encryptedMessage = encryptData(
          new Uint8Array(convertHexStringToByteArray(message)),
          recipient.keys.publicKey,
          agreementPrivateKey
        );
      }

      attachment = new AttachmentEncryptedMessage(encryptedMessage);
    } else if (message) {
      attachment = new AttachmentMessage({message, messageIsText});
    }

    // @ts-ignore
    return this.ledgerService.ledger.transaction.sendAmountToSingleRecipient({
      amountPlanck: amount,
      feePlanck: fee,
      recipientId,
      // FIXME: this is only temporary
      // recipientPublicKey,
      senderPrivateKey: getPrivateSigningKey(pin, keys),
      senderPublicKey: keys.publicKey,
      attachment
    });

  }
}
