import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPassiveComponent } from './login-passive.component';

describe('LoginPassiveComponent', () => {
  let component: LoginPassiveComponent;
  let fixture: ComponentFixture<LoginPassiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPassiveComponent ]
    })
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
