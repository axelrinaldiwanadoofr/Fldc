import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnigmetroisPage } from './enigmetrois.page';

describe('EnigmetroisPage', () => {
  let component: EnigmetroisPage;
  let fixture: ComponentFixture<EnigmetroisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnigmetroisPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnigmetroisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
