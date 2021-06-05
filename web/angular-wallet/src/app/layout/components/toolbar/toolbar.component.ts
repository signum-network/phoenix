import {Component, OnDestroy, OnInit, ViewEncapsulation, Input} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import * as _ from 'lodash';

import {FuseConfigService} from '@fuse/services/config.service';
import {FuseSidebarService} from '@fuse/components/sidebar/sidebar.service';

import {navigation} from 'app/navigation/navigation';
import {I18nService} from '../i18n/i18n.service';
import {constants} from 'app/constants';
import {StoreService} from 'app/store/store.service';
import {AccountService} from 'app/setup/account/account.service';
import {Account} from '@signumjs/core';
import {Router} from '@angular/router';
import {NetworkService} from '../../../network/network.service';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ToolbarComponent implements OnInit, OnDestroy {
  horizontalNavbar: boolean;
  rightNavbar: boolean;
  hiddenNavbar: boolean;
  languages: any;
  navigation: any;
  selectedLanguage: any;
  userStatusOptions: any[];
  isMainNet = false;

  @Input('selectedAccount') selectedAccount: Account;
  @Input('accounts') accounts: Account[];

  private _unsubscribeAll: Subject<any>;

  constructor(
    private _fuseConfigService: FuseConfigService,
    private _fuseSidebarService: FuseSidebarService,
    private i18nService: I18nService,
    private accountService: AccountService,
    private networkService: NetworkService,
    private storeService: StoreService,
    private router: Router
  ) {

    this.languages = constants.languages;
    this.navigation = navigation;
    this._unsubscribeAll = new Subject();
  }


  ngOnInit(): void {
    // Subscribe to the config changes
    this._fuseConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((settings) => {
        this.horizontalNavbar = settings.layout.navbar.position === 'top';
        this.rightNavbar = settings.layout.navbar.position === 'right';
        this.hiddenNavbar = settings.layout.navbar.hidden === true;
      });

    this.networkService.isMainNet
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((isMainNet => {
        this.isMainNet = isMainNet;
      }));

    // this.storeService.settings
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe(async ({node}) => {
    //     this.isMainNet = this.networkService.isMainNet();
    //   });

    this.storeService.ready
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        this.selectedLanguage = this.i18nService.currentLanguage;

      });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  toggleSidebarOpen(key): void {
    this._fuseSidebarService.getSidebar(key).toggleOpen();
  }

  setLanguage(lang): void {
    this.selectedLanguage = lang;
    this.i18nService.setLanguage(lang);

  }

  setAccount(account): void {
    this.selectedAccount = account;
    this.accountService.selectAccount(account);
    this.router.navigate(['/']);
  }
}
