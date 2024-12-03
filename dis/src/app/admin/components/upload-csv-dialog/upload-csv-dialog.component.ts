import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { cloneDeep } from 'lodash';
import { FileService } from 'src/app/services/file.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-upload-csv-dialog',
  templateUrl: './upload-csv-dialog.component.html',
  styleUrls: ['./upload-csv-dialog.component.scss']
})
export class UploadCsvDialogComponent implements OnInit {
  type: string;
  userTypes: string[] = ["head", "admin", "faculty", "staff", "student"];
  userCsv : any;
  constructor(public dialogRef: MatDialogRef<UploadCsvDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private toastService: HotToastService, private spinnerService: SpinnerService, private fileService: FileService){
    this.type = data.type;
  }
  ngOnInit(): void {
    
  }
  fBulkEnrollment:any = this.fb.group({
    userType: ['', [Validators.required]],
    csv: ['', [Validators.required]],
  });

  selectFileInput(event: any){
    console.log(event.target.files);
		this.userCsv=event.target.files[0];
	}

  prepareData(form: any) {
    let obj = cloneDeep(form.getRawValue());

    // Trim strings
    for (let key in obj) {
      obj = {
        ...obj,
        [key]: typeof obj[key] == 'string' ? obj[key].trim() : obj[key],
      };
    }
    return obj;
  }

  uploadCsv(){
    let data = { ...this.prepareData(this.fBulkEnrollment) };
    console.log("this is user type " , data.userType);
    const formData= new FormData();
     console.log(this.userCsv);
    data.csv = this.userCsv;
    console.log(data);
    // formData.append('userType',data.userType);
    formData.append('csv',this.userCsv);
   
    console.log(formData);
    let response: any = { message: '' };
    try {
      response = this.fileService.uploadCsv(data.userType, formData).subscribe({
        next: (res: any) => {
         console.log(res);
         
        },
        error: () => {
          this.toastService.error('Unable to upload csv. Please try again.');
          this.spinnerService.removeSpinner();
        },
        complete: () => {
          this.toastService.success(response.message);
          this.spinnerService.removeSpinner();
          this.dialogRef.close(data);
        },
      }); 
      // if (response) this.toastService.success(response.message);
      // this.spinnerService.removeSpinner();
  
      // this.dialogRef.close(data);
       
    } catch (error) {
      console.log(error)
      this.spinnerService.removeSpinner();
      this.toastService.error('Unable to upload csv. Please try again.');
      return;
    }
    
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
