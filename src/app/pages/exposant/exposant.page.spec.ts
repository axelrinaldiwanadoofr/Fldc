import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExposantPage } from './exposant.page';

describe('ExposantPage', () => {
  let component: ExposantPage;
  let fixture: ComponentFixture<ExposantPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExposantPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExposantPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
