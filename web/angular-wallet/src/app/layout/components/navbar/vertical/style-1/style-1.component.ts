import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  ElementRef,
  ApplicationRef
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { delay, filter, take, takeUntil, merge, concat } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import {
  FusePerfectScrollbarDirective
} from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { StoreService } from 'app/store/store.service';
import { AccountService } from 'app/setup/account/account.service';
import { environment } from 'environments/environment';
import { I18nService } from 'app/shared/services/i18n.service';
import { NotifierService } from 'angular-notifier';

import hashicon from 'hashicon';
import { FuseNavigation } from '@fuse/types';
import { WalletAccount } from 'app/util/WalletAccount';
import { UnsubscribeOnDestroy } from 'app/util/UnsubscribeOnDestroy';
import { NetworkService } from 'app/network/network.service';
import { AppService } from 'app/app.service';

@Component({
  selector: 'navbar-vertical-style-1',
  templateUrl: './style-1.component.html',
  styleUrls: ['./style-1.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarVerticalStyle1Component extends UnsubscribeOnDestroy implements OnInit {

  @ViewChild('ipfsAvatar', { static: false }) ipfsAvatar: ElementRef<HTMLImageElement>;
  @ViewChild('hashAvatar', { static: false }) hashAvatar: ElementRef<HTMLImageElement>;
  navigation: any;
  fuseConfig: any;
  language: string;
  avatarImgSrc: string;
  avatarLoaded = false;
  hashIconImgSrc = '';

  selectedAccount: WalletAccount;
  // Private
  private _fusePerfectScrollbar: FusePerfectScrollbarDirective;
  private unsubscribe = takeUntil(this.unsubscribeAll);

  constructor(
    private fuseConfigService: FuseConfigService,
    private fuseNavigationService: FuseNavigationService,
    private fuseSidebarService: FuseSidebarService,
    private accountService: AccountService,
    private storeService: StoreService,
    private i18nService: I18nService,
    private notifierService: NotifierService,
    private router: Router,
    private appRef: ApplicationRef,
    private networkService: NetworkService,
    private appService: AppService,
  ) {
    super();
    // Set the private defaults
  }

  @ViewChild(FusePerfectScrollbarDirective, { static: true })
  set directive(theDirective: FusePerfectScrollbarDirective) {
    if (!theDirective) {
      return;
    }

    this._fusePerfectScrollbar = theDirective;

    // Update the scrollbar on collapsable item toggle
    this.fuseNavigationService.onItemCollapseToggled
      .pipe(
        delay(500),
        this.unsubscribe
      )
      .subscribe(() => {
        this._fusePerfectScrollbar.update();
      });

    // Scroll to the active item position
    this.router.events
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
    this.selectedAccount = this.storeService.getSelectedAccount();

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        this.unsubscribe
      )
      .subscribe(() => {
          if (this.fuseSidebarService.getSidebar('navbar')) {
            this.fuseSidebarService.getSidebar('navbar').close();
          }
        }
      );

    this.storeService.languageSelected$
      .pipe(this.unsubscribe)
      .subscribe((language: string) => {
          this.language = language;
        }
      );

    this.storeService.accountSelected$
      .pipe(this.unsubscribe)
      .subscribe((account: WalletAccount) => {
          this.selectedAccount = account;
          this.updateAvatar();
          this.updateNavigation();
          this.appRef.tick();
        }
      );

    this.storeService.accountUpdated$
      .pipe(this.unsubscribe)
      .subscribe((account: WalletAccount) => {
          if (this.selectedAccount.account === account.account) {
            this.selectedAccount = account;
            this.updateAvatar();
            // navigation does not need to be updated
            this.appRef.tick();
          }
        }
      );

    // Subscribe to the config changes
    this.fuseConfigService.config
      .pipe(this.unsubscribe)
      .subscribe((config) => {
        this.fuseConfig = config;
      });

    // Get current navigation
    // this.fuseNavigationService.onNavigationChanged
    //   .pipe(
    //     filter(value => value !== null),
    //     this.unsubscribe
    //   )
    //   .subscribe(() => {
    //
    //     this.updateAvatar();
    //   });
  }

  private updateAvatar(): void {
    const hashIconUrl = hashicon(this.selectedAccount.account).toDataURL();
    if (this.hashIconImgSrc !== hashIconUrl) {
      this.hashIconImgSrc = hashIconUrl;
    }

    const avatarUrl = this.accountService.getAvatarUrlFromAccount(this.selectedAccount);
    if (avatarUrl !== this.avatarImgSrc) {
      this.avatarLoaded = false;
      this.avatarImgSrc = avatarUrl;
    }
  }

  onAvatarLoad(success: boolean): void {
    this.avatarLoaded = success;
    this.ipfsAvatar.nativeElement.style.display = success ? 'inherit' : 'none';
  }

  toggleSidebarOpened(): void {
    this.fuseSidebarService.getSidebar('navbar').toggleOpen();
  }

  toggleSidebarFolded(): void {
    this.fuseSidebarService.getSidebar('navbar').toggleFold();
  }

  getVersion(): string {
    return environment.version;
  }

  async copy(val: string): Promise<void> {
    await this.appService.copyToClipboard(val);
  }

  getBalance(): string {
    return this.selectedAccount.balanceNQT;
  }

  private updateNavigation(): void {

    const navigation = this.fuseNavigationService.getCurrentNavigation() as FuseNavigation[];

    const isFullAccount = !this.selectedAccount.isWatchOnly();

    const traverse = (n: FuseNavigation) => {
      n.hidden = n.fullAccountOnly && !isFullAccount;
      if (n.children) {
        n.children.forEach(traverse);
      }
    };
    navigation.forEach(traverse);
    this.navigation = navigation;
  }

  openInExplorer(account: string): void {
      const host = this.networkService.getChainExplorerHost();
      const url = `${host}/address/${account}`;
      if (!this.appService.isDesktop()) {
      window.open(url, 'blank');
    } else {
      this.appService.openInBrowser(url);
    }
  }
}
