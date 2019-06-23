import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NetworkModule} from 'app/network/network.module';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import {I18nModule} from 'app/layout/components/i18n/i18n.module';
import {NgxMaskModule} from 'ngx-mask';
import {NotifierModule} from 'angular-notifier';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {I18nService} from 'app/layout/components/i18n/i18n.service';
import {StoreService} from 'app/store/store.service';
import {BehaviorSubject} from 'rxjs';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {FormsModule} from '@angular/forms';
import {BurstFeeSelectorComponent} from 'app/layout/components/burst-fee-selector/burst-fee-selector.component';
import {BurstRecipientInputComponent} from 'app/layout/components/burst-recipient-input/burst-recipient-input.component';
import {Ng5SliderModule} from 'ng5-slider';


import {SendMultiOutFormComponent} from './send-multi-out-form.component';
import {BurstInputValidatorDirective} from '../send-burst-validator.directive';
import {TransactionService} from 'app/main/transactions/transaction.service';
import {AccountService} from 'app/setup/account/account.service';
import {Account} from '@burstjs/core';
import {WarnSendDialogComponent} from '../warn-send-dialog/warn-send-dialog.component';

describe('SendMultiOutFormComponent', () => {

  describe('Render Testing', () => {


    let component: SendMultiOutFormComponent;
    let fixture: ComponentFixture<SendMultiOutFormComponent>;

    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          BrowserModule,
          BrowserAnimationsModule,
          NotifierModule,
          NgxMaskModule.forRoot(),
          I18nModule,
          MatInputModule,
          MatButtonModule,
          MatIconModule,
          MatFormFieldModule,
          MatCardModule,
          MatSelectModule,
          Ng5SliderModule,
          MatGridListModule,
          MatCheckboxModule,
          FormsModule,
          NetworkModule,
          HttpClientTestingModule,
          MatProgressSpinnerModule,
          MatTooltipModule,
          MatDialogModule
        ],
        declarations: [
          SendMultiOutFormComponent,
          BurstInputValidatorDirective,
          BurstFeeSelectorComponent,
          BurstRecipientInputComponent,
          WarnSendDialogComponent
        ],
        providers: [
          I18nService,
          {
            provide: StoreService,
            useFactory: () => {
              return {
                ready: new BehaviorSubject(true),
                settings: new BehaviorSubject(true)
              }
            }
          },
          {
            provide: TransactionService,
            useFactory: () => {
              return {
                sendMoney: () => Promise.resolve({broadcasted: true})
              }
            }
          },
          {
            provide: AccountService,
            useFactory: () => {
              return {
                currentAccount: new BehaviorSubject(true)
              }
            }
          },
          BurstInputValidatorDirective
        ]
      })
        .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(SendMultiOutFormComponent);
      component = fixture.componentInstance;
      component.fees = {
        minimum: 123,
        standard: 123,
        cheap: 123,
        priority: 123,
        requestProcessingTime: 1
      };
      component.account = new Account({
        account: '123'
      });
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Inner Functions', () => {
    const storeServiceMock =  {
      ready: new BehaviorSubject(true),
      settings: new BehaviorSubject(true)
    };

    const component = new SendMultiOutFormComponent(
      null,
      null,
      null,
      null,
      storeServiceMock);

    it('should calculate same amount correctly', () => {
      component.sameAmount = true;
      // @ts-ignore
      component.recipients = [{addressRaw: '1'}, {addressRaw: '2'}];
      component.amountNQT = '1000';
      component.feeNQT = '10';
      expect(component.getTotal()).toBe(2010);
    });
  });
});
