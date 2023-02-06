import { Component, OnInit } from '@angular/core';
import { StoreService } from 'app/store/store.service';
import { AccountService } from 'app/setup/account/account.service';
import { WalletAccount } from 'app/util/WalletAccount';
import { UnsubscribeOnDestroy } from '../../../../util/UnsubscribeOnDestroy';
import { takeUntil } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';
import { I18nService } from '../../../../shared/services/i18n.service';
import { HttpError } from '@signumjs/http';
import { AccountManagementService } from '../../../../shared/services/account-management.service';

enum AccountStatus {
  NotRegistered,
  NoPublicKey,
  Safe
}

@Component({
  selector: 'app-account-protection-warning',
  templateUrl: './account-protection-warning.component.html',
  styleUrls: ['./account-protection-warning.component.scss']
})
export class AccountProtectionWarningComponent extends UnsubscribeOnDestroy implements OnInit {

  private account: WalletAccount;
  private isActivating: boolean;
  status: AccountStatus = AccountStatus.Safe; // per default hidden

  constructor(
    private storeService: StoreService,
    private accountManagementService: AccountManagementService,
    private accountService: AccountService,
    private notificationService: NotifierService,
    private i18nService: I18nService
  ) {
    super();
  }

  ngOnInit(): void {
    this.account = this.accountManagementService.getSelectedAccount();
    this.checkForAccountsActivation();
    this.storeService.accountSelected$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(async (a) => {
        this.account = a;
        await this.checkForAccountsActivation();
      });
  }

  async activateAccount(): Promise<void> {
    try {
      this.isActivating = true;
      await this.accountService.activateAccount(this.account);
      this.notificationService.notify('success', this.i18nService.getTranslation('activation_success'));
    } catch (e) {
      this.notificationService.notify('error', `${this.i18nService.getTranslation('activation_failed')} ${e.message}`);
    } finally {
      this.isActivating = false;
    }
  }

  private async checkForAccountsActivation(): Promise<void> {
    const a = this.account;
    if (!a) {
      return;
    }
    // ignore watched accounts.
    if (a.isWatchOnly()) {
      this.status = AccountStatus.Safe;
      return;
    }

    if (a.isNew()){
      this.status = AccountStatus.NotRegistered;
    }

    try {
      // checking real current status
      const remoteAccount = await this.accountService.getAccount(a.account);
      this.status = remoteAccount.keys.publicKey ? AccountStatus.Safe : AccountStatus.NoPublicKey;
    } catch (e) {
      if (e instanceof HttpError) {
        if (e.message.indexOf('Unknown account') !== -1) {
          this.status = AccountStatus.NotRegistered;
          return;
        }
      }
      console.error(e.message);
    }
  }

}
