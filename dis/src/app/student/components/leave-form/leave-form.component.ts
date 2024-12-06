import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';

import { Toast } from 'bootstrap';
import { SpinnerService } from 'src/app/services/spinner.service';
import { StudentLeaveService } from 'src/app/services/student-leave.service';

@Component({
  selector: 'app-leave-form',
  templateUrl: './leave-form.component.html',
  styleUrls: ['./leave-form.component.scss']
})
export class LeaveFormComponent implements OnInit{
  leaveForm : FormGroup
  username:any
  leaves: any=[]
  // pdfPreviewUrl: string | ArrayBuffer | null = null; // For PDF preview
  // fileName: string = ''; // For storing the uploaded file name
  // selectedFile: any ;
  // formData = new FormData();

constructor(private dialog:MatDialog,private dialogRef:MatDialogRef<LeaveFormComponent>,private leaveService:StudentLeaveService,private fb:FormBuilder,private toastService:HotToastService,@Inject(MAT_DIALOG_DATA) public data: any,private spinnerService:SpinnerService){
  this.leaveForm = this.fb.group({
    startDate: '',
    endDate: '',
    subject: '',
    description: '',
  });
}
ngOnInit(): void {
    this.username = sessionStorage.getItem('username')
    
}
  addLeave(){
    // let formData = new FormData();
    this.username = sessionStorage.getItem('username')
    if (this.leaveForm.valid) {
      let formData = {
        'subject': this.leaveForm.get('subject')?.value,
        'startDate':this.leaveForm.get('startDate')?.value,
        'endDate':this.leaveForm.get('endDate')?.value,
        'description':this.leaveForm.get('description')?.value,
        'studentId':this.username,
      };
      
        // this.formData.append('leaveData', JSON.stringify({
        //   subject: this.leaveForm.get('subject')?.value,
        //   startDate: this.leaveForm.get('startDate')?.value,
        //   endDate: this.leaveForm.get('endDate')?.value,
        //   description: this.leaveForm.get('description')?.value,
        //   studentId: this.username,
        //   // file:this.selectedFile
        // }));


      //  console.log(this.formData.get('leaveData'))
        // console.log(this.selectedFile)
     
      this.leaveService.addLeave(formData).subscribe({
        next:(res)=>{
            console.log(res);
          },
          error: () => {
            this.toastService.error('Failed to Add Leave');
            this.spinnerService.removeSpinner();
          },
          complete: () => {
            this.toastService.success("Leave Added Successfully!");
            this.spinnerService.removeSpinner();
            this.dialogRef.close();
          },
        });
      }
    }


    
    
    closeDialog(){
      this.dialogRef.close();
    }
}

