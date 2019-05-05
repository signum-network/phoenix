import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WarnSendDialogComponent } from './warn-send-dialog.component';

describe('WarnSendDialogComponent', () => {
  let component: WarnSendDialogComponent;
  let fixture: ComponentFixture<WarnSendDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WarnSendDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WarnSendDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
