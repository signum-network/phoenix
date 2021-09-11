import {Component, OnInit} from '@angular/core';
import {DashboardGridSettings} from './DashboardGridSettings';
import {UserProfileType} from '../../shared/types';
import {StoreService} from '../../store/store.service';
import {UnsubscribeOnDestroy} from '../../util/UnsubscribeOnDestroy';
import {takeUntil} from 'rxjs/operators';
import {Settings} from '../../settings';

const GridSettings = new DashboardGridSettings();

@Component({
  selector: 'dashboard-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends UnsubscribeOnDestroy implements OnInit {
  userProfile: UserProfileType  = 'simple';

  constructor(private storeService: StoreService) {
    super();

  }

  ngOnInit(): void {

    this.storeService.settings
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((settings: Settings) => {
        this.userProfile = settings.userProfile;
      });
  }

}


