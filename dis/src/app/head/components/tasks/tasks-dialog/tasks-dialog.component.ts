import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { cloneDeep } from 'lodash';
import { FacultyService } from 'src/app/services/faculty.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-tasks-dialog',
  templateUrl: './tasks-dialog.component.html',
  styleUrls: ['./tasks-dialog.component.scss']
})
export class TasksDialogComponent implements OnInit{
  selectedCategoryId: string = "";
  selectedStaffId: string ="";
  selectedTaskId: string ="";
  searchByStaff: boolean = false;
  searchByTask: boolean = false;
  searchedRecords: boolean = false;
  remId: string ="";
  taskStatus: string = "";
  categoryIdList: any;
  taskList: any;
  type: string = '';
  facultyList: any = [];
  todayDate = new Date();

  assignTaskForm = this.fb.group({
    deadline: ['', [Validators.required]],
    description: ['', [Validators.required]],
    taskId: ['', [Validators.required]],
    categoryId: ['', [Validators.required]],
    userId: ['', [Validators.required]],
  });
  updateTaskForm = this.fb.group({
    deadline: ['', [Validators.required]],
    description: ['', [Validators.required]],
    taskId: ['', [Validators.required]],
    userId: ['', [Validators.required]],
  });

  constructor(public dialogRef: MatDialogRef<TasksDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, 
  private tasksService: TasksService, private facultyService: FacultyService, private toastService: HotToastService, private spinnerService: SpinnerService) {
    this.type = data.type;
  }

  
  ngOnInit(): void {
    this.Init();
  }

  async Init() {
    for (let key in this.fetchData) {
      await this.fetchData[key]();
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  fetchData: any = {
    getFacList: async () => {
      try {
        this.facultyService.getFacultyData().subscribe((Response) => {
          this.facultyList = Response;
          console.log(this.facultyList);
        });
        this.spinnerService.removeSpinner();
      } catch (error) {
        this.toastService.error('Failed');
      }
    },

    getCategoryList: async () => {
      try {
        this.tasksService.getCategoryList().subscribe((Response) => {
          this.categoryIdList = Response;
          console.log(this.categoryIdList);
        });
        this.spinnerService.removeSpinner();
      } catch (error) {
        this.toastService.error('Failed');
      }
    },
  };

  async onClick() {
    const status = 'Progress';
    let data = { ...this.prepareData(this.assignTaskForm), status };
    data.deadline = data.deadline.toLocaleDateString();
    console.log(data);
    let response: any = { message: '' };
    try {
      response = await this.tasksService.assignTask(data);
    } catch (error) {
      this.spinnerService.removeSpinner();
      this.toastService.error('Unable to Add task. Please try again.');
      return;
    }
    if (response) this.toastService.success(response.message);
    this.spinnerService.removeSpinner();

    this.dialogRef.close(data);
  }

  

  prepareData(form: any) {
    let obj = cloneDeep(form.getRawValue());
    console.log(obj);
    
    // Trim strings
    for (let key in obj) {
      obj = {
        ...obj,
        [key]: typeof obj[key] == 'string' ? obj[key].trim() : obj[key],
      };
    }
    return obj;
  }

  async onSelect(event: any) {
    this.selectedCategoryId = event.value;
    console.log(event);
    console.log(this.selectedCategoryId);

    // this.service.getTaskByCategoryId(this.selectedCategoryId).subscribe((response=>this.tasks=response.body));
    try {
      this.tasksService.getTaskByCategory(this.selectedCategoryId).subscribe((Response) => {
        this.taskList = Response;
        console.log(this.taskList);
      });
      this.spinnerService.removeSpinner();
    } catch (e) {
      this.toastService.error('failed');
    }
  }
}
