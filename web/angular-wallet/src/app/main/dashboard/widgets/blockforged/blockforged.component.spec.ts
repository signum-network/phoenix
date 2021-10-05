import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockforgedComponent } from './blockforged.component';

describe('BlockforgedComponent', () => {
  let component: BlockforgedComponent;
  let fixture: ComponentFixture<BlockforgedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockforgedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockforgedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
