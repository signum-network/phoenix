import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockheightComponent } from './blockheight.component';

describe('BlockheightComponent', () => {
  let component: BlockheightComponent;
  let fixture: ComponentFixture<BlockheightComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockheightComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockheightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
