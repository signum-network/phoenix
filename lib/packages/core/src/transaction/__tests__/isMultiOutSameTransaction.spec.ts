import {TransactionPaymentSubtype, TransactionType} from '../../constants';
import {isMultiOutSameTransaction} from '../isMultiOutSameTransaction';

describe('isMultiOutSameTransaction', () => {
    it('returns true on correct type and subtype', () => {

        const transaction = {
            type: TransactionType.Payment,
            subtype: TransactionPaymentSubtype.MultiOutSameAmount
        };

        expect(isMultiOutSameTransaction(transaction)).toBeTruthy();
    });

    it('returns false on correct type and wrong subtype', () => {

        const transaction = {
            type: TransactionType.Payment,
            subtype: TransactionPaymentSubtype.Ordinary
        };

        expect(isMultiOutSameTransaction(transaction)).toBeFalsy();
    });

    it('returns false on wrong type', () => {

        const transaction = {
            type: TransactionType.Escrow,
            subtype: TransactionPaymentSubtype.Ordinary
        };

        expect(isMultiOutSameTransaction(transaction)).toBeFalsy();
    });
});
