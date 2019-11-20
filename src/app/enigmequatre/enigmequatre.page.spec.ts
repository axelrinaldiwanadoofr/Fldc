import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnigmequatrePage } from './enigmequatre.page';

describe('EnigmequatrePage', () => {
  let component: EnigmequatrePage;
  let fixture: ComponentFixture<EnigmequatrePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnigmequatrePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnigmequatrePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
