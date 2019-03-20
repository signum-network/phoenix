import {Transaction} from '@burstjs/core';
import {getBalanceHistoryFromTransactions} from './getBalanceHistoryFromTransactions';


describe('getBalanceHistoryFromTransactions', () => {
  it('should create a correct single item list history', () => {

    const accountId = '123';
    const currentBalance = 1000.00;
    const transactions = [{
      transaction: '1',
      amountNQT: `${100 * 1e8}`,
      feeNQT: `${1 * 1e8}`,
      sender: accountId
    }];

    const historyItems = getBalanceHistoryFromTransactions(accountId, currentBalance, transactions);

    expect(historyItems).toHaveLength(1);
    expect(historyItems[0].balance).toBe(currentBalance);
    expect(historyItems[0].transaction).toEqual({
      transaction: '1',
      amountNQT: '10000000000',
      feeNQT: '100000000',
      sender: '123'
    });
  });

  it('should create a correct multiple item list of balances', () => {

    const accountId = '123';
    const currentBalance = 1000.00;
    const transactions = [{
      transaction: '1',
      amountNQT: `${100 * 1e8}`,
      feeNQT: `${1 * 1e8}`,
      sender: 'senderId'
    }, {
      transaction: '2',
      amountNQT: `${200 * 1e8}`,
      feeNQT: `${1 * 1e8}`,
      sender: accountId
    },
    {
      transaction: '3',
      amountNQT: `${100 * 1e8}`,
      feeNQT: `${1 * 1e8}`,
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
