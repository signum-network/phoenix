import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  Input,
  ElementRef,
  OnChanges, SimpleChanges
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { forkJoin, merge, Subject } from 'rxjs';
import { delay, filter, take, takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';
import {
  FusePerfectScrollbarDirective
} from '@fuse/directives/fuse-perfect-scrollbar/fuse-perfect-scrollbar.directive';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { StoreService } from 'app/store/store.service';
import { AccountService } from 'app/setup/account/account.service';
import { environment } from 'environments/environment';
import { I18nService } from 'app/layout/components/i18n/i18n.service';
import { NotifierService } from 'angular-notifier';

import hashicon from 'hashicon';
import { FuseNavigation } from '@fuse/types';
import { WalletAccount } from 'app/util/WalletAccount';
import { UnsubscribeOnDestroy } from '../../../../../util/UnsubscribeOnDestroy';
import { DescriptorData } from '@signumjs/standards';

@Component({
  selector: 'navbar-vertical-style-1',
  templateUrl: './style-1.component.html',
  styleUrls: ['./style-1.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavbarVerticalStyle1Component extends UnsubscribeOnDestroy implements OnInit, OnChanges {

  @ViewChild('ipfsAvatar', { static: false }) ipfsAvatar: ElementRef<HTMLImageElement>;
  @ViewChild('hashAvatar', { static: false }) hashAvatar: ElementRef<HTMLImageElement>;
  @Input() selectedAccount: WalletAccount;
  navigation: any;
  fuseConfig: any;
  selectedAccountQRCode: string;
  language: string;
  node = environment.defaultNode;
  avatarImgSrc: string;
  avatarLoaded = false;
  hashIconImgSrc = '';

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
    private router: Router
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

    this.storeService.settingsUpdated$
      .pipe(this.unsubscribe)
      .subscribe(async ({ language, node }) => {
          this.language = language;
          this.node = node;
        }
      );

    // Subscribe to the config changes
    this.fuseConfigService.config
      .pipe(this.unsubscribe)
      .subscribe((config) => {
        this.fuseConfig = config;
      });

    // Get current navigation
    this.fuseNavigationService.onNavigationChanged
      .pipe(
        filter(value => value !== null),
        this.unsubscribe
      )
      .subscribe(async () => {
        await this.updateAvatar();
      });

    this.storeService.accountUpdated$
      .pipe(this.unsubscribe)
      .subscribe(() => {
        this.updateNavigation();
        this.updateAvatar();
      });
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

  getQRCode(id: string): Promise<string> {
    return this.accountService.generateSendTransactionQRCodeAddress(id);
  }

  getAccountName(): string {
    return this.selectedAccount.name || this.i18nService.getTranslation('account_info');
  }

  getVersion(): string {
    return environment.version;
  }

  async copy(val: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(val);
      this.notifierService.notify('success',
        this.i18nService.getTranslation('success_clipboard_copy')
      );
    } catch (e) {
      this.notifierService.notify('error',
        this.i18nService.getTranslation('error_clipboard_copy')
      );
    }
  }

  getBalance(): string {
    return this.selectedAccount.balanceNQT;
  }

  private updateNavigation(): void {

    const navigation = this.fuseNavigationService.getCurrentNavigation() as FuseNavigation[];

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.selectedAccount.currentValue !== changes.selectedAccount.previousValue) {
      this.updateAvatar();
      this.updateNavigation();
    }
  }

}
