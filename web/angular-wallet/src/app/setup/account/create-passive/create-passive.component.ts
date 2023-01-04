import {Component, Injectable, OnInit} from '@angular/core';
import {CreateService} from '../create.service';
import {NotifierService} from 'angular-notifier';
import {Router} from '@angular/router';
import {AddressPattern} from 'app/util/addressPattern';
import {NetworkService} from '../../../network/network.service';

@Injectable()
@Component({
  selector: 'app-create-passive',
  templateUrl: './create-passive.component.html',
  styleUrls: ['./create-passive.component.scss']
})
export class CreatePassiveAccountComponent implements OnInit {

  address = '';

  signumAddressPattern = AddressPattern;
  addressPrefix: string;

  constructor(private createService: CreateService,
              private notificationService: NotifierService,
              private networkService: NetworkService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.networkService.networkInfo$.subscribe(() => {
      this.addressPrefix = this.networkService.getAddressPrefix()
    })
  }

  public submit(): void {
    this.createService.createPassiveAccount(`${this.addressPrefix}-${this.address}`).then((success) => {
        this.notificationService.notify('success', `Account added: ${this.address}`);
        this.createService.reset();
        this.router.navigate(['/']);
      },
      (error) => {
        this.notificationService.notify('error', error.toString());
      });
  }

}
