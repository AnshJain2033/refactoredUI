import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { StudentLeaveService } from 'src/app/services/student-leave.service';

@Component({
  selector: 'app-student-leave-detail',
  templateUrl: './student-leave-detail.component.html',
  styleUrls: ['./student-leave-detail.component.scss']
})
export class StudentLeaveDetailComponent{
    leaveDetail:any
    constructor(private dialog:MatDialog,private dialogRef:MatDialogRef<StudentLeaveDetailComponent>,private toastService:HotToastService,@Inject(MAT_DIALOG_DATA)public leave:any,private leaveService:StudentLeaveService){
      this.leaveDetail=leave
    }
    onAccept(leaveId:any):void{
      this.leaveService.putLeaveStatusByLeaveId(leaveId,"ACCEPTED").subscribe({
        next:(res)=>{
          console.log(res)
        },
        complete:()=>{
          this.toastService.success("Status Updated Successfully")
        }
      })
      this.dialogRef.close();
    }

     onReject(leaveId:any):void{
       this.leaveService.putLeaveStatusByLeaveId(leaveId,"REJECTED").subscribe({
        next:(res)=>{
          console.log(res) 
        },
        complete:()=>{
          this.toastService.success("Status Updated Successfully")
        }
      })
      this.dialogRef.close();
    }
    closeDialog(){
      this.dialogRef.close();
    }
}
