import { ChangeDetectorRef, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HotToastComponent } from '@ngneat/hot-toast/lib/components/hot-toast/hot-toast.component';
import { StudentLeaveService } from 'src/app/services/student-leave.service';
import { LeaveFormComponent } from '../leave-form/leave-form.component';
import { Toast } from 'bootstrap';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable } from 'rxjs';
import { SpinnerService } from 'src/app/services/spinner.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-leave',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss']
})
export class LeaveComponent implements OnInit{
  username:any
  leaves:any[]
  
  
  constructor(private dialog:MatDialog,private leaveService: StudentLeaveService,private toastService: HotToastService,private fb:FormBuilder,private spinnerService:SpinnerService,private dialogRef:MatDialogRef<LeaveFormComponent>) {
    this.leaves = new Array() 
   }


   getLeaveFunction():void{
    this.username = sessionStorage.getItem('username')
    this.leaveService.getLeaveByStudentId(this.username).subscribe({
      next:(res)=>{
          this.leaves.push(...res)
          console.log(res);
        },
        error: () => {
          this.toastService.error('Failed to Existing Load Leave');
          this.spinnerService.removeSpinner();
        },
        complete: () => {
          this.toastService.success("Existing Leaves Loaded Successfully!");
          this.spinnerService.removeSpinner();
        },
      });
    
   }
  ngOnInit(): void {
    this.getLeaveFunction()
  }

  addLeave(){
    this.dialogRef = this.dialog.open(LeaveFormComponent)
  }
  async deleteLeave(leaveId:any){
    await this.leaveService.deleteLeaveByLeaveId(leaveId).subscribe({
      error:()=>{
        this.toastService.success("Leave Deleted Successfully!");
        this.spinnerService.removeSpinner();
      } , 
      });
  }
  async onFileSelected(event: Event,leaveId:any){
    let selectedFile: any = null
    const fileInput = event.target as HTMLInputElement;
    if (fileInput?.files && fileInput.files.length > 0) {
      selectedFile = fileInput.files[0];
      console.log("File selected:", selectedFile);
      const formdata = new FormData()
      formdata.append('file',selectedFile)
      console.log(leaveId)
      await this.leaveService.addLeaveSupportingDocument(leaveId,formdata).subscribe({
        error:()=>{
          this.toastService.success("Document Added Successfully!");
          this.spinnerService.removeSpinner();
        } , 
        });
    }
  }
}
