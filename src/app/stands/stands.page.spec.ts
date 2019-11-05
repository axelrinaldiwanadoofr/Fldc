import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandsPage } from './stands.page';

describe('StandsPage', () => {
  let component: StandsPage;
  let fixture: ComponentFixture<StandsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
