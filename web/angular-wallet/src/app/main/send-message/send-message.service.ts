import {Injectable} from '@angular/core';
import {
  TransactionId,
  signAndBroadcastTransaction,
  DefaultDeadline,
  UnsignedTransaction
} from '@signumjs/core';
import {Keys, encryptMessage, encryptData, EncryptedMessage, EncryptedData} from '@signumjs/crypto';
import {convertHexStringToByteArray} from '@signumjs/util';
import {getPrivateSigningKey} from 'app/util/security/getPrivateSigningKey';
import {getPrivateEncryptionKey} from 'app/util/security/getPrivateEncryptionKey';
import { LedgerService } from 'app/ledger.service';

interface SendMessageArgs {
  feePlanck: string;
  keys: Keys;
  message?: string;
  pin: string;
  recipientId: string;
  recipientPublicKey: string;
  messageIsText: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class SendMessageService {

  constructor(private ledgerService: LedgerService) {
  }

  public async sendEncryptedMessage(request: SendMessageArgs): Promise<void> {
      const {pin, feePlanck, recipientId, message, messageIsText, keys, recipientPublicKey} = request;
      // const recipient = await this.accountService.getAccount(recipientId);

      // FIXME: This entire encryption is nowadays much simpler...
      // but due to the 3.6.0 issue I do it manually....
      const agreementPrivateKey = getPrivateEncryptionKey(pin, keys);
      let encryptedMessage: EncryptedMessage | EncryptedData;
      if (messageIsText) {
        encryptedMessage = encryptMessage(
          message,
          recipientPublicKey,
          agreementPrivateKey
        );
      } else {
        encryptedMessage = encryptData(
          new Uint8Array(convertHexStringToByteArray(message)),
          recipientPublicKey,
          agreementPrivateKey
        );
      }

    const parameters = {
      deadline: DefaultDeadline,
      encryptedMessageData: encryptedMessage.data,
      encryptedMessageNonce: encryptedMessage.nonce,
      feeNQT: feePlanck,
      messageToEncryptIsText: messageIsText === undefined ? true : messageIsText,
      publicKey: keys.publicKey,
      recipient: recipientId,
      // FIXME: this is only temporary - return it once 3.6.1 is live
      // recipientPublicKey: a.recipientPublicKey || undefined,
    };

    const {unsignedTransactionBytes} = await this.ledgerService.ledger.service.send<UnsignedTransaction>('sendMessage', parameters);
    await signAndBroadcastTransaction(this.ledgerService.ledger.service)({
      senderPublicKey: keys.publicKey,
      senderPrivateKey: getPrivateSigningKey(pin, keys),
      unsignedHexMessage: unsignedTransactionBytes
    });
  }

  public async sendMessage(request: SendMessageArgs): Promise<TransactionId> {

    const {pin, feePlanck, recipientId, message, messageIsText, keys, recipientPublicKey} = request;

    return (await this.ledgerService.ledger.message.sendMessage({
      feePlanck,
      message,
      messageIsText,
      recipientId,
      // FIXME: this is only temporary - return it once 3.6.1 is live
      // recipientPublicKey,
      senderPrivateKey: getPrivateSigningKey(pin, keys),
      senderPublicKey: keys.publicKey,
    }) as TransactionId);

  }
}
