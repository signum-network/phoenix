import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginActiveComponent } from './login-active.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { MockComponent } from 'ng-mocks';
import { CreateActiveAccountComponent } from 'app/setup/account/create-active/create.component';

describe('LoginActiveComponent', () => {
  let component: LoginActiveComponent;
  let fixture: ComponentFixture<LoginActiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      declarations: [
        LoginActiveComponent,
        MockComponent(CreateActiveAccountComponent)
      ],
      providers: [
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
