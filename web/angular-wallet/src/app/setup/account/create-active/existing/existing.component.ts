import {Component, Input} from '@angular/core';
import {CreateService} from '../../create.service';

const WhiteSpaceIndicator = '⦾';

@Component({
  selector: 'app-account-create-existing',
  styleUrls: ['./existing.component.scss'],
  templateUrl: './existing.component.html'
})
export class AccountCreateExistingComponent {

  passphrase = '';
  showWhitespaces = true;

  constructor(
    public createService: CreateService,
  ) {
  }


  public next(): void {
    const phrase = this.showWhitespaces ? this.passphrase.replace(new RegExp(WhiteSpaceIndicator, 'gi'), ' ') : this.passphrase;
    this.createService.generateAccount(phrase).then(() => {
      this.createService.nextStep();
    });
  }

  public onChange(phrase: string): void {
    this.passphrase = this.showWhitespaces
      ? phrase.replace(/ /ig, WhiteSpaceIndicator)
      : phrase.replace(new RegExp(WhiteSpaceIndicator, 'gi'), ' ');
  }

  public onCheckboxChange(checked: boolean): void {
    this.showWhitespaces = checked;
    this.onChange(this.passphrase);
  }
}
