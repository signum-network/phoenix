import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendBurstComponent } from './send-burst.component';

describe('SendBurstComponent', () => {
  let component: SendBurstComponent;
  let fixture: ComponentFixture<SendBurstComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendBurstComponent ]
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
