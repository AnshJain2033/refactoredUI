import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpertDialogComponent } from './expert-dialog.component';

describe('ExpertDialogComponent', () => {
  let component: ExpertDialogComponent;
  let fixture: ComponentFixture<ExpertDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpertDialogComponent]
    });
    fixture = TestBed.createComponent(ExpertDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
