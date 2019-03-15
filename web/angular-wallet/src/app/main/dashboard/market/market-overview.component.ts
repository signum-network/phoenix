import {Component, OnDestroy, OnInit} from '@angular/core';
import {MarketService} from './market.service';
import {takeWhile} from 'rxjs/operators';
import {MarketTicker} from './types';

@Component({
  selector: 'app-market-overview',
  templateUrl: './market-overview.component.html'
})
export class MarketOverviewComponent implements OnInit, OnDestroy {
  private tickerData: MarketTicker;
  private _isActive = true;

  public isLoading = true;

  constructor(private marketService: MarketService) {
  }

  public ngOnInit(): void {
    this.marketService.ticker$
      .pipe(
        takeWhile(this.isActive)
      )
      .subscribe(tickerData => {
        this.tickerData = tickerData;
        this.isLoading = false;
      });
  }

  ngOnDestroy(): void {
    this._isActive = false;
  }

  isActive = () => this._isActive;

}
