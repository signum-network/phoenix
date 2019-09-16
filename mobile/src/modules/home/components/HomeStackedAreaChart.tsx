import { Account } from '@burstjs/core';
import { convertBurstTimeToDate, convertNQTStringToNumber } from '@burstjs/util';
import * as shape from 'd3-shape';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Grid, StackedAreaChart, YAxis } from 'react-native-svg-charts';
import { NavigationInjectedProps, withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { InjectedReduxProps } from '../../../core/interfaces';
import { AccountColors, Colors } from '../../../core/theme/colors';
import { getBalanceHistoryFromTransactions } from '../../../core/utils/balance/getBalanceHistoryFromTransactions';
import { BalanceHistoryItem } from '../../../core/utils/balance/typings';
import { isSameDay } from '../../../core/utils/date';
import { selectCurrency } from '../../price-api/store/actions';
import { Metric, PriceInfoReduxState, PriceTypeStrings, HistoricalPriceTypeStrings } from '../../price-api/store/reducer';

const ACCOUNT_TOKEN = 'account';

interface ChartData {
  [key: string]: number | Date;
  // day: Date;
  // `account[0-n]`: number;
}

interface Props extends InjectedReduxProps {
  accounts: Account[];
  priceApi: PriceInfoReduxState;
  priceTypes: string[]
}
type TProps = NavigationInjectedProps & Props;

interface State {
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

class HomeStackedAreaChartComponent extends React.PureComponent<TProps, State> {

  state = {
    selectedDateRange: 100
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

  selectCurrency = () => {
    this.props.dispatch(
      selectCurrency(this.props.priceTypes[
        this.props.priceTypes.findIndex(
          (val) => val === this.props.priceApi.selectedCurrency
        ) + 1
      ] as PriceTypeStrings ||
      this.props.priceTypes[0] as PriceTypeStrings
      )
    );
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
          if (convertBurstTimeToDate(transaction.timestamp) > d) {
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
      ), i = 0;
        d <= now;
        d.setDate(d.getDate() + 1), i++) {
      const atThatTime = d.getTime();
      data[i] = {
        day: new Date(d)
      };
      if (this.props.priceApi.selectedCurrency === this.props.priceTypes[1] ||
          this.props.priceApi.selectedCurrency === this.props.priceTypes[2]) {
        const price = this.props.priceApi.historicalPriceInfo[
            this.props.priceApi.selectedCurrency as HistoricalPriceTypeStrings
          ].Data.find((metric) => {
            return isSameDay(new Date(metric.time * 1000), d);
          });

        historicalPrice[atThatTime] = price ||
          this.props.priceApi.historicalPriceInfo[
            this.props.priceApi.selectedCurrency as HistoricalPriceTypeStrings
          ].Data[0];
      }
      accountTransactions.map(
        this.addTransactionToChartData(data, i, d, historicalPrice, atThatTime, this.props.priceApi.selectedCurrency)
      );
    }
    return data;
  }

  render () {

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
          svg={styles.svg as StyleMedia}
        />

        <TouchableOpacity
          onPress={this.selectCurrency}
          style={styles.button as StyleMedia}
        >
          <Text style={{ color: Colors.BLUE_LIGHT, textAlign: 'center' }}>
            {this.props.priceApi.selectedCurrency}
          </Text>
        </TouchableOpacity>
      </>
    );
  }
}

function mapStateToProps (state: State) {
  return {
    selectedDateRange: state.selectedDateRange
  };
}

export const HomeStackedAreaChart = connect(mapStateToProps)(withNavigation(HomeStackedAreaChartComponent));
