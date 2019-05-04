import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BurstRecipientInputComponent } from './recipient-input.component';
import {Ng5SliderModule} from 'ng5-slider';
import {MatIconModule, MatTooltipModule} from '@angular/material';
import {I18nModule} from '../i18n/i18n.module';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BurstFeeSelectorComponent} from '../burst-fee-selector/burst-fee-selector.component';
import {I18nService} from '../i18n/i18n.service';
import {StoreService} from '../../../store/store.service';
import {BehaviorSubject} from 'rxjs';
import {TransactionService} from '../../../main/transactions/transaction.service';
import {AccountService} from '../../../setup/account/account.service';
import {BurstInputValidatorDirective} from '../../../main/send-burst/send-burst-validator.directive';
import {FeeQuantNQT} from '@burstjs/core';

describe('RecipientInputComponent', () => {
  let component: BurstRecipientInputComponent;
  let fixture: ComponentFixture<BurstRecipientInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        Ng5SliderModule,
        MatTooltipModule,
        MatIconModule,
        I18nModule,
        HttpClientTestingModule
      ],
      declarations: [ BurstFeeSelectorComponent ],
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
    fixture = TestBed.createComponent(BurstFeeSelectorComponent);
    component = fixture.componentInstance;
    component.fees = {
      minimum: FeeQuantNQT,
      cheap: 0.1,
      standard: 0.2,
      priority: 0.3,
      requestProcessingTime: 0.1
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
