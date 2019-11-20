import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivrePage } from './livre.page';

describe('LivrePage', () => {
  let component: LivrePage;
  let fixture: ComponentFixture<LivrePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivrePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivrePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
