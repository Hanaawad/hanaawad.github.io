import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemorixComponent } from './memorix.component';

describe('MemorixComponent', () => {
  let component: MemorixComponent;
  let fixture: ComponentFixture<MemorixComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemorixComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemorixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
