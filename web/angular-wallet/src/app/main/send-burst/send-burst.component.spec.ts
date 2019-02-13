import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendBurstComponent } from './send-burst.component';
import { NetworkModule } from 'app/network/network.module';
import { MatCheckboxModule, MatGridListModule, MatIconModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatCardModule, MatSelectModule } from '@angular/material';
import { I18nModule } from 'app/layout/components/i18n/i18n.module';
import { NgxMaskModule } from 'ngx-mask';
import { NotifierModule } from 'angular-notifier';
import { SetupModule } from 'app/setup/setup.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { I18nService } from 'app/layout/components/i18n/i18n.service';
import { StoreService } from 'app/store/store.service';
import { BehaviorSubject } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BurstInputValidatorDirective } from './send-burst-validator.directive';

xdescribe('SendBurstComponent', () => {
  let component: SendBurstComponent;
  let fixture: ComponentFixture<SendBurstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        BrowserAnimationsModule,
        SetupModule,
        NotifierModule,
        NgxMaskModule,
        I18nModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatSelectModule,
        MatGridListModule,
        MatCheckboxModule,
        NetworkModule,
        HttpClientTestingModule
      ],
      declarations: [ SendBurstComponent, BurstInputValidatorDirective ],
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
