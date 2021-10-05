import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockrewardComponent } from './blockreward.component';

describe('BlockrewardComponent', () => {
  let component: BlockrewardComponent;
  let fixture: ComponentFixture<BlockrewardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockrewardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockrewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
