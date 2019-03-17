import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendMultiOutFormComponent } from './send-multi-out-form.component';

describe('SendMultiOutFormComponent', () => {
  let component: SendMultiOutFormComponent;
  let fixture: ComponentFixture<SendMultiOutFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendMultiOutFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendMultiOutFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
