import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustryVisitEditDialogComponent } from './industry-visit-edit-dialog.component';

describe('IndustryVisitEditDialogComponent', () => {
  let component: IndustryVisitEditDialogComponent;
  let fixture: ComponentFixture<IndustryVisitEditDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndustryVisitEditDialogComponent]
    });
    fixture = TestBed.createComponent(IndustryVisitEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
