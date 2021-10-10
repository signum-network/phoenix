import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Account } from '@signumjs/core';
import { TokenService } from '../../../../shared/services/token.service';
import { getBalancesFromAccount } from '../../../../util/balance';
import { MarketInfoCoingecko } from '../market/services/coingecko/types';
import { MarketServiceCoinGecko } from '../market/services/coingecko/coingecko.market.service';
import { UnsubscribeOnDestroy } from '../../../../util/UnsubscribeOnDestroy';
import { takeUntil } from 'rxjs/operators';
import { Amount } from '@signumjs/util';
import { formatAmount } from '../../../../util/formatAmount';
import { formatCurrency } from '@angular/common';
import { StoreService } from '../../../../store/store.service';

@Component({
  selector: 'app-token-overview',
  templateUrl: './token.component.html',
  styleUrls: ['./token.component.scss']
})
export class TokenComponent extends UnsubscribeOnDestroy implements OnInit, OnChanges {

  @Input() account: Account;

  isLoading = true;
  hasTokens = false;
  datasets = [];
  labels = [];
  options: any = {
    animation: false,
    legend: {
      display: false
    },
    tooltips: {
      enabled: true
    },
    responsive: true
  };
  tokenCount: number;
  totalEstimateAmount: Amount;
  private currentPrice: any = {};
  private locale = 'en';

  constructor(
    private tokenService: TokenService,
    private marketService: MarketServiceCoinGecko,
    private storeService: StoreService
  ) {
    super();
  }

  async ngOnInit(): Promise<void> {
    this.isLoading = true;
    await this.updateChart();
    this.isLoading = false;
    this.marketService.ticker$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((data: MarketInfoCoingecko) => {
        this.currentPrice = data.current_price;
      });

    this.storeService.settings
      .pipe(
        takeUntil(this.unsubscribeAll)
      )
      .subscribe(async ({ language }) => {
          this.locale = language;
        }
      );

  }

  private async updateChart(): Promise<void> {
    const tokens = await this.tokenService.fetchAccountTokens(this.account);

    if (!tokens.length) {
      this.hasTokens = false;
      return;
    }

    const balances = [];
    const labels = [];
    const totalEstimate = Amount.Zero();
    tokens.forEach(({ balance, name, priceInfo }) => {
      balances.push(balance);
      labels.push(name);
      totalEstimate.add(Amount.fromSigna(priceInfo.amount));
    });

    this.totalEstimateAmount = totalEstimate;
    this.tokenCount = tokens.length;
    this.labels = labels;
    this.datasets = [{
      label: 'tokens',
      borderColor: '#0099ff',
      data: balances
    }];

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes.account) {
      return;
    }

    const { currentValue, previousValue } = changes.account;

    if (!previousValue) {
      this.updateChart();
      return;
    }

    if (currentValue.account !== previousValue.account) {
      this.updateChart();
    }
  }

  getTotalEstimate(type: 'btc' | 'usd' | 'eur' | 'rub'): string {
    // TODO: centralize
    const currency = {
      btc: '฿',
      usd: '$',
      eur: '€',
      rub: '₽'
    };
    const value = parseFloat(this.totalEstimateAmount.getSigna()) * this.currentPrice[type];
    return formatCurrency(value, this.locale, currency[type], '', '1.2-2');
  }
}
