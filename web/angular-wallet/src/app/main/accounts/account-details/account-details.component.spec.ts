import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSortModule, MatTableModule, MatPaginatorModule, MatTabsModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { I18nModule } from 'app/layout/components/i18n/i18n.module';
import { BehaviorSubject } from 'rxjs';
import { StoreService } from 'app/store/store.service';
import { I18nService } from 'app/layout/components/i18n/i18n.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AccountDetailsComponent } from './account-details.component';
import { NetworkService } from 'app/network/network.service';
import { TimeAgoPipe } from 'time-ago-pipe';
import { NotifierModule } from 'angular-notifier';
import { FuseSharedModule } from '@fuse/shared.module';
import { TransactionRowValueCellComponent } from 'app/main/transactions/transaction-row-value-cell/transaction-row-value-cell.component';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { AccountService } from 'app/setup/account/account.service';
import { TransactionTableModule } from 'app/main/transactions/transaction-table/transaction.module';

// todo: use shallow for this
xdescribe('AccountDetailsComponent', () => {
  let component: AccountDetailsComponent;
  let fixture: ComponentFixture<AccountDetailsComponent>;
  let activatedRoute: ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatInputModule,
        MatSortModule,
        MatTableModule,
        MatIconModule,
        MatButtonModule,
        MatPaginatorModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        I18nModule,
        MatTabsModule,
        BrowserAnimationsModule,
        NotifierModule,
        TransactionTableModule,
        RouterTestingModule.withRoutes(
          [{ path: 'account/123', component: AccountDetailsComponent }]
        )
      ],
      providers: [
        TimeAgoPipe,
        I18nService,
        {
          provide: StoreService,
          useFactory: () => {
            return {
              ready: new BehaviorSubject(true),
              getSettings: () => Promise.resolve({ language: 'en' }),
              saveSettings: () => Promise.resolve(true)
            };
          }
        },
        {
          provide: AccountService,
          useFactory: () => {
            return {
              getAccount: () => Promise.resolve({ account: { account: '123' } }),
              getAccountTransactions: () => Promise.resolve({ transactions: [] })
            }
          }
        },
        {
          provide: ActivatedRoute, useValue: {
            snapshot: {
              data: {
                account: '123',
                transactions: '123'
              }
            }
          }
        }],
      declarations: [AccountDetailsComponent, TimeAgoPipe, TransactionRowValueCellComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
