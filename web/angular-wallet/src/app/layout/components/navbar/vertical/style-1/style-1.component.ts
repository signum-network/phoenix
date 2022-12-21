import {Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation, Input, ElementRef} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {delay, filter, take, takeUntil} from 'rxjs/operators';

import {FuseConfigService} from '@fuse/services/config.service';
import {FuseNavigationService} from '@fuse/components/navigation/navigation.service';
import {FusePerfectScrollbarDirective} from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import {FuseSidebarService} from '@fuse/components/sidebar/sidebar.service';
import {StoreService} from 'app/store/store.service';
import {AccountService} from 'app/setup/account/account.service';
import {environment} from 'environments/environment';
import {I18nService} from 'app/layout/components/i18n/i18n.service';
import {NotifierService} from 'angular-notifier';

import hashicon from 'hashicon';
import {FuseNavigation} from '@fuse/types';
import { WalletAccount } from 'app/util/WalletAccount';
import { DescriptorData } from '@signumjs/standards';

@Component({
  selector: 'navbar-vertical-style-1',
  templateUrl: './style-1.component.html',
  styleUrls: ['./style-1.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarVerticalStyle1Component implements OnInit, OnDestroy {

  @ViewChild('avatar', {static: false}) avatar: ElementRef<HTMLCanvasElement>;
  @Input() selectedAccount: WalletAccount;
  navigation: any;
  fuseConfig: any;
  selectedAccountQRCode: string;
  language: string;
  node = environment.defaultNode;
  avatarImgSrc: string;

  // Private
  private _fusePerfectScrollbar: FusePerfectScrollbarDirective;
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _fuseConfigService: FuseConfigService,
    private _fuseNavigationService: FuseNavigationService,
    private _fuseSidebarService: FuseSidebarService,
    private _accountService: AccountService,
    private _storeService: StoreService,
    private i18nService: I18nService,
    private _notifierService: NotifierService,
    private _router: Router
  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  @ViewChild(FusePerfectScrollbarDirective, {static: true})
  set directive(theDirective: FusePerfectScrollbarDirective) {
    if (!theDirective) {
      return;
    }

    this._fusePerfectScrollbar = theDirective;

    // Update the scrollbar on collapsable item toggle
    this._fuseNavigationService.onItemCollapseToggled
      .pipe(
        delay(500),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(() => {
        this._fusePerfectScrollbar.update();
      });

    // Scroll to the active item position
    this._router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        take(1)
      )
      .subscribe(() => {
          setTimeout(() => {
            const activeNavItem: any = document.querySelector('navbar .nav-link.active');

            if (activeNavItem) {
              const activeItemOffsetTop = activeNavItem.offsetTop,
                activeItemOffsetParentTop = activeNavItem.offsetParent.offsetTop,
                scrollDistance = activeItemOffsetTop - activeItemOffsetParentTop - (48 * 3) - 168;

              this._fusePerfectScrollbar.scrollToTop(scrollDistance);
            }
          });
        }
      );
  }

  async ngOnInit(): Promise<void> {
    this._router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(() => {
          if (this._fuseSidebarService.getSidebar('navbar')) {
            this._fuseSidebarService.getSidebar('navbar').close();
          }
        }
      );

    this._storeService.settings
      .pipe(
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(async ({language, node}) => {
          this.language = language;
          this.node = node;
          await this.updateAvatar();
        }
      );
    // Subscribe to the config changes
    this._fuseConfigService.config
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((config) => {
        this.fuseConfig = config;
      });

    // Get current navigation
    this._fuseNavigationService.onNavigationChanged
      .pipe(
        filter(value => value !== null),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(async () => {
        await this.updateAvatar();
      });

    this._accountService.currentAccount$
      .pipe(
        delay(1),
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(async () => {
        this.updateNavigation();
        await this.updateAvatar();
      });
  }

  private async updateAvatar(): Promise<void> {
    this.avatarImgSrc =  this._accountService.getAvatarUrlFromAccount(this.selectedAccount);
    if (!this.avatarImgSrc && this.avatar) {
      hashicon(this.selectedAccount.account, {
        size: 100,
        createCanvas: () => this.avatar.nativeElement
      });
    }
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle sidebar opened status
   */
  toggleSidebarOpened(): void {
    this._fuseSidebarService.getSidebar('navbar').toggleOpen();
  }

  /**
   * Toggle sidebar folded status
   */
  toggleSidebarFolded(): void {
    this._fuseSidebarService.getSidebar('navbar').toggleFold();
  }

  getQRCode(id: string): Promise<string> {
    return this._accountService.generateSendTransactionQRCodeAddress(id);
  }

  getAccountName(): string {
    return this.selectedAccount.name || this.i18nService.getTranslation('account_info');
  }

  getVersion(): string {
    return environment.version;
  }

  copy(val: string): void {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    const success = document.execCommand('copy');
    document.body.removeChild(selBox);

    if (success) {
      this._notifierService.notify('success',
        this.i18nService.getTranslation('success_clipboard_copy')
      );
    } else {
      this._notifierService.notify('error',
        this.i18nService.getTranslation('error_clipboard_copy')
      );
    }
  }

  getBalance(): string {
    return this.selectedAccount.balanceNQT;
  }

  private updateNavigation(): void {

    const navigation = this._fuseNavigationService.getCurrentNavigation() as FuseNavigation[];

    const isFullAccount = this.selectedAccount.type !== 'offline';

    const traverse = (n: FuseNavigation) => {
      n.hidden = n.fullAccountOnly && !isFullAccount;
      if (n.children) {
        n.children.forEach(traverse);
      }
    };

    navigation.forEach(traverse);

    this.navigation = navigation;
  }
}
