import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {interval, Observable} from 'rxjs';
import {flatMap, pluck, startWith, tap} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {MarketInfoCryptoCompare} from './types';

@Injectable({
  providedIn: 'root'
})
export class MarketService {
  private readonly _ticker$: Observable<MarketInfoCryptoCompare>;

  constructor(private httpClient: HttpClient) {
    this._ticker$ = this.createTicker();
  }

  get ticker$(): Observable<MarketInfoCryptoCompare> {
    return this._ticker$;
  }

  createTicker(): Observable<MarketInfoCryptoCompare> {
    const {tickerInterval, tickerUrl} = environment.market;
    return interval(tickerInterval)
      .pipe(
        startWith(0),
        flatMap(_ => this.httpClient.get(tickerUrl) ),
        pluck('RAW', 'BURST'),
      );
  }
}
