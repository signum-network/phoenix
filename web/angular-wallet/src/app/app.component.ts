import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Platform } from '@angular/cdk/platform';
import { Subject } from 'rxjs';

import { FuseSplashScreenService } from '@fuse/services/splash-screen.service';
import { FuseConfigService } from '@fuse/services/config.service';
import { AccountService } from './setup/account/account.service';
import { StoreService } from './store/store.service';
import { Account } from '@burstjs/core';

@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  account: Account;
  private _unsubscribeAll: Subject<any>;

  constructor(
    @Inject(DOCUMENT) private document: any,
    private _fuseConfigService: FuseConfigService,
    private _fuseSplashScreenService: FuseSplashScreenService,
    private _platform: Platform,
    private storeService: StoreService,
    private accountService: AccountService
  ) {

    // Add is-mobile class to the body if the platform is mobile
    if (this._platform.ANDROID || this._platform.IOS) {
      this.document.body.classList.add('is-mobile');
    }

    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void { 

    this.storeService.ready.subscribe((ready) => {
        if (ready) {
          this.storeService.getSelectedAccount().then((account) => {
            if (account) {
              this.account = account;
              this.accountService.selectAccount(account);
            }
          });

          this.accountService.currentAccount.subscribe((account) => {
            this.account = account;
          });
        }
    });


  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
