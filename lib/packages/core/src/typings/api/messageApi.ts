import {TransactionId} from "../transactionId";

export interface MessageApi {
    sendTextMessage: (
        message: string,
        recipientId: string,
        senderPublicKey: string,
        senderPrivateKey: string,
        fee?: number
    ) => Promise<TransactionId>;
}
