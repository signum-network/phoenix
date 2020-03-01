import {Component, OnInit} from '@angular/core';
import {formatCurrency, formatPercent} from '@angular/common';
import {MarketService} from './market.service';
import {takeUntil} from 'rxjs/operators';
import {MarketTicker} from './types';
import {StoreService} from '../../../store/store.service';
import {UnsubscribeOnDestroy} from '../../../util/UnsubscribeOnDestroy';

class MarketTickerImpl implements MarketTicker {
  readonly '24h_volume_usd' = '';
  readonly available_supply = '';
  readonly id = '';
  readonly last_updated = '';
  readonly market_cap_usd = '';
  readonly max_supply = '';
  readonly name = '';
  readonly percent_change_1h = '';
  readonly percent_change_24h = '';
  readonly percent_change_7d = '';
  readonly price_btc = '';
  readonly price_usd = '';
  readonly rank = '';
  readonly symbol = '';
  readonly total_supply = '';
}


@Component({
  selector: 'app-market-overview',
  templateUrl: './market-overview.component.html',
  styleUrls: ['market-overview.component.scss']
})

export class MarketOverviewComponent extends UnsubscribeOnDestroy implements OnInit{
  public isLoading = true;
  private tickerData: MarketTicker = new MarketTickerImpl();
  private locale: any;

  constructor(private marketService: MarketService, private storeService: StoreService) {
    super();
    this.storeService.settings
      .pipe(
        takeUntil(this.unsubscribeAll)
      )
      .subscribe(async ({language}) => {
          this.locale = language;
        }
      );

  }

  public ngOnInit(): void {
    this.marketService.ticker$
      .pipe(
        takeUntil(this.unsubscribeAll)
      )
      .subscribe(tickerData => {
        this.isLoading = false;
        this.tickerData = tickerData;
      });
  }

  private asCurrency(value: string, digitsInfo: string = '1.2-2'): string {
    return `${formatCurrency(parseFloat(value), this.locale, '', undefined, digitsInfo)}`;
  }

  public getPriceSats = (): string => {
    const sats = (parseFloat(this.tickerData.price_btc) * 10 * 10e6).toFixed(0);
    return `${this.asCurrency(sats, '1.0-6')} SATS`;
  }

  public getPriceUsd = (): string => `${this.asCurrency(this.tickerData.price_usd, '1.0-6')} USD`;
  public get24hVolume = (): string => `${this.asCurrency(this.tickerData['24h_volume_usd'])} USD`;
  public getAvailableSupply = (): string => this.tickerData.available_supply;
  public getRelativeSupply = (): string => {
    const supply = parseFloat(this.tickerData.available_supply);
    const max_supply = parseFloat(this.tickerData.max_supply);
    const relative_supply = supply > 0 ? (supply / max_supply) : 0;
    return `${formatPercent(relative_supply, this.locale)}`;
  }
  public getMarketCap = (): string => `${this.asCurrency(this.tickerData.market_cap_usd)} USD`;
  public getYesterDaysChange = (): string => `${this.asCurrency(this.tickerData.percent_change_24h)} %`;
  public isChangeNegative = (): boolean => this.tickerData.percent_change_24h.startsWith('-');
  public getMarketRank = (): string => this.tickerData.rank;

}
