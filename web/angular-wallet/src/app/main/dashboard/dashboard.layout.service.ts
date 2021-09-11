import {Injectable} from '@angular/core';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {LayoutAttributes, LayoutConfiguration} from './LayoutConfiguration';

@Injectable({
  providedIn: 'root'
})
export class DashboardLayoutService {

  public layout: BehaviorSubject<LayoutAttributes> = new BehaviorSubject(null);
  private layoutConfiguration: LayoutConfiguration;

  private setLayout(attributes: LayoutAttributes): void {
    this.layout.next(attributes);
  }

  constructor(
    private observableMedia: MediaObserver,
  ) {
    this.init()
  }

  public setLayoutConfiguration(configuration: LayoutConfiguration): void {
    this.layoutConfiguration = configuration;
  }

  private init(): void {
    this.observableMedia.asObservable()
      .subscribe((change: MediaChange[]) => {
        const mq = change[0].mqAlias;
        if (this.layoutConfiguration && this.layoutConfiguration[mq]) {
          this.setLayout(this.layoutConfiguration[mq]);
        }
      });
  }


}
