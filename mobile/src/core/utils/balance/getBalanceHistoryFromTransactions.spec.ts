import { TransactionPaymentSubtype, TransactionType } from '@burstjs/core';
import { convertNumberToNQTString } from '@burstjs/util';
import { getBalanceHistoryFromTransactions } from './getBalanceHistoryFromTransactions';

const nqt = convertNumberToNQTString;

describe('getBalanceHistoryFromTransactions', () => {

  describe('Regular Payments', () => {

    it('should create a correct single item list history', () => {

      const accountId = '123';
      const currentBalance = 1000.00;
      const transactions = [{
        transaction: '1',
        type: TransactionType.Payment,
        subtype: TransactionPaymentSubtype.Ordinary,
        amountNQT: nqt(100),
        feeNQT: nqt(1),
        sender: accountId
      }];

      const historyItems = getBalanceHistoryFromTransactions(accountId, currentBalance, transactions);

      expect(historyItems).toHaveLength(1);
      expect(historyItems[0].balance).toBe(currentBalance);
      expect(historyItems[0].transaction).toEqual({
        transaction: '1',
        amountNQT: '10000000000',
        feeNQT: '100000000',
        sender: '123',
        type: TransactionType.Payment,
        subtype: TransactionPaymentSubtype.Ordinary
      });
    });

    it('should create a correct multiple item list of balances', () => {

      const accountId = '123';
      const currentBalance = 1000.00;
      const transactions = [
        {
          transaction: '1',
          type: TransactionType.Payment,
          subtype: TransactionPaymentSubtype.Ordinary,
          amountNQT: nqt(100),
          feeNQT: nqt(1),
          sender: 'senderId'
        },
        {
          transaction: '2',
          type: TransactionType.Payment,
          subtype: TransactionPaymentSubtype.Ordinary,
          amountNQT: nqt(200),
          feeNQT: nqt(1),
          sender: accountId
        },
        {
          transaction: '3',
          type: TransactionType.Payment,
          subtype: TransactionPaymentSubtype.Ordinary,
          amountNQT: nqt(100),
          feeNQT: nqt(1),
          sender: 'senderId'
        }];

      const historyItems = getBalanceHistoryFromTransactions(accountId, currentBalance, transactions);

      expect(historyItems).toHaveLength(3);
      expect(historyItems[0].balance).toBe(1000);
      expect(historyItems[1].balance).toBe(900);
      expect(historyItems[2].balance).toBe(1101);

    });

    it('should create an emtpy list of balances, due to empty transaction list', () => {

      const accountId = '123';
      const initialBalance = 1000.00;
      const transactions = [];

      const historyItems = getBalanceHistoryFromTransactions(accountId, initialBalance, transactions);

      expect(historyItems).toHaveLength(0);
    });

  });

  describe('Multi Payout Same', () => {

    it('should create a correct balance history with multi out same payments', () => {

      const accountId = 'recipient1';
      const currentBalance = 1000.00;
      const transactions = [
        {
          transaction: '1',
          type: TransactionType.Payment,
          subtype: TransactionPaymentSubtype.MultiOutSameAmount,
          amountNQT: nqt(100),
          feeNQT: nqt(1),
          sender: 'senderId',
          attachment: {
            'version.MultiOutSameCreation': 1,
            "recipients": ['recipient1', 'recipient2']
          }
        },
        {
          transaction: '2',
          type: TransactionType.Payment,
          subtype: TransactionPaymentSubtype.Ordinary,
          amountNQT: nqt(200),
          feeNQT: nqt(1),
          sender: accountId
        },
        {
          transaction: '3',
          type: TransactionType.Payment,
          subtype: TransactionPaymentSubtype.Ordinary,
          amountNQT: nqt(100),
          feeNQT: nqt(1),
          sender: 'senderId'
        }];

      const historyItems = getBalanceHistoryFromTransactions(accountId, currentBalance, transactions);

      expect(historyItems).toHaveLength(3);
      expect(historyItems[0].balance).toBe(1000);
      expect(historyItems[1].balance).toBe(950);
      expect(historyItems[2].balance).toBe(1151);
    });

    it('should create a correct balance history with multi out diff payments', () => {

      const accountId = 'recipient1';
      const currentBalance = 1000.00;
      const transactions = [
        {
          transaction: '1',
          type: TransactionType.Payment,
          subtype: TransactionPaymentSubtype.MultiOut,
          amountNQT: nqt(300), // sum of all multi out values
          feeNQT: nqt(1),
          sender: 'senderId',
          attachment: {
            'version.MultiOutCreation': 1,
            "recipients": [
              ['recipient1', nqt(100)],
              ['recipient2', nqt(150)],
              ['recipient3', nqt(50)]
            ]
          }
        },
        {
          transaction: '2',
          type: TransactionType.Payment,
          subtype: TransactionPaymentSubtype.Ordinary,
          amountNQT: nqt(200),
          feeNQT: nqt(1),
          sender: accountId
        },
        {
          transaction: '3',
          type: TransactionType.Payment,
          subtype: TransactionPaymentSubtype.Ordinary,
          amountNQT: nqt(100),
          feeNQT: nqt(1),
          sender: 'senderId'
        }];

      const historyItems = getBalanceHistoryFromTransactions(accountId, currentBalance, transactions);

      expect(historyItems).toHaveLength(3);
      expect(historyItems[0].balance).toBe(1000);
      expect(historyItems[1].balance).toBe(900);
      expect(historyItems[2].balance).toBe(1101);
    });

  });

});
