import {BurstService} from '../../burstService';
import {BlockId} from '../..';
import {TransactionId} from '../../typings/transactionId';

/*
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
 * Broadcasts a transaction to the network/blockchain
 *
 * @param signedTransactionPayload The _signed_ transaction payload encoded in base64
 * @return The Transaction Id
 */
export const broadcastTransaction = (service: BurstService):
    (signedTransactionPayload: string) => Promise<TransactionId> =>
    (signedTransactionPayload: string): Promise<TransactionId> =>
        service.send('broadcastTransaction', {transactionBytes: signedTransactionPayload});
