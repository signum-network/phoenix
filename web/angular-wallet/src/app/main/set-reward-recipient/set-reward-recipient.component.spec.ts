import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetRewardRecipientComponent } from './set-reward-recipient.component';
import { NetworkModule } from 'app/network/network.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { I18nModule } from 'app/layout/components/i18n/i18n.module';
import { NgxMaskModule } from 'ngx-mask';
import { NotifierModule } from 'angular-notifier';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { I18nService } from 'app/layout/components/i18n/i18n.service';
import { StoreService } from 'app/store/store.service';
import { BehaviorSubject } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AccountService } from 'app/setup/account/account.service';
import { BurstFeeSelectorComponent } from 'app/layout/components/burst-fee-selector/burst-fee-selector.component';
import { Ng5SliderModule } from 'ng5-slider';
import { TransactionService } from '../transactions/transaction.service';
import { BurstRecipientInputComponent } from 'app/layout/components/burst-recipient-input/burst-recipient-input.component';
import { MatProgressBarModule } from '@angular/material';
import {AppSharedModule} from '../../shared/shared.module';

describe('SetRewardRecipientComponent', () => {
  let component: SetRewardRecipientComponent;
  let fixture: ComponentFixture<SetRewardRecipientComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AppSharedModule,
        BrowserModule,
        BrowserAnimationsModule,
        NotifierModule,
        NgxMaskModule,
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
        MatProgressBarModule,
        RouterTestingModule.withRoutes(
          [{path: 'set-reward-recipient', component: SetRewardRecipientComponent}]
        ),
        MatTooltipModule
      ],
      declarations: [
        SetRewardRecipientComponent,
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
              getSettings: () => Promise.resolve({language:'en'}),
              saveSettings: () => Promise.resolve(true)
            }
          }
        },
        {
          provide: TransactionService,
          useFactory: () => {
            return {
              sendMoney: () => Promise.resolve({broadcasted:true})
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
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetRewardRecipientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
