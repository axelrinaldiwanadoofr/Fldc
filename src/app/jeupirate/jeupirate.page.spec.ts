import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JeupiratePage } from './jeupirate.page';

describe('JeupiratePage', () => {
  let component: JeupiratePage;
  let fixture: ComponentFixture<JeupiratePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JeupiratePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JeupiratePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
