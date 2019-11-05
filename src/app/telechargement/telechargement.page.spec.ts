import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelechargementPage } from './telechargement.page';

describe('TelechargementPage', () => {
  let component: TelechargementPage;
  let fixture: ComponentFixture<TelechargementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelechargementPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelechargementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
