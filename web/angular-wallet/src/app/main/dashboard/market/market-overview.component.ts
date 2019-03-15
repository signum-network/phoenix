import {Component, OnDestroy, OnInit} from '@angular/core';
import {formatCurrency, formatPercent} from '@angular/common';
import {MarketService} from './market.service';
import {takeWhile} from 'rxjs/operators';
import {MarketTicker} from './types';
import {I18nService} from '../../../layout/components/i18n/i18n.service';

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
  styles: [
    `.fg_green { color : green !important;}`,
    `.fg_red { color : red !important;}`
  ]
})

export class MarketOverviewComponent implements OnInit, OnDestroy {
  private _isActive = true;

  public isLoading = true;
  private tickerData: MarketTicker = new MarketTickerImpl();
  private locale: any;

  constructor(private marketService: MarketService, private i18nService: I18nService) {
    this.locale = i18nService.currentLanguage.code;
  }

  public ngOnInit(): void {
    this.marketService.ticker$
      .pipe(
        takeWhile(this.isActive)
      )
      .subscribe(tickerData => {
        this.isLoading = false;
        this.tickerData = tickerData;
      });
  }

  ngOnDestroy(): void {
    this._isActive = false;
  }

  isActive = () => this._isActive;

  public getPriceBtc = (): string => `${this.tickerData.price_btc} BTC`;
  public getPriceUsd = (): string => `${this.tickerData.price_usd} USD`;
  public get24hVolume = (): string => `${formatCurrency(parseFloat(this.tickerData['24h_volume_usd']), this.locale, '', )} USD`;
  public getAvailableSupply = (): string => `${formatCurrency(parseFloat(this.tickerData.available_supply), this.locale, '', )} BURST`;
  public getRelativeSupply = (): string => {
    const supply = parseFloat(this.tickerData.available_supply);
    const max_supply = parseFloat(this.tickerData.max_supply);
    const relative_supply = supply > 0 ? (supply / max_supply) : 0;
    return `${formatPercent(relative_supply, this.locale)}`;
  }
  public getMarketCap = (): string => `${formatCurrency(parseFloat(this.tickerData.market_cap_usd), this.locale, '', )} USD`;
  public getYesterDaysChange = (): string => `${parseFloat(this.tickerData.percent_change_24h).toFixed(2)} %`;
  public isChangeNegative = (): boolean => this.tickerData.percent_change_24h.startsWith('-');
  public getMarketRank = (): string => this.tickerData.rank;

}
