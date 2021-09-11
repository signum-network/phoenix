import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {interval, Observable} from 'rxjs';
import {flatMap, pluck, startWith, tap} from 'rxjs/operators';
import {environment} from 'environments/environment';
import {FcasRating} from './types';

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {
  private readonly _rating$: Observable<FcasRating>;

  constructor(private httpClient: HttpClient) {
    this._rating$ = this.startPolling();
  }

  get rating$(): Observable<FcasRating> {
    return this._rating$;
  }

  startPolling(): Observable<FcasRating> {
    const {fcasInterval, fcasUrl} = environment.performance;
    return interval(fcasInterval)
      .pipe(
        startWith(0),
        flatMap(_ => this.httpClient.get<FcasRating>(fcasUrl) ),
      );
  }
}
