import { AfterViewInit, Component, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {FuseConfigService} from '@fuse/services/config.service';
import {navigation} from 'app/navigation/navigation';
import { StoreService } from 'app/store/store.service';
import { WalletAccount } from "app/util/WalletAccount";
@Component({
  selector: 'vertical-layout-1',
  templateUrl: './layout-1.component.html',
  styleUrls: ['./layout-1.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VerticalLayout1Component implements OnInit, OnDestroy, AfterViewInit {
  fuseConfig: any;
  navigation: any;

  // Private
  private _unsubscribeAll: Subject<any>;
  selectedAccount: WalletAccount;
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
  }



  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  ngAfterViewInit(): void {
    const selectedAccount = this.storeService.getSelectedAccount();
    if(selectedAccount){
      setTimeout(() => {
        // this.fuseConfig.layout.navbar.hidden = false;
      })
    }
  }
}
