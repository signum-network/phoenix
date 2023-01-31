import { ApplicationRef, Component, Input, OnDestroy, OnInit, ViewEncapsulation } from "@angular/core";
import { takeUntil } from 'rxjs/operators';

import { FuseConfigService } from '@fuse/services/config.service';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';

import { navigation } from 'app/navigation/navigation';
import { I18nService } from '../i18n/i18n.service';
import { constants } from 'app/constants';
import { StoreService } from 'app/store/store.service';
import { Router } from '@angular/router';
import { NetworkService } from '../../../network/network.service';
import { UnsubscribeOnDestroy } from 'app/util/UnsubscribeOnDestroy';
import { WalletAccount } from 'app/util/WalletAccount';
import { UserProfileType } from 'app/shared/types';
import { AccountManagementService } from 'app/shared/services/account-management.service';

interface UserProfile {
  name: UserProfileType;
  description: string; // i18n key
  icon: string;
}

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ToolbarComponent
  extends UnsubscribeOnDestroy
  implements OnInit, OnDestroy
{
  @Input() selectedAccount: WalletAccount;
  accounts: WalletAccount[];
  horizontalNavbar: boolean;
  rightNavbar: boolean;
  hiddenNavbar: boolean;
  languages: any;
  navigation: any;
  languageName: string;
  userStatusOptions: any[];
  isMainNet = false;
  profiles: UserProfile[];
  selectedProfile: UserProfile;

  constructor(
    private _fuseConfigService: FuseConfigService,
    private _fuseSidebarService: FuseSidebarService,
    private i18nService: I18nService,
    private accountManagementService: AccountManagementService,
    private networkService: NetworkService,
    private storeService: StoreService,
    private router: Router,
    private appRef: ApplicationRef
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
      // {
      //   name: 'trader',
      //   description: 'user_profile_desc_trader',
      //   icon: 'timeline',
      // },
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

    this.selectedAccount = this.accountManagementService.getSelectedAccount();
    this.accounts = this.accountManagementService.getAllAccounts();

    this.storeService.settingsUpdated$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((settings) => {
        if (!settings) { return; }
        this.languageName = this.getLanguageName(settings.language);
        this.selectedProfile = this.getProfileByName(settings.userProfile);
      });

    this.storeService.accountSelected$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((account) => {
        this.selectedAccount = account;
        this.accounts = this.accountManagementService.getAllAccounts();
      });

    this.storeService.nodeSelected$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe((nodeInfo) => {
          this.accounts = this.accountManagementService.getAllAccounts();
          this.isMainNet = nodeInfo.networkName === 'Signum';
      });

  }

  toggleSidebarOpen(key): void {
    this._fuseSidebarService.getSidebar(key).toggleOpen();
  }

  setLanguage(lang): void {
    this.languageName = lang;
    this.i18nService.setLanguage(lang);
  }

  setProfile(profile): void {
    this.selectedProfile = this.getProfileByName(profile);
    this.storeService.updateSettings({userProfile: profile});
  }

  async setAccount(account): Promise<void> {
    this.selectedAccount = account;
    await this.accountManagementService.selectAccount(account);
    await this.router.navigate(['/']);
  }

  private getProfileByName(profileName: string): UserProfile {
    return this.profiles.find((p) => p.name === profileName);
  }

  private getLanguageName(languageCode: string): string {
    for (const l of constants.languages){
      if (l.code === languageCode){
        return l.name;
      }
    }
    console.warn(`Language '${languageCode}' not found`);
  }
}
