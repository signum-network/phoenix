import {TransactionPaymentSubtype, TransactionType} from '../../constants';
import {isMultiOutTransaction} from '../isMultiOutTransaction';

describe('isMultiOutTransaction', () => {
    it('returns true on correct type and subtype', () => {

        const transaction = {
            type: TransactionType.Payment,
            subtype: TransactionPaymentSubtype.MultiOut
        };

        expect(isMultiOutTransaction(transaction)).toBeTruthy();
    });

    it('returns false on correct type and wrong subtype', () => {

        const transaction = {
            type: TransactionType.Payment,
            subtype: TransactionPaymentSubtype.MultiOutSameAmount
        };

        expect(isMultiOutTransaction(transaction)).toBeFalsy();
    });

    it('returns false on wrong type', () => {

        const transaction = {
            type: TransactionType.Escrow,
            subtype: TransactionPaymentSubtype.Ordinary
        };

        expect(isMultiOutTransaction(transaction)).toBeFalsy();
    });

});
