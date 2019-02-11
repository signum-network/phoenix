import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionRowValueCellComponent } from './transaction-row-value-cell.component';
import { Message } from '@burstjs/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { I18nModule } from 'app/layout/components/i18n/i18n.module';
import { I18nService } from 'app/layout/components/i18n/i18n.service';

describe('TransactionRowValueCellComponent', () => {
  let component: TransactionRowValueCellComponent;
  let fixture: ComponentFixture<TransactionRowValueCellComponent>;

  beforeEach(async(() => {
    
    TestBed.configureTestingModule({
      declarations: [ TransactionRowValueCellComponent ],
      imports: [ I18nModule, HttpClientTestingModule ],
      providers: [ I18nService ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionRowValueCellComponent);
    component = fixture.componentInstance;
  });

  test('should create', () => {
    component.value = "when moon";
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
