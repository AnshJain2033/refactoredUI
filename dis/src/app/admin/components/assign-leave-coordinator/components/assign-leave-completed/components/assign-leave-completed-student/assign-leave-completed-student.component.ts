import { Component } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { SpinnerService } from 'src/app/services/spinner.service';
import { StudentLeaveService } from 'src/app/services/student-leave.service';

@Component({
  selector: 'app-assign-leave-completed-student',
  templateUrl: './assign-leave-completed-student.component.html',
  styleUrls: ['./assign-leave-completed-student.component.scss']
})
export class AssignLeaveCompletedStudentComponent {
leaves:any[]
constructor(private leaveService:StudentLeaveService,private toastService:HotToastService,private spinnerService:SpinnerService) {
  this.leaves = new Array() 
 }
 getLeaveFunction():void{
  this.leaves = new Array() 
  this.leaveService.getLastFiveDayLeave().subscribe({
    next:(res)=>{
        this.leaves.push(...res)
        console.log(res);
      },
      error: () => {
        this.toastService.error('Failed to Load Assigned Leave');
        this.spinnerService.removeSpinner();
      },
      complete: () => {
        this.toastService.success("Assigned Leaves Loaded Successfully!");
        this.spinnerService.removeSpinner();
      },
    });
 }
 ngOnInit(): void {
  this.getLeaveFunction()
 }
}
