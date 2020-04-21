import {Transaction, MultioutRecipientAmount} from '..';
import {isMultiOutSameTransaction} from './isMultiOutSameTransaction';
import {isMultiOutTransaction} from './isMultiOutTransaction';
import {convertNQTStringToNumber, convertNumberToNQTString} from '@burstjs/util';

/**
 * Tries to extract recipients and its amounts for multi out payments (different and same amount)
 * @param transaction The transaction
 * @return A list of recipients and their payed amount (in NQT)
 * @throws An exception in case of wrong transaction types
 * @module core
 */
export function getRecipientAmountsFromMultiOutPayment(transaction: Transaction): Array<MultioutRecipientAmount> {

    if (isMultiOutSameTransaction(transaction)) {

        const recipients = transaction.attachment.recipients;

        const amount = recipients.length ? convertNQTStringToNumber(transaction.amountNQT) / recipients.length : 0;
        const amountNQT = convertNumberToNQTString(amount);
        return transaction.attachment.recipients.map(recipient => ({
            recipient,
            amountNQT
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
