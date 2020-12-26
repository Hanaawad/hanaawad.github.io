import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TumbleComponent } from './tumble.component';

describe('TumbleComponent', () => {
  let component: TumbleComponent;
  let fixture: ComponentFixture<TumbleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TumbleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TumbleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
