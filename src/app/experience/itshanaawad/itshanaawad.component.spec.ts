import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItshanaawadComponent } from './itshanaawad.component';

describe('ItshanaawadComponent', () => {
  let component: ItshanaawadComponent;
  let fixture: ComponentFixture<ItshanaawadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItshanaawadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItshanaawadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
