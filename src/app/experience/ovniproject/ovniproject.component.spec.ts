import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OvniprojectComponent } from './ovniproject.component';

describe('OvniprojectComponent', () => {
  let component: OvniprojectComponent;
  let fixture: ComponentFixture<OvniprojectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OvniprojectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OvniprojectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
