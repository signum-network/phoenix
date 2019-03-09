import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestBurstQrComponent } from './request-burst-qr.component';

describe('RequestBurstQrComponent', () => {
  let component: RequestBurstQrComponent;
  let fixture: ComponentFixture<RequestBurstQrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestBurstQrComponent ]
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
