import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TransactionRowValueCellComponent } from './transaction-row-value-cell.component';
import { Message } from '@burstjs/core';
import { I18nModule } from 'app/layout/components/i18n/i18n.module';
import { I18nService } from 'app/layout/components/i18n/i18n.service';
import { StoreService } from 'app/store/store.service';
import { BehaviorSubject } from 'rxjs';

describe('TransactionRowValueCellComponent', () => {
  let component: TransactionRowValueCellComponent;
  let fixture: ComponentFixture<TransactionRowValueCellComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ TransactionRowValueCellComponent ],
      imports: [ I18nModule, HttpClientTestingModule ],
      providers: [ I18nService, {
        provide: StoreService,
        useFactory: () => {
          return {
            ready: new BehaviorSubject(true),
            getSettings: () => Promise.resolve({language: 'en'}),
            saveSettings: () => Promise.resolve(true)
          };
        }
      } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionRowValueCellComponent);
    component = fixture.componentInstance;
  });

  test('should create', () => {
    component.value = 'when moon';
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  test('should render unencrypted messages', () => {
    component.value = new Message({
      message: ''
    });
    fixture.detectChanges();
    expect(component.valueType).toBe('Message');
  });
});
