import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAliasComponent } from './add-alias.component';
import { MatFormFieldModule, MatInputModule, MatSortModule, MatTableModule, MatIconModule, MatButtonModule, MatCardModule, MatSelectModule, MatGridListModule, MatCheckboxModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotifierModule } from 'angular-notifier';
import { NgxMaskModule } from 'ngx-mask';
import { I18nModule } from 'app/layout/components/i18n/i18n.module';
import { Ng5SliderModule } from 'ng5-slider';
import { FormsModule } from '@angular/forms';
import { NetworkModule } from 'app/network/network.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BurstInputValidatorDirective } from 'app/main/send-burst/send-burst-validator.directive';
import { BurstFeeSelectorComponent } from 'app/layout/components/burst-fee-selector/burst-fee-selector.component';
import { I18nService } from 'app/layout/components/i18n/i18n.service';
import { StoreService } from 'app/store/store.service';
import { BehaviorSubject } from 'rxjs';
import { TransactionService } from 'app/main/transactions/transaction.service';
import { AccountService } from 'app/setup/account/account.service';
import { ActivatedRoute } from '@angular/router';

describe('AddAliasComponent', () => {
  let component: AddAliasComponent;
  let fixture: ComponentFixture<AddAliasComponent>;

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
          [{path: 'add', component: AddAliasComponent}]
        )
      ],
      declarations: [ AddAliasComponent, BurstInputValidatorDirective, BurstFeeSelectorComponent ],
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
          provide: AccountService,
          useFactory: () => {
            return {
              currentAccount: new BehaviorSubject(true),
              setAlias: () => Promise.resolve({broadcasted:true})
            }
          }
        }, 
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {
                account: { accountRS: '123' },
                fees: { standard: '123' }
              }
            }
          }
        },
        BurstInputValidatorDirective 
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAliasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
