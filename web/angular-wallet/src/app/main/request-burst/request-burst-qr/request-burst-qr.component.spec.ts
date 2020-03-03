import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RequestBurstQrComponent} from './request-burst-qr.component';
import {I18nModule} from 'app/layout/components/i18n/i18n.module';
import {I18nService} from "../../../layout/components/i18n/i18n.service";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {StoreService} from "../../../store/store.service";
import {BehaviorSubject} from "rxjs";
import {AppSharedModule} from '../../../shared/shared.module';

describe('RequestBurstQrComponent', () => {
  let component: RequestBurstQrComponent;
  let fixture: ComponentFixture<RequestBurstQrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nModule, HttpClientTestingModule, AppSharedModule],
      declarations: [RequestBurstQrComponent],
      providers: [I18nService,
        {
          provide: StoreService,
          useFactory: () => {
            return {
              ready: new BehaviorSubject(true),
              getSettings: () => Promise.resolve({language: 'en'}),
              saveSettings: () => Promise.resolve(true)
            }
          }
        },

      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestBurstQrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
