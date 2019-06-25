import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginPassiveComponent } from './login-passive.component';
import { MockComponent } from 'ng-mocks';
import { CreatePassiveAccountComponent } from 'app/setup/account/create-passive/create-passive.component';
import { BehaviorSubject } from 'rxjs';
import { StoreService } from 'app/store/store.service';
import { I18nService } from 'app/layout/components/i18n/i18n.service';
import { I18nModule } from 'app/layout/components/i18n/i18n.module';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginLedgerComponent', () => {
  let component: LoginPassiveComponent;
  let fixture: ComponentFixture<LoginPassiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        I18nModule
      ],
      declarations: [
        LoginPassiveComponent,
        MockComponent(CreatePassiveAccountComponent)
      ],
      providers: [
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
        }
      ]})
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPassiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
