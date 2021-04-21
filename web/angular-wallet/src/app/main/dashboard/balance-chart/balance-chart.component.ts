import {Router} from '@angular/router';
import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Account} from '@burstjs/core';
import {BurstValue, convertBurstTimeToDate} from '@burstjs/util';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {I18nService} from '../../../layout/components/i18n/i18n.service';
import {UnsubscribeOnDestroy} from '../../../util/UnsubscribeOnDestroy';
import {takeUntil} from 'rxjs/operators';
import {formatDate} from '@angular/common';
import {
  AccountBalances,
  BalanceHistoryItem,
  getBalanceHistoryFromTransactions,
  getBalancesFromAccount
} from '../../../util/balance';

@Component({
  selector: 'app-balance-chart',
  templateUrl: './balance-chart.component.html',
  styleUrls: ['./balance-chart.component.scss']
})
export class BalanceChartComponent extends UnsubscribeOnDestroy implements OnInit, OnChanges {

  @Input() public account: Account;
  @Input() public priceBtc: number;
  @Input() public priceUsd: number;
  @Input() public priceEur: number;

  chart: any;
  firstDate = '';
  transactionCount = 50;

  private balanceHistory: BalanceHistoryItem[];
  private accountBalances: AccountBalances;
  private isMobile = false;

  constructor(private router: Router,
              private i18nService: I18nService,
              private breakpointObserver: BreakpointObserver) {
    super();
  }

  ngOnInit(): void {
    this.breakpointObserver
      .observe(Breakpoints.Handset)
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(({matches}) => {
        this.isMobile = matches;
        this.updateChart();
      });

    this.i18nService.subscribe(() => {
      this.updateChart();
    }, null);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateChart();
  }

  private toDateString(date: Date): string {
    return formatDate(date, 'medium', this.i18nService.currentLanguage.code);
  }

  private updateChart(): void {
    const transactions = this.account.transactions.slice(0, this.transactionCount);
    const {account, balanceNQT} = this.account;
    this.accountBalances = getBalancesFromAccount(this.account);
    this.balanceHistory = getBalanceHistoryFromTransactions(
      account,
      parseFloat(BurstValue.fromPlanck(balanceNQT || '0').getBurst()),
      transactions).reverse();

    const chartData = this.balanceHistory.map(item => parseFloat(item.balance.toFixed(2)));
    const max = Math.max(...chartData);
    const min = Math.min(...chartData);
    this.firstDate = this.balanceHistory.length &&
      this.balanceHistory[0].timestamp &&
      this.toDateString(convertBurstTimeToDate(this.balanceHistory[0].timestamp)) ||
      this.toDateString(new Date());

    this.chart = {
      datasets: [
        {
          label: this.i18nService.getTranslation('balance'),
          data: chartData,
          fill: 'start'
        }
      ],
      labels: this.balanceHistory.map(({timestamp}) => timestamp && this.toDateString(convertBurstTimeToDate(timestamp)) ||
        this.toDateString(new Date())),
      colors: [
        {
          borderColor: '#42a5f5',
          backgroundColor: '#42a5f5',
          pointBackgroundColor: '#1e88e5',
          pointHoverBackgroundColor: '#1e88e5',
          pointBorderColor: '#eeeeee',
          pointHoverBorderColor: '#ffffff'
        }
      ],
      options: {
        spanGaps: false,
        legend: {
          display: false
        },
        maintainAspectRatio: false,
        layout: {
          padding: {
            top: 16,
            left: 16,
            right: 16
          }
        },
        elements: {
          point: {radius: 0},
          line: {tension: 0.1}
        },
        scales: {
          xAxes: [
            {
              display: false,
              gridLines: {
                display: false,
                drawBorder: false,
                tickMarkLength: 18
              },
              ticks: {
                fontColor: '#ffffff'
              }
            }
          ],
          yAxes: [
            {
              display: !this.isMobile,
              position: 'right',
              ticks: {
                min,
                max,
                stepSize: (max - min) / 2,
                fontColor: '#ffffff'
              }
            }
          ]
        },
        plugins: {
          filler: {
            propagate: false
          },
          xLabelsOnTop: {
            active: true
          }
        }
      }
    };
  }

  calculateValue(unitPrice: number = 0): number {
    return parseFloat(BurstValue.fromPlanck(this.account.balanceNQT || '0').multiply(unitPrice).getBurst());
  }

  hidePoints(): void {
    if (this.isMobile) {
      return;
    }

    this.chart.options = {
      ...this.chart.options,
      animation: {
        duration: 0,
      },
      elements: {
        point: {
          radius: 0,
        }
      }
    };
  }

  showPoints(): void {
    if (this.isMobile) {
      return;
    }

    this.chart.options = {
      ...this.chart.options,
      animation: {
        duration: 0,
      },
      elements: {
        point: {
          radius: 4,
          borderWidth: 2,
          hoverRadius: 8,
          hoverBorderWidth: 2
        }
      }
    };
  }
}
