import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailperformanceComponent } from './emailperformance.component';

describe('EmailperformanceComponent', () => {
  let component: EmailperformanceComponent;
  let fixture: ComponentFixture<EmailperformanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailperformanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailperformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
