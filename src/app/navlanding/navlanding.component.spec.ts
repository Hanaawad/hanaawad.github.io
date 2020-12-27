import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavlandingComponent } from './navlanding.component';

describe('NavlandingComponent', () => {
  let component: NavlandingComponent;
  let fixture: ComponentFixture<NavlandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavlandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavlandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
