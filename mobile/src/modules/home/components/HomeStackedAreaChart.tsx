import { Account } from '@signumjs/core';
import { convertNQTStringToNumber, BlockTime } from '@signumjs/util';
import * as shape from 'd3-shape';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Grid, StackedAreaChart, YAxis } from 'react-native-svg-charts';
import { AccountColors, Colors } from '../../../core/theme/colors';
import { getBalanceHistoryFromTransactions } from '../../../core/utils/balance/getBalanceHistoryFromTransactions';
import { BalanceHistoryItem } from '../../../core/utils/balance/typings';
import { isSameDay } from '../../../core/utils/date';
import { HistoricalPriceTypeStrings,
         Metric,
         PriceInfoReduxState,
         PriceTypeStrings
} from '../../price-api/store/reducer';
import { FontSizes } from '../../../core/theme/sizes';
import { Text } from '../../../core/components/base/Text';

const ACCOUNT_TOKEN = 'account';

interface ChartData {
  [key: string]: number | Date;
  // day: Date;
  // `account[0-n]`: number;
}

interface Props {
  accounts: Account[];
  priceApi: PriceInfoReduxState;
  priceTypes: string[];
  selectCurrency: (() => void);
}

interface State {
  selectedDateRange: number;
}

const styles = StyleSheet.create({
  stackedAreaChart: { height: 200, paddingVertical: 16, zIndex: 1 },
  yAxis: {
    position: 'absolute',
    top: 0,
    left: 5,
    height: 200,
    paddingVertical: 16,
    zIndex: 2
  },
  button: {
    position: 'absolute',
    top: 142,
    right: 5,
    backgroundColor: Colors.BLUE_DARKEST,
    zIndex: 10,
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: Colors.BLUE_LIGHT,
    padding: 8,
    opacity: .8
  },
  dateRange: {
    right: 70
  }
});

const svgStyles: StyleMedia = {
  fontSize: 8,
  stroke: 'white',
  strokeWidth: 0.1,
  alignmentBaseline: 'baseline',
  baselineShift: '3',
  fill: 'white'
};

const DATE_RANGES = [7, 30, 100];

export class HomeStackedAreaChart extends React.PureComponent<Props, State> {

  state = {
    selectedDateRange: DATE_RANGES[0]
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

  addTransactionToChartData (data: ChartData[],
                             i: number,
                             d: Date,
                             historicalPrice: Metric[],
                             atThatTime: number,
                             showPricesIn: PriceTypeStrings):
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
          if (BlockTime.fromBlockTimestamp(transaction.timestamp).getDate() > d) {
            continue;
          }

          if (showPricesIn === this.props.priceTypes[1] ||
              showPricesIn === this.props.priceTypes[2]) {
            const priceOnThatDay = historicalPrice[atThatTime];
            data[i][`${ACCOUNT_TOKEN}${accountIndex}`] = transaction.balance * priceOnThatDay.close;
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
    // tslint:disable-next-line: one-variable-per-declaration
    for (let d = new Date(new Date().setDate(
        now.getDate() - this.state.selectedDateRange)
      ), i = 0; d <= now; d.setDate(d.getDate() + 1), i++) {
      const atThatTime = d.getTime();
      data[i] = {
        day: new Date(d)
      };
      if (this.props.priceApi.selectedCurrency === this.props.priceTypes[1] ||
          this.props.priceApi.selectedCurrency === this.props.priceTypes[2]) {
        const historicalPriceData = this.props.priceApi.historicalPriceInfo[
          this.props.priceApi.selectedCurrency as HistoricalPriceTypeStrings
        ].Data;
        const price = historicalPriceData.find((metric) => {
          return isSameDay(new Date(metric.time * 1000), d);
        });

        historicalPrice[atThatTime] = price || historicalPriceData[historicalPriceData.length - 1];
      }
      accountTransactions.map(
        this.addTransactionToChartData(data, i, d, historicalPrice, atThatTime, this.props.priceApi.selectedCurrency)
      );
    }
    return data;
  }

  selectDateRange = () => {
    this.setState({
      ...this.state,
      selectedDateRange: DATE_RANGES[DATE_RANGES.indexOf(this.state.selectedDateRange) + 1] || DATE_RANGES[0]
    });
  }

  render () {

    console.log('Stacked Chart')

    const data = this.calculateChartData();
    const keys = Object.keys(data[0]).slice(1); // remove 'day' from the keys to get the account names

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
        >
          <Grid />
        </StackedAreaChart>

        <YAxis
          style={styles.yAxis as StyleMedia}
          data={StackedAreaChart.extractDataPoints(data, keys)}
          contentInset={{ top: 10, bottom: 10 }}
          svg={svgStyles}
        />

        <TouchableOpacity
          onPress={this.props.selectCurrency}
          style={styles.button as StyleMedia}
        >
          <Text color={Colors.BLUE_LIGHT} size={FontSizes.SMALLER}>
            {this.props.priceApi.selectedCurrency === 'BURST' ? 'SIGNA' : this.props.priceApi.selectedCurrency}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={this.selectDateRange}
          style={[styles.button, styles.dateRange]}
        >
          <Text color={Colors.BLUE_LIGHT} size={FontSizes.SMALLER}>
            {this.state.selectedDateRange.toString()}d
          </Text>
        </TouchableOpacity>
      </>
    );
  }
}
