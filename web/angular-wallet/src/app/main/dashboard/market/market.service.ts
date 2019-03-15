import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {interval, Observable} from 'rxjs';
import {filter, flatMap, map, startWith} from 'rxjs/operators';
import {environment} from '../../../../environments/environment';
import {MarketTicker} from './types';

@Injectable()
export class MarketService {

  constructor(private httpClient: HttpClient) {
  }

  public getBurstTicker(): Observable<MarketTicker> {
    const {tickerInterval, tickerUrl} = environment.market;
    return interval(tickerInterval)
      .pipe(
        startWith(0),
        flatMap(_ => this.httpClient.get<Array<MarketTicker>>(tickerUrl)),
        filter(arr => arr.length === 1),
        map(arr => arr[0])
      );
  }
}
