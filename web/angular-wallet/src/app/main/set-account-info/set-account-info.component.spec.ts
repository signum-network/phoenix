import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetAccountInfoComponent } from './set-account-info.component';
import { NetworkModule } from 'app/network/network.module';
import { MatCheckboxModule, MatGridListModule, MatIconModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatCardModule, MatSelectModule } from '@angular/material';
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

describe('SetAccountInfoComponent', () => {
  let component: SetAccountInfoComponent;
  let fixture: ComponentFixture<SetAccountInfoComponent>;

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
        MatSelectModule,
        Ng5SliderModule,
        MatGridListModule,
        MatCheckboxModule,
        FormsModule,
        NetworkModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(
          [{path: 'set-account-info', component: SetAccountInfoComponent}]
        )
      ],
      declarations: [ SetAccountInfoComponent, BurstFeeSelectorComponent ],
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
    fixture = TestBed.createComponent(SetAccountInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
