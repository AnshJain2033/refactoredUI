import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-upload-csv-dialog',
  templateUrl: './upload-csv-dialog.component.html',
  styleUrls: ['./upload-csv-dialog.component.scss']
})
export class UploadCsvDialogComponent {

  type: string;
  constructor(public dialogRef: MatDialogRef<UploadCsvDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder){
    this.type = data.type;
  }
  uploadCsv:any = this.fb.group({
    type: ['', [Validators.required]],
    file: ['', [Validators.required]],
  });

}
