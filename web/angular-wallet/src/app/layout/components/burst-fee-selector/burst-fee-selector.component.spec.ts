import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BurstFeeSelectorComponent } from './burst-fee-selector.component';

describe('BurstFeeSelectorComponent', () => {
  let component: BurstFeeSelectorComponent;
  let fixture: ComponentFixture<BurstFeeSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BurstFeeSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BurstFeeSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
