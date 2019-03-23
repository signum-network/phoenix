/** @module core */

import {Transaction, MultioutRecipientAmount} from '..';
import {TransactionType} from '../constants/transactionType';
import {TransactionPaymentSubtype} from '../constants';
import {assertAttachmentVersion} from './assertAttachmentVersion';

/**
 * Tries to extract recipients and its amounts for multi out payments (different and same amount)
 * @param transaction The transaction
 * @return A list of recipients and payed amount
 * @throws An exception in case of wrong transaction types
 */
export function getRecipientsFromMultiOutPayment(transaction: Transaction): Array<MultioutRecipientAmount> {

    if (transaction.type === TransactionType.Payment
        && transaction.subtype === TransactionPaymentSubtype.MultiOutSameAmount) {
        return transaction.attachment.recipients.map(r => ({
            recipient: r,
            amountNQT: transaction.amountNQT,
        }));
    }

    if (transaction.type === TransactionType.Payment
        && transaction.subtype === TransactionPaymentSubtype.MultiOut) {
        return transaction.attachment.recipients.map(r => ({
            recipient: r[0],
            amountNQT: r[1],
        }));
    }

    throw new Error(`Transaction ${transaction.transaction} is not of type 'Multi Out Payment'`);
}
