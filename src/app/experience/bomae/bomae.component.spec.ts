import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BomaeComponent } from './bomae.component';

describe('BomaeComponent', () => {
  let component: BomaeComponent;
  let fixture: ComponentFixture<BomaeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BomaeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BomaeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
