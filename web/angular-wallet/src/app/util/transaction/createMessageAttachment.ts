import {Attachment, AttachmentEncryptedMessage, AttachmentMessage} from '@signumjs/core';
import {encryptData, encryptMessage} from '@signumjs/crypto';
import {convertHexStringToByteArray} from '@signumjs/util';

interface CreateAttachmentArgs {
  message: string;
  recipientPublicKey: string;
  isEncrypted?: boolean;
  isText?: boolean;
  encryptionKey?: string;
}

export function createMessageAttachment(args: CreateAttachmentArgs): Attachment {
  const {isEncrypted = false, isText = true, encryptionKey, recipientPublicKey, message} = args;

  if (!isEncrypted) {
    return new AttachmentMessage({message, messageIsText: isText});
  }

  const encryptedMessage = isText
    ? encryptMessage(message, recipientPublicKey, encryptionKey)
    : encryptData(new Uint8Array(convertHexStringToByteArray(message)), recipientPublicKey, encryptionKey);
  return new AttachmentEncryptedMessage(encryptedMessage);
}
