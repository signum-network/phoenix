import { Component, OnInit } from '@angular/core';
import { UserProfileType } from '../../shared/types';
import { StoreService } from '../../store/store.service';
import { UnsubscribeOnDestroy } from '../../util/UnsubscribeOnDestroy';
import { takeUntil } from 'rxjs/operators';
import { Settings } from '../../settings';
import { AccountService } from '../../setup/account/account.service';

@Component({
  selector: 'dashboard-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends UnsubscribeOnDestroy implements OnInit {
  userProfile: UserProfileType = 'simple';

  constructor(private storeService: StoreService, private accountService: AccountService) {
    super();
  }

  ngOnInit(): void {
    this.storeService.settings
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((settings: Settings) => {
        this.userProfile = settings.userProfile || 'simple';
      });
  }

}


