import { Component, OnInit } from '@angular/core';
import { StoreService } from 'app/store/store.service';
import { AccountService } from 'app/setup/account/account.service';
import { WalletAccount } from 'app/util/WalletAccount';
import { UnsubscribeOnDestroy } from '../../../../util/UnsubscribeOnDestroy';
import { takeUntil } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';
import { I18nService } from '../../../../layout/components/i18n/i18n.service';
import { HttpError } from '@signumjs/http';

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
    private accountService: AccountService,
    private notificationService: NotifierService,
    private i18nService: I18nService
  ) {
    super();
  }

  ngOnInit(): void {
    this.accountService.currentAccount$
      .pipe(takeUntil(this.unsubscribeAll))
      .subscribe(async (a) => {
        this.account = a;
        await this.checkForAccountsActivation(a);
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

  private async checkForAccountsActivation(a: WalletAccount): Promise<void> {

    if (!a) {
      return;
    }
    // ignore watched accounts.
    if (a.type === 'offline') {
      this.status = AccountStatus.Safe;
      return;
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
