import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Theme2019Page } from './theme2019.page';

describe('Theme2019Page', () => {
  let component: Theme2019Page;
  let fixture: ComponentFixture<Theme2019Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Theme2019Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Theme2019Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
