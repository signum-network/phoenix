import {
    TransactionArbitrarySubtype,
    TransactionEscrowSubtype,
    TransactionPaymentSubtype,
    TransactionType
} from '../../constants';
import {convertNumberToNQTString} from '@burstjs/util';
import {getRecipientsAmount} from '../getRecipientsAmount';

const nqt = convertNumberToNQTString;

describe('getRecipientsAmount', () => {

    const recipientId = `123`;

    it('receives correct amount from ordinary payment transaction', () => {

        const transaction = {
            transaction: '1',
            amountNQT: nqt(100),
            type: TransactionType.Payment,
            subtype: TransactionPaymentSubtype.Ordinary,
        };

        const amount = getRecipientsAmount(recipientId, transaction);
        expect(amount).toBe(100);

    });

    it('receives correct amount from any kind transaction, but multi ou', () => {

        const transaction = {
            transaction: '1',
            amountNQT: nqt(100),
            type: TransactionType.Escrow,
            subtype: TransactionEscrowSubtype.EscrowCreation,
        };

        const amount = getRecipientsAmount(recipientId, transaction);
        expect(amount).toBe(100);

    });

    it('receives correct amount from multi out same transaction', () => {

        const transaction = {
            transaction: '1',
            amountNQT: nqt(100),
            type: TransactionType.Payment,
            subtype: TransactionPaymentSubtype.MultiOutSameAmount,
            attachment: {
                'version.MultiSameOutCreation': 1,
                recipients: [recipientId, '456', recipientId] // tests also multiple mentions
            }
        };

        const amount = getRecipientsAmount(recipientId, transaction);
        expect(amount).toBe(200);

    });

    it('receives correct amount from multi out diff transaction', () => {

        const transaction = {
            transaction: '1',
            amountNQT: nqt(160),
            type: TransactionType.Payment,
            subtype: TransactionPaymentSubtype.MultiOut,
            attachment: {
                'version.MultiOutCreation': 1,
                // tests also multiple mentions
                recipients: [
                    [recipientId, nqt(100)],
                    ['456', nqt(10)],
                    [recipientId, nqt(50)],
                ]
            }
        };

        const amount = getRecipientsAmount(recipientId, transaction);
        expect(amount).toBe(150);

    });

    it('receives zero amount from multi out as not being recipient', () => {

        const transaction = {
            transaction: '1',
            amountNQT: nqt(110),
            type: TransactionType.Payment,
            subtype: TransactionPaymentSubtype.MultiOut,
            attachment: {
                'version.MultiOutCreation': 1,
                recipients: [
                    ['789', nqt(100)],
                    ['456', nqt(10)],
                ]
            }
        };

        const amount = getRecipientsAmount(recipientId, transaction);
        expect(amount).toBe(0);

    });

});
