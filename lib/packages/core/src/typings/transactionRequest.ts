import AbstractModel from './abstractModel';
import { Attachment, EncryptedMessage, Message } from '..';

/*
* Transaction class
*
* The Transaction class is a mapping for a transaction on the Burst blockchain
*/
export class TransactionRequest extends AbstractModel {
    public id?: string = undefined;
    public amountNQT = 0;
    public attachment?: Attachment | EncryptedMessage | Message = undefined;
    public block?: string = undefined;
    public blockTimestamp = 0;
    public confirmations = 0;
    public confirmed = false;
    public deadline = 0;
    public feeNQT = 0;
    public fullHash?: string = undefined;
    public height = 0;
    public recipient?: string = undefined;
    public recipientRS?: string = undefined;
    public recipientPublicKey?: string = undefined;
    public sender?: string = undefined;
    public senderRS?: string = undefined;
    public senderPublicKey?: string = undefined;
    public signature?: string = undefined;
    public signatureHash?: string = undefined;
    public subtype = 0;
    public timestamp = 0;
    public type = 0;
    public version = 0;

    constructor(data: any = {}) {
        super();
        const {transaction, attachment, ...rest} = data;
        this.id =  transaction;

        if (attachment && attachment.message !== undefined ) {
            this.attachment = new Message(attachment);
        }

        if (attachment && attachment.encryptedMessage !== undefined) {
            this.attachment = new EncryptedMessage(attachment.encryptedMessage);
        }

        this.mapJsonToProps(rest);
    }
}
