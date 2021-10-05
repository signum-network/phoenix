import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinedincomeComponent } from './minedincome.component';

describe('MinedincomeComponent', () => {
  let component: MinedincomeComponent;
  let fixture: ComponentFixture<MinedincomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinedincomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinedincomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
