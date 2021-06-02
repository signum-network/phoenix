import {Component, Injectable, OnInit} from '@angular/core';
import {CreateService} from '../create.service';
import {NotifierService} from 'angular-notifier';
import {Router} from '@angular/router';
import {burstAddressPattern} from 'app/util/burstAddressPattern';
import {NetworkService} from '../../../network/network.service';
import {AddressPrefix} from '@burstjs/core/src';

@Injectable()
@Component({
  selector: 'app-create-passive',
  templateUrl: './create-passive.component.html',
  styleUrls: ['./create-passive.component.scss']
})
export class CreatePassiveAccountComponent implements OnInit {

  address = '';

  burstAddressPattern = burstAddressPattern;
  addressPrefix: AddressPrefix.TestNet | AddressPrefix.MainNet;

  constructor(private createService: CreateService,
              private notificationService: NotifierService,
              private networkService: NetworkService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.addressPrefix = this.networkService.isMainNet() ? AddressPrefix.MainNet : AddressPrefix.TestNet;
  }

  public submit(address: string): void {
    this.createService.setAddress(address);
    this.createService.createPassiveAccount().then((success) => {
        this.notificationService.notify('success', `Account added: ${address}`);
        this.createService.reset();
        this.router.navigate(['/']);
      },
      (error) => {
        this.notificationService.notify('error', error.toString());
      });
  }

}
