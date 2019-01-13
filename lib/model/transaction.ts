/*
* Copyright 2018 PoC-Consortium
*/

import { Attachment, EncryptedMessage, Message } from "./attachment"

/*
* Transaction class
*
* The Transaction class is a mapping for a transaction on the Burst blockchain
*/
export class Transaction {
    public id?: string;
    public amountNQT?: number;
    public attachment?: Attachment | EncryptedMessage | Message;
    public block?: string;
    public blockTimestamp?: number;
    public confirmations?: number;
    public confirmed?: boolean;
    public deadline?: string;
    public feeNQT?: number;
    public fullHash?: string;
    public height?: number;
    public recipients?: string;
    public recipientId?: string;
    public recipientAddress: string;
    public recipientPublicKey?: string;
    public senderId?: string;
    public senderAddress?: string;
    public senderPublicKey?: string;
    public signature?: string;
    public signatureHash?: string;
    public subtype?: number;
    public timestamp?: number;
    public type?: number;
    public version?: number;

    constructor(data: any = {}) {
        this.id = data.transaction || undefined;
        this.amountNQT = data.amountNQT || 0;
        // message attachment
        if (data.attachment != undefined && data.attachment.message != undefined) {
            this.attachment = new Message(data.attachment);
        }
        // encryptedMessage attachment
        if (data.attachment != undefined && data.attachment.encryptedMessage != undefined) {
            this.attachment = new EncryptedMessage(data.attachment.encryptedMessage)
        }
        this.block = data.block || undefined;
        this.blockTimestamp = data.blockTimestamp || 0;
        this.confirmations = data.confirmations || 0;
        this.confirmed = data.confirmed == false ? false : true;
        this.deadline = data.deadline || 0;
        this.feeNQT = data.feeNQT || 0;
        this.fullHash = data.fullHash || undefined;
        this.height = data.height || 0;
        this.recipientId = data.recipient || undefined;
        this.recipientAddress = data.recipientRS || undefined;
        this.recipientPublicKey = data.recipientPublicKey || undefined;
        this.senderId = data.sender || undefined;
        this.senderAddress = data.senderRS|| undefined;
        this.senderPublicKey = data.senderPublicKey || undefined;
        this.signature = data.signature || undefined;
        this.signatureHash = data.signatureHash || undefined;
        this.subtype = data.subtype || 0;
        this.timestamp = data.timestamp || 0;
        this.type = data.type || 0;
        this.version = data.version || 0;
    }
}
