import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {interval, Observable} from 'rxjs';
import {filter, flatMap, map, startWith} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {MarketTicker} from './types';

@Injectable({
  providedIn: 'root'
})
export class MarketService {
  private _ticker$: Observable<MarketTicker>;

  constructor(private httpClient: HttpClient) {
    this._ticker$ = this.createTicker();
  }

  get ticker$(): Observable<MarketTicker> {
    return this._ticker$;
  }

  createTicker(): Observable<MarketTicker> {
    const {tickerInterval, tickerUrl} = environment.market;
    return interval(tickerInterval * 1000)
      .pipe(
        startWith(0),
        flatMap(_ => this.httpClient.get<Array<MarketTicker>>(tickerUrl)),
        filter(arr => arr.length === 1),
        map(arr => arr[0])
      );
  }
}
