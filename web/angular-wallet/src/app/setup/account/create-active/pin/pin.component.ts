import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {CreateService, StepsEnum} from '../../create.service';
import {NotifierService} from 'angular-notifier';
import {I18nService} from '../../../../layout/components/i18n/i18n.service';

@Component({
  selector: 'app-account-create-pin',
  styleUrls: ['./pin.component.scss'],
  templateUrl: './pin.component.html'
})
export class AccountCreatePinComponent {

  @Input() lastStep: boolean;
  pin: string;

  constructor(
    private router: Router,
    private createService: CreateService,
    private notificationService: NotifierService,
    private i18nService: I18nService,
  ) {
  }

  public back(): void {
    this.createService.previousStep();
  }

  public next(): void {
    if (!this.isValid) {
      return;
    }

    this.createService.setPin(this.pin);
    setTimeout(() => {
      this.createService.setStep(StepsEnum.ActivateAccount);
    }, 0);
  }

  public get isValid(): boolean {
    return this.pin && this.pin.length >= 4;
  }

  public finish(): void {
    if (!this.isValid) {
      return;
    }

    this.createService.setPin(this.pin);
    this.createService.createActiveAccount().then((success) => {
        this.notificationService.notify('success', this.i18nService.getTranslation('account_added'));
        this.createService.reset();
        this.router.navigate(['/']);
      },
      (error) => {
        this.notificationService.notify('error', error.toString());
      });
  }

}
