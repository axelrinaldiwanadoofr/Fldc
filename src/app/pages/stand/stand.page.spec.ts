import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StandPage } from './stand.page';

describe('StandPage', () => {
  let component: StandPage;
  let fixture: ComponentFixture<StandPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StandPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
