import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {CreateService} from '../../create.service';
import {NotifierService} from 'angular-notifier';
import {sampleSize} from 'lodash';
import {AccountService} from '../../account.service';
import {I18nService} from '../../../../layout/components/i18n/i18n.service';

interface Token {
  text: string;
  ok: boolean;
}

@Component({
  selector: 'app-account-activate',
  styleUrls: ['./activate.component.scss'],
  templateUrl: './activate.component.html'
})
export class AccountActivateComponent {

  isActivating = false;
  passphrase = '';
  randomizedTokens: Token[] = [];

  constructor(
    private router: Router,
    private createService: CreateService,
    private accountService: AccountService,
    private i18nService: I18nService,
    private notificationService: NotifierService,
  ) {
  }

  isStepActive(): boolean {
    return this.createService.getStep() === 4;
  }

  ngDoCheck(): void {
    if (!(this.isStepActive() && this.randomizedTokens.length === 0)) {
      return;
    }
    this.randomizePassphraseTokens();
  }

  public back(): void {
    setTimeout(() => {
      this.createService.previousStep();
    }, 0);
  }

  public reset(): void {
    this.passphrase = '';
    this.randomizedTokens = [];
    this.randomizePassphraseTokens();
  }

  private randomizePassphraseTokens(): void {
    const tokens = this.createService.getPhrase().split(' ');
    if (tokens && tokens.length) {
      this.randomizedTokens = sampleSize(tokens, tokens.length).map(t => ({
        text: t,
        ok: null,
      }));
    }
  }

  public get isValid(): boolean {
    if (!this.isStepActive()) {
      return false;
    }
    return this.createService.getPhrase() === this.passphrase;
  }

  public async activate(): Promise<void> {
    if (!this.isValid) {
      return;
    }
    try {
      this.isActivating = true;
      const account = await this.createService.createActiveAccount();
      await this.accountService.activateAccount(account);
      this.notificationService.notify('success', this.i18nService.getTranslation('activate_request_successful'));
      this.notificationService.notify('success', this.i18nService.getTranslation('account_added'));
      this.createService.reset();
    } catch (error) {
      this.notificationService.notify('error', error.toString());
    } finally {
      await this.router.navigate(['/']);
      this.isActivating = false;
    }
  }

  private isPassphraseFine(): boolean {
    return this.createService.getPhrase().startsWith(this.passphrase);
  }

  public confirm($event: MouseEvent): void {
    // @ts-ignore
    const text = $event.target.innerText;
    this.passphrase += ' ' + text;
    this.passphrase = this.passphrase.trim();

    // @ts-ignore
    const index = this.randomizedTokens.findIndex(t => t.text === text);
    if (index >= 0) {
      this.randomizedTokens[index].ok = this.isPassphraseFine();
    }
  }


}
