import {Component, OnInit} from '@angular/core';
import {formatCurrency} from '@angular/common';
import {MarketService} from './market.service';
import {takeUntil} from 'rxjs/operators';
import {MarketInfoCryptoCompare} from './types';
import {StoreService} from 'app/store/store.service';
import {UnsubscribeOnDestroy} from 'app/util/UnsubscribeOnDestroy';
import {formatMetricNumber} from 'app/util/formatMetricNumber';

@Component({
  selector: 'app-market-overview',
  templateUrl: './market-overview.component.html',
  styleUrls: ['market-overview.component.scss']
})

export class MarketOverviewComponent extends UnsubscribeOnDestroy implements OnInit {
  public isLoading = true;
  private tickerData: MarketInfoCryptoCompare;
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

  private asCurrency(value: number, currency: string, digitsInfo: string = '1.2-2'): string {
    return `${formatCurrency(value, this.locale, currency, '', digitsInfo)}`;
  }

  public getPriceSats = (): string => {
    const sats = this.tickerData.BTC.PRICE * 10e7;
    return `${this.asCurrency(sats, '', '1.0-0')}`;
  }
  public getPriceUsd = (): string => `${this.asCurrency(this.tickerData.USD.PRICE, '$', '1.0-6')}`;
  public getPriceEur = (): string => `${this.asCurrency(this.tickerData.EUR.PRICE, '€', '1.0-6')}`;

  public get24hVolumeBtc = (): string => `฿${formatMetricNumber(this.tickerData.BTC.VOLUME24HOURTO)}`;
  public get24hVolumeUsd = (): string => `$${formatMetricNumber(this.tickerData.USD.VOLUME24HOURTO)}`;
  public get24hVolumeEur = (): string => `€${formatMetricNumber(this.tickerData.EUR.VOLUME24HOURTO)}`;

  public getMarketCapBtc = (): string => `฿${formatMetricNumber(this.tickerData.BTC.MKTCAP)}`;
  public getMarketCapUsd = (): string => `$${formatMetricNumber(this.tickerData.USD.MKTCAP)}`;
  public getMarketCapEur = (): string => `€${formatMetricNumber(this.tickerData.EUR.MKTCAP)}`;

  public getYesterDaysChange = (): string => `${this.asCurrency(this.tickerData.USD.CHANGEPCT24HOUR, '')} %`;
  public isChangeNegative = (): boolean => this.tickerData.USD.CHANGEPCT24HOUR < 0;

}
