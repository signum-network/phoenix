import {Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {takeUntil} from 'rxjs/operators';

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
import {UnsubscribeOnDestroy} from '../../../util/UnsubscribeOnDestroy';
import {UserProfileType} from '../../../shared/types';

interface UserProfile {
  name: UserProfileType;
  description: string; // i18n key
  icon: string;
}

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ToolbarComponent extends UnsubscribeOnDestroy implements OnInit, OnDestroy {
  @Input('selectedAccount') selectedAccount: Account;
  @Input('accounts') accounts: Account[];

  horizontalNavbar: boolean;
  rightNavbar: boolean;
  hiddenNavbar: boolean;
  languages: any;
  navigation: any;
  selectedLanguage: any;
  userStatusOptions: any[];
  isMainNet = false;
  profiles: UserProfile[];
  selectedProfile: UserProfile;

  constructor(
    private _fuseConfigService: FuseConfigService,
    private _fuseSidebarService: FuseSidebarService,
    private i18nService: I18nService,
    private accountService: AccountService,
    private networkService: NetworkService,
    private storeService: StoreService,
    private router: Router
  ) {
    super();
    this.languages = constants.languages;
    this.navigation = navigation;
    this.profiles = [
      {
        name: 'simple',
        description: 'user_profile_desc_simple',
        icon: 'sentiment_very_satisfied',
      },
      {
        name: 'power',
        description: 'user_profile_desc_power',
        icon: 'battery_charging_full',
      },
      {
        name: 'miner',
        description: 'user_profile_desc_miner',
        icon: 'storage',
      },
      {
        name: 'trader',
        description: 'user_profile_desc_trader',
        icon: 'timeline',
      },
    ];
  }

  ngOnInit(): void {
    // Subscribe to the config changes
    this._fuseConfigService.config
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((settings) => {
        this.horizontalNavbar = settings.layout.navbar.position === 'top';
        this.rightNavbar = settings.layout.navbar.position === 'right';
        this.hiddenNavbar = settings.layout.navbar.hidden === true;
      });

    this.networkService.isMainNet$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((isMainNet => {
        this.isMainNet = isMainNet;
      }));

    this.storeService.settings
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((settings) => {
        this.selectedLanguage = this.i18nService.currentLanguage;
        this.selectedProfile = this.getProfileByName(settings.userProfile || 'simple');
      });
  }

  toggleSidebarOpen(key): void {
    this._fuseSidebarService.getSidebar(key).toggleOpen();
  }

  setLanguage(lang): void {
    this.selectedLanguage = lang;
    this.i18nService.setLanguage(lang);
  }

  setProfile(profile): void {
    this.selectedProfile = this.getProfileByName(profile);
    this.storeService.getSettings().then(s => {
        s.userProfile = this.selectedProfile.name;
        this.storeService.saveSettings(s);
      }
    );
  }

  setAccount(account): void {
    this.selectedAccount = account;
    this.accountService.selectAccount(account);
    this.router.navigate(['/']);
  }

  private getProfileByName(profileName: string): UserProfile {
    const found = this.profiles.find(p => p.name === profileName);
    return found;
  }
}
