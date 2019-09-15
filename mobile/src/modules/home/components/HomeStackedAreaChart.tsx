import { Account } from '@burstjs/core';
import { convertBurstTimeToDate, convertNQTStringToNumber } from '@burstjs/util';
import * as shape from 'd3-shape';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Grid, StackedAreaChart, YAxis } from 'react-native-svg-charts';
import { AccountColors, Colors } from '../../../core/theme/colors';
import { getBalanceHistoryFromTransactions } from '../../../core/utils/balance/getBalanceHistoryFromTransactions';
import { BalanceHistoryItem } from '../../../core/utils/balance/typings';
import { isSameDay } from '../../../core/utils/date';
import { Metric, PriceInfoReduxState } from '../../price-api/store/reducer';

const ACCOUNT_TOKEN = 'account';

interface ChartData {
  [key: string]: number | Date;
  // day: Date;
  // `account[0-n]`: number;
}

interface Props {
  accounts: Account[];
  priceApi: PriceInfoReduxState;
}
type TProps = Props;

interface State {
  priceInBTC: boolean;
  selectedDateRange: number;
}

const styles = {
  stackedAreaChart: { height: 200, paddingVertical: 16, zIndex: 1 },
  yAxis: { position: 'absolute', top: 0, left: 5, height: 200, paddingVertical: 16, zIndex: 2 },
  svg: {
    fontSize: 8,
    fill: 'white', // StyleSheet.create doesn't like fill
    stroke: 'black',
    strokeWidth: 0.1,
    alignmentBaseline: 'baseline',
    baselineShift: '3'
  },
  button: {
    position: 'absolute',
    top: 20,
    right: 5,
    backgroundColor: Colors.BLUE_DARKEST,
    zIndex: 3,
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: Colors.BLUE_LIGHT,
    padding: 8,
    opacity: .8
  }
};

export class HomeStackedAreaChart extends React.PureComponent<TProps, State> {

  state = {
    selectedDateRange: 100,
    priceInBTC: false
  };

  calculateChartData () {
    const accountTransactions = this.props.accounts.map((account) => {
      if (account.transactions) {
        return getBalanceHistoryFromTransactions(account.account,
          convertNQTStringToNumber(account.balanceNQT), account.transactions);
      }
    });
    const data: ChartData[] = this.buildChartData(accountTransactions);

    return data;
  }

  toggleBTCPrice = () => {
    this.setState({ ...this.state, priceInBTC: !this.state.priceInBTC });
  }

  addTransactionToChartData (data: ChartData[],
                             i: number,
                             d: Date,
                             historicalPrice: Metric[],
                             atThatTime: number,
                             priceInBTC: boolean):
    (value: BalanceHistoryItem[] | undefined,
     index: number,
     array: Array<BalanceHistoryItem[] | undefined>) => void {
    return (transactions, accountIndex) => {
      // set to 0 by default, in case we can't match a transaction
      data[i][`${ACCOUNT_TOKEN}${accountIndex}`] = 0;
      if (transactions && transactions.length) {
        for (let t = transactions.length - 1; t >= 0; t--) {
          const transaction = transactions[t];
          // only match up to the most recent transaction, not beyond
          if (convertBurstTimeToDate(transaction.timestamp) > d) {
            continue;
          }
          if (priceInBTC) {
            const priceInBTCOnThatDay = historicalPrice[atThatTime];
            data[i][`${ACCOUNT_TOKEN}${accountIndex}`] = transaction.balance * priceInBTCOnThatDay.close;
          } else {
            data[i][`${ACCOUNT_TOKEN}${accountIndex}`] = transaction.balance;
          }
        }
      }
    };
  }

  private buildChartData (accountTransactions: Array<BalanceHistoryItem[] | undefined>): ChartData[] {
    const now = new Date();
    const data: ChartData[] = [];
    const historicalPrice: Metric[] = [];
    // tslint:disable-next-line: max-line-length
    // tslint:disable-next-line: one-variable-per-declaration
    for (let d = new Date(new Date().setDate(now.getDate() - this.state.selectedDateRange)), i = 0;
          d <= now;
          d.setDate(d.getDate() + 1), i++) {
      const atThatTime = d.getTime();
      data[i] = {
        day: new Date(d)
      };
      if (this.state.priceInBTC) {
        const price = this.props.priceApi.historicalPriceInfo.Data.find((metric) => {
          return isSameDay(new Date(metric.time * 1000), d);
        });
        historicalPrice[atThatTime] = price || this.props.priceApi.historicalPriceInfo.Data[0];
      }
      accountTransactions.map(
        this.addTransactionToChartData(data, i, d, historicalPrice, atThatTime, this.state.priceInBTC)
      );
    }
    return data;
  }

  render () {

    const data = this.calculateChartData();
    const keys = Object.keys(data[0]).slice(1); // remove 'day' from the keys to get the account names
    const svgs = [
      // tslint:disable-next-line: no-console
      { onPress: () => console.log('account0') },
      // tslint:disable-next-line: no-console
      { onPress: () => console.log('bananas') }
    ];

    const getAccountColors = (colors: string[]): string[] => {
      return (colors.length > this.props.accounts.length) ?
              colors : getAccountColors(colors.concat(colors));
    };

    const accountColors = getAccountColors(AccountColors);

    return (
      <>
      {/*
      // @ts-ignore */}
        <StackedAreaChart
          style={styles.stackedAreaChart}
          data={data}
          keys={keys}
          colors={accountColors}
          curve={shape.curveNatural}
          showGrid={false}
          svgs={svgs}
        >
          <Grid />
        </StackedAreaChart>

        <YAxis
          style={styles.yAxis as StyleMedia}
          data={StackedAreaChart.extractDataPoints(data, keys)}
          contentInset={{ top: 10, bottom: 10 }}
          svg={styles.svg as StyleMedia}
        />

        <TouchableOpacity
          onPress={this.toggleBTCPrice}
          style={styles.button as StyleMedia}
        >
          <Text style={{ color: Colors.BLUE_LIGHT, textAlign: 'center' }}>
            {this.state.priceInBTC ? `BTC` : `BURST`}
          </Text>
        </TouchableOpacity>
      </>
    );
  }
}
