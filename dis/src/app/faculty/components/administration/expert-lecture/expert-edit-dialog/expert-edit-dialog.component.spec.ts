import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertEditDialogComponent } from './expert-edit-dialog.component';

describe('ExpertEditDialogComponent', () => {
  let component: ExpertEditDialogComponent;
  let fixture: ComponentFixture<ExpertEditDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpertEditDialogComponent]
    });
    fixture = TestBed.createComponent(ExpertEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
