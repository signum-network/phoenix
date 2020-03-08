import {Component, OnInit} from '@angular/core';
import {formatCurrency} from '@angular/common';
import {MarketService} from './market.service';
import {takeUntil} from 'rxjs/operators';
import {MarketInfoCryptoCompare} from './types';
import {StoreService} from '../../../store/store.service';
import {UnsubscribeOnDestroy} from '../../../util/UnsubscribeOnDestroy';

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

  private asCurrency(value: number, digitsInfo: string = '1.2-2'): string {
    return `${formatCurrency(value, this.locale, '', undefined, digitsInfo)}`;
  }

  public getPriceSats = (): string => {
    const sats = this.tickerData.BTC.PRICE * 10 * 10e6;
    return `${this.asCurrency(sats, '1.0-0')} SATS`;
  }

  public getPriceUsd = (): string => `${this.asCurrency(this.tickerData.USD.PRICE, '1.0-6')} USD`;
  public get24hVolume = (): string => `${this.asCurrency(this.tickerData.USD.VOLUME24HOURTO)} USD`;
  public getMarketCap = (): string => `${this.asCurrency(this.tickerData.USD.MKTCAP)} USD`;
  public getYesterDaysChange = (): string => `${this.asCurrency(this.tickerData.USD.CHANGEDAY)} %`;
  public isChangeNegative = (): boolean => this.tickerData.USD.CHANGEDAY < 0;

}
