import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendBurstComponent } from './send-burst.component';
import { NetworkModule } from 'app/network/network.module';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule, MatDialogClose } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
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
import { BurstInputValidatorDirective } from './send-burst-validator.directive';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TransactionService } from '../transactions/transaction.service';
import { AccountService } from 'app/setup/account/account.service';
import { BurstFeeSelectorComponent } from 'app/layout/components/burst-fee-selector/burst-fee-selector.component';
import { BurstRecipientInputComponent } from 'app/layout/components/burst-recipient-input/burst-recipient-input.component';
import { Ng5SliderModule } from 'ng5-slider';
import { SendBurstFormComponent } from './send-burst-form/send-burst-form.component';
import { SendMultiOutFormComponent } from './send-multi-out-form/send-multi-out-form.component';
import {WarnSendDialogComponent} from './warn-send-dialog/warn-send-dialog.component';
import {PageModule} from '../../components/page/page.module';

describe('SendBurstComponent', () => {
  let component: SendBurstComponent;
  let fixture: ComponentFixture<SendBurstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
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
        MatTabsModule,
        MatTooltipModule,
        MatSelectModule,
        Ng5SliderModule,
        MatGridListModule,
        MatCheckboxModule,
        FormsModule,
        NetworkModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(
          [{path: 'send', component: SendBurstComponent}]
        ),
        MatProgressSpinnerModule,
        MatDialogModule,
        PageModule
      ],
      declarations: [
        SendBurstComponent,
        BurstInputValidatorDirective,
        BurstFeeSelectorComponent,
        SendBurstFormComponent,
        SendMultiOutFormComponent,
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
        },
        BurstInputValidatorDirective
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendBurstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
