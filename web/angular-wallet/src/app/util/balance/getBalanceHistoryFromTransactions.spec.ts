import {getBalanceHistoryFromTransactions} from './getBalanceHistoryFromTransactions';

describe('getBalanceHistoryFromTransactions', () => {
  it('should create a correct list of balances', () => {

    const accountId = '123';
    const initialBalance = 1000.00;
    const transactions = [];

    const historyItems = getBalanceHistoryFromTransactions(accountId, initialBalance, transactions );

    expect(true).toBeTruthy();
  });

  it('should create an emtpy list of balances, due to empty transaction list', () => {

    const accountId = '123';
    const initialBalance = 1000.00;
    const transactions = [];

    const historyItems = getBalanceHistoryFromTransactions(accountId, initialBalance, transactions );

    expect(historyItems).toHaveLength(0);
  });
});
