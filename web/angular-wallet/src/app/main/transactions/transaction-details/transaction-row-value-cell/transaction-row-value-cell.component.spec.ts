import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {TransactionRowValueCellComponent} from './transaction-row-value-cell.component';
import {EncryptedMessage, Message} from '@burstjs/core';
import {I18nModule} from 'app/layout/components/i18n/i18n.module';
import {I18nService} from 'app/layout/components/i18n/i18n.service';
import {StoreService} from 'app/store/store.service';
import {BehaviorSubject} from 'rxjs';
import {RouterTestingModule} from '@angular/router/testing';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CellValue, CellValueType} from '../cell-value-mapper';

describe('TransactionRowValueCellComponent', () => {
  let component: TransactionRowValueCellComponent;
  let fixture: ComponentFixture<TransactionRowValueCellComponent>;

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ TransactionRowValueCellComponent ],
      imports: [ I18nModule, FormsModule, BrowserAnimationsModule, HttpClientTestingModule, RouterTestingModule, MatInputModule, MatButtonModule, MatIconModule ],
      providers: [ I18nService, {
        provide: StoreService,
        useFactory: () => {
          return {
            ready: new BehaviorSubject(true),
            getSettings: () => Promise.resolve({language: 'en'}),
            saveSettings: () => Promise.resolve(true),
            settings: new BehaviorSubject({})
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
    component.value = new CellValue('when moon');
    component.senderPublicKeyHex = '1';
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  test('should render unencrypted messages', () => {
    component.value = new CellValue(
      new Message({
        message: 'test'
      }),
      CellValueType.Message
    );
    component.senderPublicKeyHex = '1';
    fixture.detectChanges();
    expect(component.valueType).toBe(CellValueType.Message);
  });

  test('should render encrypted messages', () => {
    component.value = new CellValue(
      new EncryptedMessage({
        message: 'test'
      }),
      CellValueType.EncryptedMessage
    );
    component.senderPublicKeyHex = '1';
    fixture.detectChanges();
    expect(component.valueType).toBe(CellValueType.EncryptedMessage);
  });
});
