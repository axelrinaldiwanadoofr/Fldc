import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeLivreComponent } from './liste-livre.component';

describe('ListeLivreComponent', () => {
  let component: ListeLivreComponent;
  let fixture: ComponentFixture<ListeLivreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListeLivreComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeLivreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
