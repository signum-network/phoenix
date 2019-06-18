import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { I18nModule } from 'app/layout/components/i18n/i18n.module';
import { BehaviorSubject } from 'rxjs';
import { StoreService } from 'app/store/store.service';
import { I18nService } from 'app/layout/components/i18n/i18n.service';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BlockDetailsComponent } from './block-details.component';
import { NetworkService } from 'app/network/network.service';
import { TimeAgoPipe } from 'time-ago-pipe';
import { NotifierModule } from 'angular-notifier';
import { FuseSharedModule } from '@fuse/shared.module';
import { TransactionRowValueCellComponent } from 'app/main/transactions/transaction-details/transaction-row-value-cell/transaction-row-value-cell.component';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';

describe('BlockDetailsComponent', () => {
  let component: BlockDetailsComponent;
  let fixture: ComponentFixture<BlockDetailsComponent>;
  let activatedRoute: ActivatedRoute;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
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
        BrowserAnimationsModule,
        NotifierModule,
        RouterTestingModule.withRoutes(
          [{path: 'block/123', component: BlockDetailsComponent}]
        )
      ],
      providers: [ TimeAgoPipe, I18nService, {
        provide: StoreService,
        useFactory: () => {
          return {
            ready: new BehaviorSubject(true),
            getSettings: () => Promise.resolve({language: 'en'}),
            saveSettings: () => Promise.resolve(true),
            settings: new BehaviorSubject({})
          };
        }
      },
      {
        provide: NetworkService,
        useFactory: () => {
          return {
            getBlockById: () => Promise.resolve({block: {block: '123'}})
          }
        }
      },
      {provide: ActivatedRoute, useValue: {
          snapshot: {
            data: {
              block: '123'
            }
          }
      } }],
      declarations: [ BlockDetailsComponent, TimeAgoPipe, TransactionRowValueCellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockDetailsComponent);
    component = fixture.componentInstance;
    activatedRoute = fixture.debugElement.injector.get(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
