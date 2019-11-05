import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfopratiquePage } from './infopratique.page';

describe('InfopratiquePage', () => {
  let component: InfopratiquePage;
  let fixture: ComponentFixture<InfopratiquePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfopratiquePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfopratiquePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
