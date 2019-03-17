import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAliasComponent } from './add-alias.component';

describe('AddAliasComponent', () => {
  let component: AddAliasComponent;
  let fixture: ComponentFixture<AddAliasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddAliasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAliasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
