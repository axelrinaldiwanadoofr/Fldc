import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnigmecinqPage } from './enigmecinq.page';

describe('EnigmecinqPage', () => {
  let component: EnigmecinqPage;
  let fixture: ComponentFixture<EnigmecinqPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnigmecinqPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnigmecinqPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
