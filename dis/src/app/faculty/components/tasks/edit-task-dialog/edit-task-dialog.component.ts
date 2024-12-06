import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { SpinnerService } from 'src/app/services/spinner.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-edit-task-dialog',
  templateUrl: './edit-task-dialog.component.html',
  styleUrls: ['./edit-task-dialog.component.scss']
})
export class EditTaskDialogComponent {

  statusOptions : any = ["In Progress","On Hold","Completed"];
  constructor(public dialogRef: MatDialogRef<EditTaskDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private toastService: HotToastService, private spinnerService: SpinnerService, private taskService: TasksService) {
    console.log(data);
    
    
  }
  updateTaskStatus:any = this.fb.group({
    status: ['', [Validators.required]],
    // file: ['', [Validators.required]],
  });

  editTaskStatus(){
    this.taskService.updateUserTask(this.data.data.id,this.updateTaskStatus.controls['status'].value).subscribe({
      next:(res)=>{
      
          console.log(res);
          
         // this.facultyList = res;
        },
        error: () => {
          this.toastService.error('Failed to update status');
          this.spinnerService.removeSpinner();
        },
        complete: () => {
          this.toastService.success("Status updated successfully!");
          this.spinnerService.removeSpinner();
          this.dialogRef.close();
        },
      });
    
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
