import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {NetworkModule} from 'app/network/network.module';
import {
  MatCheckboxModule,
  MatGridListModule,
  MatIconModule,
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatCardModule,
  MatSelectModule,
  MatProgressSpinnerModule, MatTooltipModule
} from '@angular/material';
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


import {SendBurstFormComponent} from './send-burst-form.component';
import {BurstInputValidatorDirective} from '../send-burst-validator.directive';
import {TransactionService} from 'app/main/transactions/transaction.service';
import {AccountService} from 'app/setup/account/account.service';
import {Account} from '@burstjs/core';

describe('SendBurstFormComponent', () => {
  let component: SendBurstFormComponent;
  let fixture: ComponentFixture<SendBurstFormComponent>;

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
        MatTooltipModule,
        MatFormFieldModule,
        MatCardModule,
        MatSelectModule,
        Ng5SliderModule,
        MatGridListModule,
        MatCheckboxModule,
        FormsModule,
        NetworkModule,
        HttpClientTestingModule,
        MatProgressSpinnerModule
      ],
      declarations: [
        SendBurstFormComponent,
        BurstInputValidatorDirective,
        BurstFeeSelectorComponent,
        BurstRecipientInputComponent
      ],
      providers: [
        I18nService,
        {
          provide: StoreService,
          useFactory: () => {
            return {
              ready: new BehaviorSubject(true),
              getSettings: () => Promise.resolve({language: 'en'}),
              saveSettings: () => Promise.resolve(true)
            };
          }
        },
        {
          provide: TransactionService,
          useFactory: () => {
            return {
              sendMoney: () => Promise.resolve({broadcasted: true})
            };
          }
        },
        {
          provide: AccountService,
          useFactory: () => {
            return {
              currentAccount: new BehaviorSubject(true)
            };
          }
        },
        BurstInputValidatorDirective
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendBurstFormComponent);
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
