import { Component, OnInit } from '@angular/core';
import { formatCurrency } from '@angular/common';
import { MarketServiceCoinGecko } from './services/coingecko/coingecko.market.service';
import { takeUntil } from 'rxjs/operators';
import { MarketInfoCoingecko } from './services/coingecko/types';
import { StoreService } from 'app/store/store.service';
import { UnsubscribeOnDestroy } from 'app/util/UnsubscribeOnDestroy';
import { formatMetricNumber } from 'app/util/formatMetricNumber';

@Component({
  selector: 'app-market-overview',
  templateUrl: './market-overview.component.html',
  styleUrls: ['market-overview.component.scss']
})

export class MarketOverviewComponent extends UnsubscribeOnDestroy implements OnInit {
  public isLoading = true;
  public priceChangePeriod = '24h';
  private tickerData: MarketInfoCoingecko;
  private locale: any;

  constructor(private marketService: MarketServiceCoinGecko, private storeService: StoreService) {
    super();
  }

  public ngOnInit(): void {

    this.storeService.settingsUpdated$
      .pipe(
        takeUntil(this.unsubscribeAll)
      )
      .subscribe(async ({ language }) => {
          this.locale = language;
        }
      );

    this.marketService.ticker$
      .pipe(
        takeUntil(this.unsubscribeAll)
      )
      .subscribe(tickerData => {
        this.isLoading = false;
        this.tickerData = tickerData;
      });
  }

  private asPercentage(value: number): string {
    return `${value < 0 ? '' : '+'}${formatCurrency(value, this.locale, '', '', '1.2-2')} %`;
  }

  private asCurrency(value: number, currency: string, digitsInfo: string = '1.2-2'): string {
    return `${formatCurrency(value, this.locale, currency, '', digitsInfo)}`;
  }

  // TODO: make the currency stuff more flexible
  public getPriceSats = (): string => {
    const sats = this.tickerData.current_price.sats;
    return `${this.asCurrency(sats, '', '1.0-0')}`;
  }
  public getPriceUsd = (): string => `${this.asCurrency(this.tickerData.current_price.usd, '$', '1.0-6')}`;
  public getPriceEur = (): string => `${this.asCurrency(this.tickerData.current_price.eur, '€', '1.0-6')}`;
  public getPriceRub = (): string => `${this.asCurrency(this.tickerData.current_price.rub, '₽', '1.0-6')}`;

  public get24hVolumeBtc = (): string => `฿${formatMetricNumber(this.tickerData.total_volume.btc)}`;
  public get24hVolumeUsd = (): string => `$${formatMetricNumber(this.tickerData.total_volume.usd)}`;
  public get24hVolumeEur = (): string => `€${formatMetricNumber(this.tickerData.total_volume.eur)}`;
  public get24hVolumeRub = (): string => `₽${formatMetricNumber(this.tickerData.total_volume.rub)}`;

  public getMarketCapBtc = (): string => `฿${formatMetricNumber(this.tickerData.market_cap.btc)}`;
  public getMarketCapUsd = (): string => `$${formatMetricNumber(this.tickerData.market_cap.usd)}`;
  public getMarketCapEur = (): string => `€${formatMetricNumber(this.tickerData.market_cap.eur)}`;
  public getMarketCapRub = (): string => `₽${formatMetricNumber(this.tickerData.market_cap.rub)}`;

  public getPriceChange = (): string => this.asPercentage(this.tickerData[`price_change_percentage_${this.priceChangePeriod}`]);
  public isChangeNegative = (): boolean => this.tickerData[`price_change_percentage_${this.priceChangePeriod}`] < 0;

  public selectChangePeriod(period: string): void {
    this.priceChangePeriod = period;
  }

  public getMarketUrl(): string {
    return this.marketService.serviceName;
  }

  public getTrendStyle(): object {
    const p = this.tickerData[`price_change_percentage_${this.priceChangePeriod}`] || 0;
    const deg = -Math.min(90, Math.max(-90, p * 5));
    return {
      'transform': `rotate(${deg}deg)`
    };
  }
}
