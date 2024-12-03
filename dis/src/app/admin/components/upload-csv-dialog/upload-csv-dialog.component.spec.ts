import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCsvDialogComponent } from './upload-csv-dialog.component';

describe('UploadCsvDialogComponent', () => {
  let component: UploadCsvDialogComponent;
  let fixture: ComponentFixture<UploadCsvDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UploadCsvDialogComponent]
    });
    fixture = TestBed.createComponent(UploadCsvDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
