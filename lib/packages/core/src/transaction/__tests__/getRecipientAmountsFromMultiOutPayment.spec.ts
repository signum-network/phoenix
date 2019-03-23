import {getRecipientAmountsFromMultiOutPayment} from '../getRecipientAmountsFromMultiOutPayment';
import {TransactionType} from '../../constants/transactionType';
import {TransactionPaymentSubtype} from '../../constants';

describe('getRecipientAmountsFromMultiOutPayment', () => {

    it('returns recipients for Multi Out Same Amount Payment', () => {
        const transaction = {
            transaction: '123',
            amountNQT: 'amount',
            type: TransactionType.Payment,
            subtype: TransactionPaymentSubtype.MultiOutSameAmount,
            attachment: {'version.MultiOutCreation': 1, recipients: ['123', '456']}
        };

        const recipientAmounts = getRecipientAmountsFromMultiOutPayment(transaction);
        expect(recipientAmounts).toHaveLength(2);
        expect(recipientAmounts[0].recipient).toBe('123');
        expect(recipientAmounts[0].amountNQT).toBe('amount');
        expect(recipientAmounts[1].recipient).toBe('456');
        expect(recipientAmounts[1].amountNQT).toBe('amount');
    });

    it('returns recipients for Multi Out Different Amount Payment', () => {
        const transaction = {
            transaction: '123',
            type: TransactionType.Payment,
            subtype: TransactionPaymentSubtype.MultiOut,
            attachment: {'version.MultiOutCreation': 1, recipients: [['123', 'amountA'], ['456', 'amountB']]}
        };

        const recipientAmounts = getRecipientAmountsFromMultiOutPayment(transaction);
        expect(recipientAmounts).toHaveLength(2);
        expect(recipientAmounts[0].recipient).toBe('123');
        expect(recipientAmounts[0].amountNQT).toBe('amountA');
        expect(recipientAmounts[1].recipient).toBe('456');
        expect(recipientAmounts[1].amountNQT).toBe('amountB');
    });

    it('throws exception due to wrong type', () => {
        const transaction = {
            transaction: '123',
            type: TransactionType.Arbitrary,
            attachment: {'version.MultiOutCreation': 1, recipients: [['123', 'ammountA'], ['456', 'amountB']]}
        };

        try {
            getRecipientAmountsFromMultiOutPayment(transaction);
            expect(false).toBe('Expected Exception');
        } catch (e) {
            expect(e.message).toContain('Transaction 123 is not of type \'Multi Out Payment\'');
        }
    });

    it('throws exception due to wrong subtype', () => {
        const transaction = {
            transaction: '123',
            type: TransactionType.Payment,
            subtype: TransactionPaymentSubtype.Ordinary,
            attachment: {'version.MultiOutCreation': 1, recipients: [['123', 'ammountA'], ['456', 'amountB']]}
        };

        try {
            getRecipientAmountsFromMultiOutPayment(transaction);
            expect(false).toBe('Expected Exception');
        } catch (e) {
            expect(e.message).toContain('Transaction 123 is not of type \'Multi Out Payment\'');
        }
    });
});
