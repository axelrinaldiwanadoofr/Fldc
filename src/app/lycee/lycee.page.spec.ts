import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LyceePage } from './lycee.page';

describe('LyceePage', () => {
  let component: LyceePage;
  let fixture: ComponentFixture<LyceePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LyceePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LyceePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
