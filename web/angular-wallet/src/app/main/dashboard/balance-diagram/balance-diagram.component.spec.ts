import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceDiagramComponent } from './balance-diagram.component';

describe('BalanceDiagramComponent', () => {
  let component: BalanceDiagramComponent;
  let fixture: ComponentFixture<BalanceDiagramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceDiagramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
