/** @module core */

import {Transaction, MultioutRecipientAmount} from '..';
import {isMultiOutSameTransaction} from './isMultiOutSameTransaction';
import {isMultiOutTransaction} from './isMultiOutTransaction';

/**
 * Tries to extract recipients and its amounts for multi out payments (different and same amount)
 * @param transaction The transaction
 * @return A list of recipients and their payed amount (in NQT)
 * @throws An exception in case of wrong transaction types
 */
export function getRecipientAmountsFromMultiOutPayment(transaction: Transaction): Array<MultioutRecipientAmount> {

    if (isMultiOutSameTransaction(transaction)) {
        return transaction.attachment.recipients.map(r => ({
            recipient: r,
            amountNQT: transaction.amountNQT,
        }));
    }

    if (isMultiOutTransaction(transaction)) {
        return transaction.attachment.recipients.map(r => ({
            recipient: r[0],
            amountNQT: r[1],
        }));
    }

    throw new Error(`Transaction ${transaction.transaction} is not of type 'Multi Out Payment'`);
}
