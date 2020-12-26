import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanonComponent } from './danon.component';

describe('DanonComponent', () => {
  let component: DanonComponent;
  let fixture: ComponentFixture<DanonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
