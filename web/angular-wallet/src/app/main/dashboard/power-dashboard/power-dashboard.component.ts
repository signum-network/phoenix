import {Component, OnInit} from '@angular/core';
import {DashboardLayoutService} from '../dashboard.layout.service';
import {takeUntil} from 'rxjs/operators';
import {UnsubscribeOnDestroy} from '../../../util/UnsubscribeOnDestroy';
import {PowerDashboardLayoutConfiguration} from './PowerDashboardLayoutConfiguration';

@Component({
  selector: 'app-power-dashboard',
  templateUrl: './power-dashboard.component.html',
  styleUrls: ['./power-dashboard.component.scss']
})
export class PowerDashboardComponent extends UnsubscribeOnDestroy implements OnInit {
  constructor(
    private layoutService: DashboardLayoutService,
  ) {
    super();
    this.layoutService.setLayoutConfiguration(new PowerDashboardLayoutConfiguration());
  }

  ngOnInit(): void {
    this.layoutService
      .layout
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(layoutAttributes => {
        console.log('attributes', layoutAttributes);
      });
  }

}
