import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PiegePage } from './piege.page';

describe('PiegePage', () => {
  let component: PiegePage;
  let fixture: ComponentFixture<PiegePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PiegePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PiegePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
