import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginActiveComponent } from './login-active.component';
import { ActivatedRoute } from '@angular/router';
import { of, BehaviorSubject } from 'rxjs';
import { MockComponent } from 'ng-mocks';
import { CreateActiveAccountComponent } from 'app/setup/account/create-active/create.component';
import { I18nModule } from 'app/layout/components/i18n/i18n.module';
import { StoreService } from 'app/store/store.service';
import { I18nService } from 'app/layout/components/i18n/i18n.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('LoginActiveComponent', () => {
  let component: LoginActiveComponent;
  let fixture: ComponentFixture<LoginActiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([]),
        I18nModule
      ],
      declarations: [
        LoginActiveComponent,
        MockComponent(CreateActiveAccountComponent)
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
        },
        {
          provide: ActivatedRoute,
          useValue: {
            queryParamMap: of({newUser: {}})
          }
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
