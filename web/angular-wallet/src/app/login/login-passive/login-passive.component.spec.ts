import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginPassiveComponent } from './login-passive.component';
import { MockComponent } from 'ng-mocks';
import { CreatePassiveAccountComponent } from 'app/setup/account/create-passive/create-passive.component';

describe('LoginPassiveComponent', () => {
  let component: LoginPassiveComponent;
  let fixture: ComponentFixture<LoginPassiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      declarations: [
        LoginPassiveComponent,
        MockComponent(CreatePassiveAccountComponent)
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
