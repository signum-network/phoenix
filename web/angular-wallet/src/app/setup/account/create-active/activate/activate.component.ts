import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {CreateService, StepsEnum} from '../../create.service';
import {NotifierService} from 'angular-notifier';

@Component({
  selector: 'app-account-activate',
  styleUrls: ['./activate.component.scss'],
  templateUrl: './activate.component.html'
})
export class AccountActivateComponent {

  @Input() pin: string;
  isValid: boolean = true; // TODO

  constructor(
    private router: Router,
    private createService: CreateService,
    private notificationService: NotifierService,
  ) {
  }

  public back(): void {
    this.createService.previousStep();
  }

  // public get isValid(): boolean {
  //   return this.pin && this.pin.length >= 4;
  // }

  public finish(): void {
    console.log('Finish')
    // this.createService.setPin(this.pin);
    // this.createService.createActiveAccount().then((success) => {
    //     this.notificationService.notify('success', `Account added successfully`);
    //     this.createService.reset();
    //     // Angular Stepper hack
    //     setTimeout(x => {
    //       this.createService.setStepIndex(0);
    //     }, 0);
    //     this.router.navigate(['/']);
    //   },
    //   (error) => {
    //     this.notificationService.notify('error', error.toString());
    //   });
  }

}
