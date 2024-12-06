import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustryVisitComponent } from './industry-visit.component';

describe('IndustryVisitComponent', () => {
  let component: IndustryVisitComponent;
  let fixture: ComponentFixture<IndustryVisitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndustryVisitComponent]
    });
    fixture = TestBed.createComponent(IndustryVisitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
