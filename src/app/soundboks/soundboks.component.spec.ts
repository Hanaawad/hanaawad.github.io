import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundboksComponent } from './soundboks.component';

describe('SoundboksComponent', () => {
  let component: SoundboksComponent;
  let fixture: ComponentFixture<SoundboksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoundboksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoundboksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
