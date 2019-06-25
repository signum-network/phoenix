import {Component, OnInit, Injectable, Input} from '@angular/core';
import { CreateService } from '../create.service';
import { NotifierService } from 'angular-notifier';
import { Router } from '@angular/router';
import { burstAddressPattern } from '@burstjs/util';

@Injectable()
@Component({
  selector: 'app-create-ledger',
  templateUrl: './create-ledger.component.html',
  styleUrls: ['./create-ledger.component.scss']
})
export class CreateLedgerAccountComponent implements OnInit {

  accountIndex = 0;
  
  burstAddressPattern = burstAddressPattern;

  constructor(private createService: CreateService,
              private notificationService: NotifierService,
              private router: Router) { }

  ngOnInit() {
  }

  public submit() {
    console.log(this.accountIndex);
    if (this.accountIndex < 0 || this.accountIndex > 255) {
      this.notificationService.notify('error', 'Account Index must be 0-255');
      return;
    }
    this.createService.createLedgerAccount(this.accountIndex).then(address => {
      this.notificationService.notify('success', `Account added: ${address}`);
      this.createService.reset();
      this.router.navigate(['/']);
    },
    (error) => {
      this.notificationService.notify('error', error.toString());
    });
  }
}
