import { AfterViewInit, Component, Injectable, OnInit } from '@angular/core';
import {CreateService} from '../create.service';
import {NotifierService} from 'angular-notifier';
import {Router} from '@angular/router';
import {AddressPattern} from 'app/util/addressPattern';
import {NetworkService} from '../../../network/network.service';
import { UnsubscribeOnDestroy } from 'app/util/UnsubscribeOnDestroy';
import { StoreService } from 'app/store/store.service';
import { I18nService } from '../../../layout/components/i18n/i18n.service';

@Injectable()
@Component({
  selector: 'app-create-passive',
  templateUrl: './create-passive.component.html',
  styleUrls: ['./create-passive.component.scss']
})
export class CreatePassiveAccountComponent extends UnsubscribeOnDestroy implements OnInit {

  address = '';

  signumAddressPattern = AddressPattern;
  addressPrefix: string;

  constructor(private createService: CreateService,
              private storeService: StoreService,
              private notificationService: NotifierService,
              private i18nService: I18nService,
              private networkService: NetworkService,
              private router: Router) {
    super();
  }

  public async submit(): Promise<void> {
    try{
      await this.createService.createWatchOnlyAccount(`${this.addressPrefix}-${this.address}`);
      this.notificationService.notify('success', this.i18nService.getTranslation('account_added'));
      this.createService.reset();
      await this.router.navigate(['/']);
    }catch (e){
      this.notificationService.notify('error', e.message);
    }
  }

  ngOnInit(): void {
    this.addressPrefix = this.storeService.getSettings().addressPrefix;
  }

}
