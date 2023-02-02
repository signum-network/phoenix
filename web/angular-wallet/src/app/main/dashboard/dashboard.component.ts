import { Component, OnInit } from '@angular/core';
import { UserProfileType } from 'app/shared/types';
import { StoreService } from 'app/store/store.service';
import { UnsubscribeOnDestroy } from 'app/util/UnsubscribeOnDestroy';
import { takeUntil } from 'rxjs/operators';
import { Settings } from 'app/store/settings';

@Component({
  selector: 'dashboard-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends UnsubscribeOnDestroy implements OnInit {
  userProfile: UserProfileType = 'simple';
  constructor(private storeService: StoreService) {
    super();
  }

  ngOnInit(): void {
    this.storeService.settingsUpdated$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((settings: Settings) => {
        this.userProfile = settings.userProfile || 'simple';
      });
  }

}


