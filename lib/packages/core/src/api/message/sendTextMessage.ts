import {broadcastTransaction} from '..';
import {BurstService} from '../../burstService';
import {BurstUtil} from '../../burstUtil';
import {TransactionId} from '../../typings/transactionId';
import {TransactionResponse} from '../../typings/transactionResponse';

/* TODO: remove this logic, once send message is dons
private postTransaction: any = (resolve, reject, transaction, encryptedPrivateKey, pin) => async (response) => {
    if (response.unsignedTransactionBytes != undefined) {
        // get unsigned transactionbytes
        const unsignedTransactionHex = response.unsignedTransactionBytes;
        // sign unsigned transaction bytes
        const signature = await this.cryptoService.generateSignature(unsignedTransactionHex, encryptedPrivateKey, this.hashPinEncryption(pin));
        const verified = await this.cryptoService.verifySignature(signature, unsignedTransactionHex, transaction.senderPublicKey);
        if (verified) {
            const signedTransactionBytes = await this.cryptoService.generateSignedTransactionBytes(unsignedTransactionHex, signature);
            const params = new HttpParams()
                .set("requestType", "broadcastTransaction")
                .set("transactionBytes", signedTransactionBytes);
            let requestOptions = BurstUtil.getRequestOptions();
            requestOptions.params = params;
            // request 'broadcastTransaction' to burst node
            return this.http.post(this.nodeUrl, {}, requestOptions)
                .timeout(constants.connectionTimeout)
                .toPromise<any>() // todo
                .then(response => {
                    const params = new HttpParams()
                        .set("requestType", "getTransaction")
                        .set("transaction", response.transaction);
                    requestOptions = BurstUtil.getRequestOptions();
                    requestOptions.params = params;
                    // request 'getTransaction' to burst node
                    return this.http.get(this.nodeUrl, requestOptions)
                        .timeout(constants.connectionTimeout)
                        .toPromise<any>() // todo
                        .then(response => {
                            resolve(new Transaction(response));
                        })
                        .catch(error => reject("Transaction error: Finalizing transaction!"));
                }).catch(error => reject("Transaction error: Executing transaction!"));
        }
        else {
            reject("Transaction error: Verifying signature!");
        }
    }
    else {
        reject("Transaction error: Generating transaction. Check the recipient!");
    }
};
*/


/**
 * Broadcasts a text message to the network/blockchain
 *
 * The message will be broadcasted in two steps.
 * 1. Send the message with public key to the network
 * 2. Take the returned unsigned message and sign it, i.e. the private key won't be transmitted.
 *
 * @param message The _text_ message to be sent
 * @param recipientId The recipients Id, not RS Address
 * @param senderPublicKey The senders public key for sending an _unsigned_ message
 * @param senderPrivateKey The senders private key to _sign_ the message
 * @return The Transaction Id
 */
export const sendTextMessage = (service: BurstService):
    (message: string, recipientId: string, senderPublicKey: string, senderPrivateKey: string) => Promise<TransactionId> =>
    async (
        message: string,
        recipientId: string,
        senderPublicKey: string,
        senderPrivateKey: string,
    ): Promise<TransactionId> => {

        const parameters = {
            recipient: recipientId,
            publicKey: senderPublicKey,
            message,
            messageIsText: true,
            broadcast: true,
            deadline: 1440, // which deadline?
            feeNQT: BurstUtil.convertNumberToString(1000), // which fee?
        };

        const transactionResponse = await service.send<TransactionResponse>('sendMessage', parameters);

        // TODO: sign the message

        const signedMessage = null;
        return broadcastTransaction(service)(signedMessage);
    };
