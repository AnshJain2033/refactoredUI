import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { StudentLeaveDetailComponent } from '../student-leave-detail/student-leave-detail.component';
import { StudentLeaveService } from 'src/app/services/student-leave.service';
import { HotToastService } from '@ngneat/hot-toast';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-student-leave-application',
  templateUrl: './student-leave-application.component.html',
  styleUrls: ['./student-leave-application.component.scss']
})
export class StudentLeaveApplicationComponent implements OnInit {
  username:any
  leaves:any[]
  
  constructor(private dialog:MatDialog,private dialogRef:MatDialogRef<StudentLeaveDetailComponent>,private leaveService:StudentLeaveService,private toastService:HotToastService,private spinnerService:SpinnerService) {
    this.leaves = new Array() 
   }
  getLeaveFunction():void{
    this.leaves = new Array()
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
    const dialogRef = this.dialog.open(StudentLeaveDetailComponent,{ 
      data:leave,
      disableClose:true
    }).afterClosed().subscribe(()=>this.getLeaveFunction())
  }
}
