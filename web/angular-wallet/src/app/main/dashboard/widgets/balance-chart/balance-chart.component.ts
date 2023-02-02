import {Router} from '@angular/router';
import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { Amount, ChainTime, CurrencySymbol } from '@signumjs/util';
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
import {I18nService} from 'app/shared/services/i18n.service';
import { WalletAccount } from 'app/util/WalletAccount';
import { StoreService } from 'app/store/store.service';

interface BalanceChange {
  signa: number;
  percent: number;
}

@Component({
  selector: 'app-balance-chart',
  templateUrl: './balance-chart.component.html',
  styleUrls: ['./balance-chart.component.scss']
})
export class BalanceChartComponent extends UnsubscribeOnDestroy implements OnInit, OnChanges {

  constructor(private router: Router,
              private storeService: StoreService,
              private i18nService: I18nService,
              private breakpointObserver: BreakpointObserver) {
    super();
  }

  @Input() public account: WalletAccount;
  @Input() public priceBtc: number;
  @Input() public priceUsd: number;
  @Input() public priceEur: number;
  @Input() public priceRub: number;

  chart: any;
  firstDate = new Date();
  transactionCount = 50;
  accountBalances: AccountBalances;
  locale: string;
  balanceChange: BalanceChange = {
    percent: 0,
    signa: 0,
  };

  private balanceHistory: BalanceHistoryItem[];
  private isMobile = false;

  private unsubscriber = takeUntil(this.unsubscribeAll);


  private static getBalanceChange(history: BalanceHistoryItem[]): BalanceChange {
    if (!history.length){
      return {
        signa: 0,
        percent: 0,
      };
    }

    const first = history[0].balance;
    const last = history[history.length - 1].balance;
    return {
      signa: last - first,
      percent: first === 0 ? 0 : (((last / first) - 1) * 100),
    };
  }

  ngOnInit(): void {
    this.breakpointObserver
      .observe(Breakpoints.Handset)
      .pipe(this.unsubscriber)
      .subscribe(({matches}) => {
        this.isMobile = matches;
        this.updateChart();
      });

    this.storeService.languageSelected$
      .pipe(this.unsubscriber)
      .subscribe((locale: string) => {
        this.locale = locale;
        this.updateChart();
      });

    this.storeService.accountUpdated$
      .pipe(this.unsubscriber)
      .subscribe(() => {
        this.updateChart();
      });

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
    this.firstDate = this.balanceHistory.length &&
      this.balanceHistory[0].timestamp &&
      ChainTime.fromChainTimestamp(this.balanceHistory[0].timestamp).getDate() ||
      new Date();

    this.balanceChange = BalanceChartComponent.getBalanceChange(this.balanceHistory);

    this.chart = {
      datasets: [
        {
          label: this.i18nService.getTranslation('balance'),
          data: chartData,
          fill: 'start'
        }
      ],
      labels: this.balanceHistory.map(
        ({timestamp, relativeAmount}) => {
          const rawDate = timestamp ? ChainTime.fromChainTimestamp(timestamp).getDate() : new Date();
          const formattedDate = this.toDateString(rawDate);
          const change = `${CurrencySymbol} ${relativeAmount > 0 ? '+' : ''}${relativeAmount.toFixed(4)}`;
          return `${formattedDate} (${change})`;
        }),
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
