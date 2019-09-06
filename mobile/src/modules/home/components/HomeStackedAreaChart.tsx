import { Account } from '@burstjs/core';
import { convertBurstTimeToDate, convertNQTStringToNumber } from '@burstjs/util';
import * as shape from 'd3-shape';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Grid, StackedAreaChart, YAxis } from 'react-native-svg-charts';
import { Colors } from '../../../core/theme/colors';
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
    (value: BalanceHistoryItem[] | undefined, index: number, array: Array<BalanceHistoryItem[] | undefined>) => void {
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
    let i = 0;
    // tslint:disable-next-line: max-line-length
    for (const d = new Date(new Date().setDate(now.getDate() - this.state.selectedDateRange)); d <= now; d.setDate(d.getDate() + 1)) {
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
      i++;
    }
    return data;
  }

  render () {

    const data = this.calculateChartData();
    // todo: make colors and counts dynamic
    const colors = ['rgba(171,171,171,1)', 'rgba(37,37,37,1)', 'rgba(255, 255, 255, 1)', 'rgba(51, 109, 181, 1)'];
    const keys = Object.keys(data[0]).slice(1); // remove 'day' from the keys to get the account names

    const svgs = [
      { onPress: () => console.log('account0') },
      { onPress: () => console.log('bananas') }
    ];

    return (
      <>
        <StackedAreaChart
          style={{ height: 200, paddingVertical: 16, zIndex: 1 }}
          data={data}
          keys={keys}
          colors={colors}
          curve={shape.curveNatural}
          showGrid={false}
          svgs={svgs}
        >
          <Grid />
        </StackedAreaChart>

        <YAxis
          style={{ position: 'absolute', top: 0, left: 5, height: 200, paddingVertical: 16, zIndex: 2 }}
          data={StackedAreaChart.extractDataPoints(data, keys)}
          contentInset={{ top: 10, bottom: 10 }}
          svg={{
            fontSize: 8,
            fill: 'white',
            stroke: 'black',
            strokeWidth: 0.1,
            alignmentBaseline: 'baseline',
            baselineShift: '3'
          }}
        />
        <TouchableOpacity
                          onPress={this.toggleBTCPrice}
                          style={{
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
                          }}>
          <Text style={{ color: Colors.BLUE_LIGHT, textAlign: 'center' }}>
            {this.state.priceInBTC ? `BTC` : `BURST`}
          </Text>
        </TouchableOpacity>
        </>
    );
  }
}
