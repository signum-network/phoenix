import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BurstFeeSelectorComponent } from './burst-fee-selector.component';
import { Ng5SliderModule } from 'ng5-slider';

describe('BurstFeeSelectorComponent', () => {
  let component: BurstFeeSelectorComponent;
  let fixture: ComponentFixture<BurstFeeSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        Ng5SliderModule,
      ],
      declarations: [ BurstFeeSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BurstFeeSelectorComponent);
    component = fixture.componentInstance;
    component.fees = {
      cheap: 0.1,
      standard: 0.2,
      priority: 0.3,
      requestProcessingTime: 0.1
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
