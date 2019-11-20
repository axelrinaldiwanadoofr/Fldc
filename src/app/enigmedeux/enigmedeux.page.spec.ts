import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnigmedeuxPage } from './enigmedeux.page';

describe('EnigmedeuxPage', () => {
  let component: EnigmedeuxPage;
  let fixture: ComponentFixture<EnigmedeuxPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnigmedeuxPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnigmedeuxPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
