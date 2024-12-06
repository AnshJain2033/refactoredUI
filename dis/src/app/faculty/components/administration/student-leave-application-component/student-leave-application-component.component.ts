import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { SpinnerService } from 'src/app/services/spinner.service';
import { StudentLeaveService } from 'src/app/services/student-leave.service';
import { StudentLeaveDetailComponent } from '../student-leave-detail/student-leave-detail.component';

@Component({
  selector: 'app-student-leave-aplcation-component',
  templateUrl: './student-leave-application-component.component.html',
  styleUrls: ['./student-leave-application-component.component.scss']
})
export class StudentLeaveAplcationComponentComponent implements OnInit {
  username:any
  leaves:any[]
  
  constructor(private dialog:MatDialog,private dialogRef:MatDialogRef<StudentLeaveDetailComponent>,private leaveService:StudentLeaveService,private toastService:HotToastService,private spinnerService:SpinnerService) {
    this.leaves = new Array() 
   }
  getLeaveFunction():void{
    this.username = sessionStorage.getItem('username')
    this.leaveService.getLeaveByAssignedId(this.username).subscribe({
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
  detailedView(leave:any):void{
    this.dialogRef = this.dialog.open(StudentLeaveDetailComponent,{data:leave})
  }
}
