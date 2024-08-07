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
  task:any;

  assignTaskForm = this.fb.group({
    deadline: ['', [Validators.required]],
    description: ['', [Validators.required]],
    taskId: ['', [Validators.required]],
    categoryId: ['', [Validators.required]],
    userId: ['', [Validators.required]],
  });
  updateTaskForm = this.fb.group({
    categoryId: ['', [Validators.required]],
    deadline: ['', [Validators.required]],
    description: ['', [Validators.required]],
    taskId: ['', [Validators.required]],
    userId: ['', [Validators.required]],
  });

  formData: any;
  constructor(public dialogRef: MatDialogRef<TasksDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, 
  private tasksService: TasksService, private facultyService: FacultyService, private toastService: HotToastService, private spinnerService: SpinnerService) {
    this.type = data.type;
    this.formData = data.data;
    console.log(this.formData);
    if(this.type === 'update')
      this.getTaskById(this.formData.taskId);
    
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

  getTaskById(taskId:any){
    this.tasksService.getCategoryByTask(taskId).subscribe({
      next: (result: any) => {
        console.log(result);
        
        this.formData.categoryId = result.message;
        try {
          this.tasksService.getTaskByCategory(this.formData.categoryId).subscribe((Response) => {
            this.taskList = Response;
            console.log(this.taskList);

            this.formData.taskId = taskId;
            this.assignTaskForm.reset(this.formData);
            this.assignTaskForm.updateValueAndValidity();
          });
          this.spinnerService.removeSpinner();
        } catch (e) {
          this.toastService.error('failed');
        }
        
      },

    
    // this.tasksService.searchTaskByTaskId(taskId).subscribe({
    //   next: (result: any) => {
    //     this.task = result;
    //     console.log(this.task);
    //     this.formData.task = this.task;
    //     this.updateTaskForm.reset(this.formData);
    //     this.updateTaskForm.updateValueAndValidity();
    //     // this.toastService.success(result.message);
    //   },
      error: (error) => {
        this.toastService.error('Failed to fetch task details');
        this.spinnerService.removeSpinner();
      },
      complete: () => {
        this.spinnerService.removeSpinner();
      },
    });
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
    if(typeof(data.deadline)=='string'){
      let [year, month, date] = data.deadline.split('-');
      data.deadline = month+"/"+date+"/"+year;
      // console.log(typeof date);
    }else
      data.deadline = data.deadline.toLocaleDateString();
    console.log(data);
    let response: any = { message: '' };
    try {
      if(this.type === 'assign')
        response = await this.tasksService.assignTask(data);
      else if(this.type ==='update')
        response = await this.tasksService.updateTask(data);
    } catch (error) {
      this.spinnerService.removeSpinner();
      if(this.type === 'assign')
        this.toastService.error('Unable to Add task. Please try again.');
      else if(this.type ==='update')
        this.toastService.error('Unable to Update task. Please try again.');
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

  // updateTask(){
  //   let status = { ...this.prepareData(this.assignTaskForm) };
  //   console.log("this is status" , status);
  // }
}
