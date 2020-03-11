import {Component, OnInit} from '@angular/core';
import {PerformanceService} from './performance.service';
import {takeUntil} from 'rxjs/operators';
import {FcasRating} from './types';
import {StoreService} from '../../../store/store.service';
import {UnsubscribeOnDestroy} from '../../../util/UnsubscribeOnDestroy';
import {AppService} from '../../../app.service';

const FCASColors = {
  s: '#00df8f',
  a: '#6DE1A2',
  b: '#C9DC8C',
  c: '#f09268',
  f: '#ea5f56',
};

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['performance.component.scss']
})

export class PerformanceComponent extends UnsubscribeOnDestroy implements OnInit {
  public isLoading = true;
  private fcasData: FcasRating;
  private locale: any;

  constructor(private performanceService: PerformanceService, private storeService: StoreService, private appService: AppService) {
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
    this.performanceService.rating$
      .pipe(
        takeUntil(this.unsubscribeAll)
      )
      .subscribe(fcasData => {
        this.isLoading = false;
        this.fcasData = fcasData;
      });
  }

  public getChange = (): string => `${this.fcasData.percent_change} %`;
  public isChangeNegative = (): boolean => this.fcasData.percent_change < 0;
  public getRankingColor = (): string => FCASColors[this.fcasData.grade.toLowerCase()];

  openCMCRating(): void {
    const url = 'https://coinmarketcap.com/currencies/burst/ratings/';
    if (!this.appService.isDesktop()) {
      window.open(url, 'blank');
    } else {
      this.appService.openInBrowser(url);
    }
  }
}
