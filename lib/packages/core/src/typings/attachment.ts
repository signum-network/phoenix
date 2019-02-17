/** @module core */

/**
 * Original work Copyright (c) 2018 PoC-Consortium
 * Modified work Copyright (c) 2019 Burst Apps Team
 */

/*
* Attachment class
*
* The attachment class is used to appended to transaction where appropriate.
* It is a super class for Message and EncryptedMessage.
*/
export class Attachment {
    public type?: string;

    constructor(type: string) {
        this.type = type;
    }
}

/*
* Message class
*
* The Message class is used to model a plain message attached to a transaction.
*/
export class Message extends Attachment {
    public messageIsText: boolean;
    public message: string;

    constructor(data: any = {}) {
        super('message');
        this.messageIsText = data.messageIsText || false;
        this.message = data.message || undefined;
    }
}

/*
* EncryptedMessage class
*
* The EncryptedMessage class is a model for a encrypted message attached to a transaction.
*/
export class EncryptedMessage extends Attachment {
    public data: string;
    public nonce: string;
    public isText: boolean;

    constructor(data: any = {}) {
        super('encrypted_message');
        this.data = data.data || undefined;
        this.nonce = data.nonce || undefined;
        this.isText = data.isText || false;
    }
}
