import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FelicitationPage } from './felicitation.page';

describe('FelicitationPage', () => {
  let component: FelicitationPage;
  let fixture: ComponentFixture<FelicitationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FelicitationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FelicitationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
