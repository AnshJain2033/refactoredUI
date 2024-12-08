import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { FacultyService } from 'src/app/services/faculty.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { StudentLeaveService } from 'src/app/services/student-leave.service';
import { StudentService } from 'src/app/services/student.service';

@Component({
  selector: 'app-assign-leave-pending-student',
  templateUrl: './assign-leave-pending-student.component.html',
  styleUrls: ['./assign-leave-pending-student.component.scss']
})
export class AssignLeavePendingStudentComponent implements OnInit{
  leaves:any[]
  facultyList: any[] = [];
  formControls: FormControl[] = [];
  constructor(private leaveService:StudentLeaveService,private toastService:HotToastService,private spinnerService:SpinnerService,private facultyService: FacultyService,private studentService: StudentLeaveService) {
    this.leaves = new Array() 
   }
   getAllLeaveFunction():void{
    this.leaves = new Array() 
    this.leaveService.getLeaveWhichArePendingToBeAssigned().subscribe({
      next:(res)=>{
          this.leaves.push(...res)
          console.log(res);
        },
        error: () => {
          this.toastService.error('Failed to Load Leave');
          this.spinnerService.removeSpinner();
        },
        complete: () => {
          this.toastService.success("Existing Leaves Loaded Successfully!");
          this.initializeFormControls();
          this.spinnerService.removeSpinner();
        },
      });
    
   }
   
    async getFacultyData(){
      try {
        this.facultyService.getFacultyData().subscribe((Response) => {
          this.facultyList = Response;
          console.log(this.facultyList);
        });
        this.spinnerService.removeSpinner();
      } catch (error) {
        this.toastService.error('Failed');
      }
  }
  async setAssignedCoordinator(id:any,assignedTo:any){
    console.log(assignedTo)
      this.studentService.putAssignedToByLeaveId(id,assignedTo).subscribe({
        next:(res)=>{
            console.log(res);
          },
          error: () => {
            this.toastService.error('Failed to Send Request');
            this.spinnerService.removeSpinner();
          },
          complete: () => {
            this.toastService.success("Request Sent Successfully!");
            this.spinnerService.removeSpinner();
            this.getAllLeaveFunction()
          },
        });
    }
   ngOnInit(): void {
    this.getAllLeaveFunction()
    this.getFacultyData()

  }
  initializeFormControls(): void {
    this.formControls = this.leaves.map(() => new FormControl());
  }

}
