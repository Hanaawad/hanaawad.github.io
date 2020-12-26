import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OboutiqueprojectComponent } from './oboutiqueproject.component';

describe('OboutiqueprojectComponent', () => {
  let component: OboutiqueprojectComponent;
  let fixture: ComponentFixture<OboutiqueprojectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OboutiqueprojectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OboutiqueprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
