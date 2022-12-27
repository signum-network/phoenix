import {Router} from '@angular/router';
import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Amount, ChainTime} from '@signumjs/util';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {takeUntil} from 'rxjs/operators';
import {formatDate} from '@angular/common';
import {
  AccountBalances,
  BalanceHistoryItem,
  getBalanceHistoryFromTransactions,
  getBalancesFromAccount
} from 'app/util/balance';
import {UnsubscribeOnDestroy} from 'app/util/UnsubscribeOnDestroy';
import {I18nService} from 'app/layout/components/i18n/i18n.service';
import { WalletAccount } from "../../../../util/WalletAccount";

@Component({
  selector: 'app-balance-chart',
  templateUrl: './balance-chart.component.html',
  styleUrls: ['./balance-chart.component.scss']
})
export class BalanceChartComponent extends UnsubscribeOnDestroy implements OnInit, OnChanges {

  @Input() public account: WalletAccount;
  @Input() public priceBtc: number;
  @Input() public priceUsd: number;
  @Input() public priceEur: number;
  @Input() public priceRub: number;

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
      parseFloat(Amount.fromPlanck(balanceNQT || '0').getSigna()),
      transactions).reverse();

    const chartData = this.balanceHistory.map(item => parseFloat(item.balance.toFixed(2)));
    const max = Math.max(...chartData);
    const min = Math.min(...chartData);
    this.firstDate = this.balanceHistory.length &&
      this.balanceHistory[0].timestamp &&
      this.toDateString(ChainTime.fromChainTimestamp(this.balanceHistory[0].timestamp).getDate()) ||
      this.toDateString(new Date());

    this.chart = {
      datasets: [
        {
          label: this.i18nService.getTranslation('balance'),
          data: chartData,
          fill: 'start'
        }
      ],
      labels: this.balanceHistory.map(({timestamp}) => timestamp && this.toDateString(ChainTime.fromChainTimestamp(timestamp).getDate()) ||
        this.toDateString(new Date())),
      colors: [
        {
          borderColor: '#0099ff',
          backgroundColor: '#80CAFF',
          pointBackgroundColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointBorderColor: '#0099ff',
          pointHoverBorderColor: '#0099ff'
        }
      ],
      options: {
        animation: false,
        spanGaps: false,
        legend: {
          display: false
        },
        layout: {
          padding: {
            top: 8,
          }
        },
        maintainAspectRatio: false,
        elements: {
          point: {radius: 0},
          line: {tension: 0.1}
        },
        scales: {
          xAxes: [
            {
              display: false,
            }
          ],
          yAxes: [
            {
              display: false,
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
    return parseFloat(Amount.fromPlanck(this.account.balanceNQT || '0').multiply(unitPrice).getSigna());
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
