import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnigmeunPage } from './enigmeun.page';

describe('EnigmeunPage', () => {
  let component: EnigmeunPage;
  let fixture: ComponentFixture<EnigmeunPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnigmeunPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnigmeunPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
