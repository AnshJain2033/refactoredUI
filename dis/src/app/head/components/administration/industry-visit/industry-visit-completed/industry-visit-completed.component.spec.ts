import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustryVisitCompletedComponent } from './industry-visit-completed.component';

describe('IndustryVisitCompletedComponent', () => {
  let component: IndustryVisitCompletedComponent;
  let fixture: ComponentFixture<IndustryVisitCompletedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndustryVisitCompletedComponent]
    });
    fixture = TestBed.createComponent(IndustryVisitCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
