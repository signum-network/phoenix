import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { interval, Observable } from 'rxjs';
import { flatMap, pluck, startWith } from 'rxjs/operators';
import { environment } from 'environments/environment';
import { MarketInfoCoingecko } from './types';

@Injectable({
  providedIn: 'root'
})
export class MarketServiceCoinGecko {
  private readonly _ticker$: Observable<MarketInfoCoingecko>;

  private currentTicker: MarketInfoCoingecko;

  constructor(private httpClient: HttpClient) {
    this._ticker$ = this.createTicker();
    this._ticker$.subscribe(t => this.currentTicker = t);
  }

  get serviceName(): string {
    return new URL(environment.market.tickerUrl).hostname;
  }

  get ticker$(): Observable<MarketInfoCoingecko> {
    return this._ticker$;
  }

  createTicker(): Observable<MarketInfoCoingecko> {
    const { tickerInterval, tickerUrl } = environment.market;
    return interval(tickerInterval)
      .pipe(
        startWith(0),
        flatMap(_ => this.httpClient.get(tickerUrl)),
        pluck('market_data')
      );
  }

  // getPriceByLocale(locale: string): { symbol: string, price: number } {
  //   const country = getCountryByAlpha2(locale);
  //   const code = country.currency.toLowerCase();
  //   const price = this.currentTicker.current_price[code] || this.currentTicker.current_price.usd;
  //   const currency = constants.currencies.find( c => c.code.toLowerCase() === code );
  //   return {
  //     price,
  //     symbol: (currency && currency.symbol) || code.toUpperCase()
  //   };
  // }
}
