import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivresPage } from './livres.page';

describe('LivresPage', () => {
  let component: LivresPage;
  let fixture: ComponentFixture<LivresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivresPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
