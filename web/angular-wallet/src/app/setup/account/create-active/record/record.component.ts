import {Component} from '@angular/core';
import {CreateService} from '../../create.service';

@Component({
  selector: 'app-account-create-record',
  styleUrls: ['./record.component.scss'],
  templateUrl: './record.component.html'
})
export class AccountCreateRecordComponent {

  constructor(
    public createService: CreateService,
  ) {
  }

  public back(): void {
    this.createService.previousStep();
  }

  public next(): void {
    this.createService.nextStep();
  }

  public copy(): void {
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = this.createService.getPhrase();
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  print(): void {
    window.print();
  }
}
