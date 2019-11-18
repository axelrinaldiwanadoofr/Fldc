import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuteurPage } from './auteur.page';

describe('AuteurPage', () => {
  let component: AuteurPage;
  let fixture: ComponentFixture<AuteurPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuteurPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuteurPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
