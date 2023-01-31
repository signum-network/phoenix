import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {FuseConfigService} from '@fuse/services/config.service';
import {navigation} from 'app/navigation/navigation';
import { WalletAccount } from 'app/util/WalletAccount';
import { StoreService } from 'app/store/store.service';
@Component({
  selector: 'vertical-layout-1',
  templateUrl: './layout-1.component.html',
  styleUrls: ['./layout-1.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VerticalLayout1Component implements OnInit, OnDestroy {
  fuseConfig: any;
  navigation: any;

  // selectedAccount: WalletAccount;
  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _fuseConfigService: FuseConfigService,
    private storeService: StoreService
  ) {
    this.navigation = navigation;
    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    // Subscribe to config changes
    this._fuseConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config) => {
        this.fuseConfig = config;
      });

    // this.selectedAccount = this.storeService.getSelectedAccount();
    //
    // this.storeService.accountSelected$
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((account) => {
    //     this.selectedAccount = account;
    //   });
    //
    // this.storeService.accountUpdated$
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((account) => {
    //     if (account.account === this.selectedAccount.account){
    //       this.selectedAccount = account;
    //     }
    //   });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
