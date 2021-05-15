import {Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {FuseMatchMediaService} from '@fuse/services/match-media.service';
import {FuseNavigationService} from '@fuse/components/navigation/navigation.service';
import {AccountService} from 'app/setup/account/account.service';
import {MediaObserver} from '@angular/flex-layout';
import {I18nService} from '../../../app/layout/components/i18n/i18n.service';
import {Account} from '@burstjs/core';

@Component({
  selector: 'fuse-shortcuts',
  templateUrl: './shortcuts.component.html',
  styleUrls: ['./shortcuts.component.scss']
})
export class FuseShortcutsComponent implements OnInit, OnDestroy {
  shortcutItems: any[];
  navigationItems: any[];
  filteredNavigationItems: any[];
  searching: boolean;
  mobileShortcutsPanelActive: boolean;
  currentAccount: Account;

  @Input()
  navigation: any;

  @ViewChild('searchInput', {static: true})
  searchInputField;

  @ViewChild('shortcuts', {static: true})
  shortcutsEl: ElementRef;

  private _unsubscribeAll: Subject<any>;

  constructor(
    private i18nService: I18nService,
    private _cookieService: CookieService,
    private _fuseMatchMediaService: FuseMatchMediaService,
    private _fuseNavigationService: FuseNavigationService,
    private _observableMedia: MediaObserver,
    private _renderer: Renderer2,
    private accountService: AccountService
  ) {
    this.shortcutItems = [];
    this.searching = false;
    this.mobileShortcutsPanelActive = false;

    this._unsubscribeAll = new Subject();
  }

  ngOnInit(): void {
    // Get the navigation items and flatten them
    this.filteredNavigationItems = this.navigationItems = this._fuseNavigationService.getFlatNavigation(this.navigation);

    if (this._cookieService.check('FUSE2.shortcuts')) {
      this.shortcutItems = JSON.parse(this._cookieService.get('FUSE2.shortcuts'));
    } else {
      this.accountService.currentAccount.subscribe(this.setAccount());
    }

    this.i18nService.state.subscribe(() => {
      this.updateShortcuts();
    });

    this._fuseMatchMediaService.onMediaChange
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(() => {
        if (this._observableMedia.isActive('gt-sm')) {
          this.hideMobileShortcutsPanel();
        }
      });
  }

  private setAccount(): (value: Account) => void {
    return (account) => {
      this.currentAccount = account;
      this.updateShortcuts();
    };
  }

  private updateShortcuts(): void {
    this.shortcutItems = [];
    const isOfflineAccount = this.currentAccount && this.currentAccount.type === 'offline';

    this.shortcutItems.push({
      title: this.i18nService.getTranslation('dashboard'),
      type: 'item',
      icon: 'dashboard',
      url: '/dashboard'
    });
    if (!isOfflineAccount) {
      this.shortcutItems.push({
        title: this.i18nService.getTranslation('send_burst'),
        type: 'item',
        icon: 'vertical_align_top',
        url: '/send'
      });
    }
    this.shortcutItems.push({
      title: this.i18nService.getTranslation('request_burst'),
      type: 'item',
      icon: 'vertical_align_bottom',
      url: '/request'
    });
    if (!isOfflineAccount) {
      this.shortcutItems.push(
        {
          title: this.i18nService.getTranslation('messages'),
          type: 'item',
          icon: 'message',
          url: '/messages'
        });
    }
    this.shortcutItems.push({
      title: this.i18nService.getTranslation('settings'),
      type: 'item',
      icon: 'settings',
      url: '/settings'
    });
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  search(event): void {
    const value = event.target.value.toLowerCase();

    if (value === '') {
      this.searching = false;
      this.filteredNavigationItems = this.navigationItems;

      return;
    }

    this.searching = true;

    this.filteredNavigationItems = this.navigationItems.filter((navigationItem) => {
      return navigationItem.title.toLowerCase().includes(value);
    });
  }

  toggleShortcut(event, itemToToggle): void {
    event.stopPropagation();

    for (let i = 0; i < this.shortcutItems.length; i++) {
      if (this.shortcutItems[i].url === itemToToggle.url) {
        this.shortcutItems.splice(i, 1);
        this._cookieService.set('FUSE2.shortcuts', JSON.stringify(this.shortcutItems));
        return;
      }
    }

    this.shortcutItems.push(itemToToggle);
    this._cookieService.set('FUSE2.shortcuts', JSON.stringify(this.shortcutItems));
  }

  isInShortcuts(navigationItem): any {
    return this.shortcutItems.find(item => {
      return item.url === navigationItem.url;
    });
  }

  onMenuOpen(): void {
    setTimeout(() => {
      this.searchInputField.nativeElement.focus();
    });
  }

  showMobileShortcutsPanel(): void {
    this.mobileShortcutsPanelActive = true;
    this._renderer.addClass(this.shortcutsEl.nativeElement, 'show-mobile-panel');
  }

  hideMobileShortcutsPanel(): void {
    this.mobileShortcutsPanelActive = false;
    this._renderer.removeClass(this.shortcutsEl.nativeElement, 'show-mobile-panel');
  }
}
