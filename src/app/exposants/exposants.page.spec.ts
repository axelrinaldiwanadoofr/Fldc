import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExposantsPage } from './exposants.page';

describe('ExposantsPage', () => {
  let component: ExposantsPage;
  let fixture: ComponentFixture<ExposantsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExposantsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExposantsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
