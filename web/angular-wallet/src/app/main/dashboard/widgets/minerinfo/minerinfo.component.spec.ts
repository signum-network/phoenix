import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinerinfoComponent } from './minerinfo.component';

describe('MinerinfoComponent', () => {
  let component: MinerinfoComponent;
  let fixture: ComponentFixture<MinerinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinerinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinerinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
