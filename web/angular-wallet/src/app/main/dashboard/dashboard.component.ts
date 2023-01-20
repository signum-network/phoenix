import { Component, OnInit } from '@angular/core';
import { UserProfileType } from 'app/shared/types';
import { StoreService } from 'app/store/store.service';
import { UnsubscribeOnDestroy } from 'app/util/UnsubscribeOnDestroy';
import { takeUntil } from 'rxjs/operators';
import { Settings } from 'app/store/settings';
import { AccountService } from '../../setup/account/account.service';
import { WalletAccount } from "../../util/WalletAccount";

@Component({
  selector: 'dashboard-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends UnsubscribeOnDestroy implements OnInit {
  userProfile: UserProfileType = 'simple';
  private selectedAccount: WalletAccount;

  constructor(private storeService: StoreService, private accountService: AccountService) {
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


