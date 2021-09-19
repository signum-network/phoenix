import {Component, Input} from '@angular/core';
import {CreateService} from '../../create.service';


@Component({
  selector: 'app-account-create-existing',
  styleUrls: ['./existing.component.scss'],
  templateUrl: './existing.component.html'
})
export class AccountCreateExistingComponent {

  passphrase = '';


  constructor(
    public createService: CreateService,
  ) {
  }


  public next(): void {
    this.createService.generateAccount(this.passphrase).then(() => {
      this.createService.nextStep();
    });
  }
}
