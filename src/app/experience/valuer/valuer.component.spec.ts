import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValuerComponent } from './valuer.component';

describe('ValuerComponent', () => {
  let component: ValuerComponent;
  let fixture: ComponentFixture<ValuerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValuerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValuerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
