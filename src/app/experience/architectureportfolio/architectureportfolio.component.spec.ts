import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchitectureportfolioComponent } from './architectureportfolio.component';

describe('ArchitectureportfolioComponent', () => {
  let component: ArchitectureportfolioComponent;
  let fixture: ComponentFixture<ArchitectureportfolioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchitectureportfolioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchitectureportfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
