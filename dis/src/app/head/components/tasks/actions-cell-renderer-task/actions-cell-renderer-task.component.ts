import { Component } from '@angular/core';
import { HotToastService } from '@ngneat/hot-toast';
import { SpinnerService } from 'src/app/services/spinner.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-actions-cell-renderer-task',
  templateUrl: './actions-cell-renderer-task.component.html',
  styleUrls: ['./actions-cell-renderer-task.component.scss']
})
export class ActionsCellRendererTaskComponent {
  params: any;
  data: any;
  onEdit: any;

  constructor(private tasksService: TasksService,private toastService: HotToastService, private spinnerService: SpinnerService){

  }

  agInit(params: any): void {
    this.params = params;
    this.data = params.value;
    this.onEdit = this.params.onEdit;
  }

  // onEditClick(): void {
  //   // Implement edit logic here
  //   console.log('edit');
  // }
  onEditClick(event: any) {
    console.log(event);
    this.onEdit(this.params.data);
    try {
      

    } catch (e) {
      console.log(e);
    }
  }

  onDeleteClick(): void {
    // Implement delete logic here
    console.log('deleted');
    console.log(this.params.data["id"]);
    let taskId =this.params.data["id"]
    this.tasksService.deleteTask(taskId).subscribe({
      next: (result: any) => {
        this.toastService.success(result.message);
        this.spinnerService.removeSpinner();
        window.location.reload();
      },
      error: (error) => {
        console.log(error);
        this.toastService.error('Failed to delete panel');
        this.spinnerService.removeSpinner();
      }
    });
  }

}
