import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { navigation } from 'app/navigation/navigation';
import { StoreService } from 'app/store/store.service';
import { WalletAccount } from 'app/util/WalletAccount';
import { UnsubscribeOnDestroy } from 'app/util/UnsubscribeOnDestroy';

@Component({
  selector: 'vertical-layout-1',
  templateUrl: './layout-1.component.html',
  styleUrls: ['./layout-1.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VerticalLayout1Component extends UnsubscribeOnDestroy implements OnInit{
  fuseConfig: any;
  navigation: any;

  selectedAccount: WalletAccount;

  constructor(
    private _fuseConfigService: FuseConfigService,
    private storeService: StoreService
  ) {
    super();
    this.navigation = navigation;
  }

  ngOnInit(): void {
    // Subscribe to config changes
    this._fuseConfigService.config
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((config) => {
        this.fuseConfig = config;
        const hasAccountSelected = !!this.storeService.getSelectedAccount();
        this.fuseConfig.layout.navbar.hidden = !hasAccountSelected;
      });
  }
}
