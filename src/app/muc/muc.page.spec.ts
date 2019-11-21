import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MucPage } from './muc.page';

describe('MucPage', () => {
  let component: MucPage;
  let fixture: ComponentFixture<MucPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MucPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MucPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
