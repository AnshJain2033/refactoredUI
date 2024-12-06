import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustryVisitPendingComponent } from './industry-visit-pending.component';

describe('IndustryVisitPendingComponent', () => {
  let component: IndustryVisitPendingComponent;
  let fixture: ComponentFixture<IndustryVisitPendingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndustryVisitPendingComponent]
    });
    fixture = TestBed.createComponent(IndustryVisitPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
