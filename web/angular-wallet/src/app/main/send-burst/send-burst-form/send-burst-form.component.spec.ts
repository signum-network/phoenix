import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendBurstFormComponent } from './send-burst-form.component';

describe('SendBurstFormComponent', () => {
  let component: SendBurstFormComponent;
  let fixture: ComponentFixture<SendBurstFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendBurstFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendBurstFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
