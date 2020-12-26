import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HobbiesdataComponent } from './hobbiesdata.component';

describe('HobbiesdataComponent', () => {
  let component: HobbiesdataComponent;
  let fixture: ComponentFixture<HobbiesdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HobbiesdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HobbiesdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
