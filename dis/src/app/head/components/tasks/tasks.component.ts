import { Component, OnInit } from '@angular/core';
import { ActionsCellRendererTaskComponent } from './actions-cell-renderer-task/actions-cell-renderer-task.component';
import { TasksService } from 'src/app/services/tasks.service';
import { HotToastService } from '@ngneat/hot-toast';
import { SpinnerService } from 'src/app/services/spinner.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { FacultyGuard } from 'src/app/shared/guard/faculty.guard';
import { FacultyService } from 'src/app/services/faculty.service';
import { TasksDialogComponent } from './tasks-dialog/tasks-dialog.component';
import { ColDef, IMultiFilterParams } from 'ag-grid-community';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit{

  inProgressLength: number = 0;
  filteredDataList: any = [];
  activeTaskList: any = [];
  facultyList: any = [];
  taskStatusList: any = [];
  inProgressList: any = [];
  completedList: any = [];
  onHoldList: any = [];
  frameworkComponents: any = {
    actionsCellRenderer: ActionsCellRendererTaskComponent,
  };

  api: any;

  colDefs: ColDef[] = [
    {
      field: 'userName',
    },
    {
      field: 'taskName',
      minWidth: 200
    },
    {
      field: 'createdDate',
    },
    {
      field: 'deadline',
    },
    {
      field: 'status',
      // cellStyle: function (params) {
      //   console.log(params.node);
      //   if (params.node.data.status == 'Progress') {
      //     //Here you can check the value and based on that you can change the color
      //     //mark police cells as red
      //     return { color: 'red' };
      //   } else if (params.node.data.status == 'Completed') {
      //     return { color: 'green' };
      //   } else {
      //     return { color: 'orange' };
      //   }
      // },
    },
    {
      headerName: 'Actions',
      cellRenderer: 'actionsCellRenderer',
      cellRendererParams: {
        clicked: function(field: any) {
          alert(`${field} was deleted`);
        },
        onEdit: this.updateTask.bind(this),
      }
    },

    // {
    //   headerName: 'actions',
    //   cellRenderer: 'buttonRenderer',
    //   cellRendererParams: {
    //     onClick: this.onDelete.bind(this),
    //     label: 'Click 1'
    //   }
    // },
  ];

  gridOptions: any = {
    rowSelection: 'multiple',
    stylesheet: './tasks-dialog.component .scss',
  };

  public rowGroupPanelShow: 'always' | 'onlyWhenGrouping' | 'never' = 'always';

  constructor(private taskService: TasksService, private facultyService: FacultyService, private toastService: HotToastService, private spinnerService: SpinnerService, 
    private dialog: MatDialog, private fb: FormBuilder,  private http: HttpClient, private commonService: CommonService) { }

  ngOnInit(): void {
    this.Init();
  }

  async Init() {
    for (let key in this.fetchData) {
      await this.fetchData[key]();
    }

    console.log(this.activeTaskList);
    console.log(this.facultyList);
    // console.log(this.courseOptions)
    // console.log(this.subjectList)
  }

  fetchData: any = {
    getActiveTaskList: async () => {
      try {
        this.taskService.getActiveTaskList().subscribe((Response) => {
          this.activeTaskList = Response;
          console.log(this.activeTaskList);
        });
        this.spinnerService.removeSpinner();
      } catch (error) {
        this.toastService.error('Failed');
      }
    },
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
    getTaskStatusList: async () => {
      try {
        this.taskService.getTaskStatusList().subscribe((Response) => {
          this.filteredDataList = Response;
          this.inProgressList = this.filteredDataList.inProgressList;
          this.onHoldList = this.filteredDataList.onHoldList;
          this.completedList = this.filteredDataList.completedList;
          // this.completedList=this.filteredDataList.completed
          // this.completedList=[...this.filteredDataList[1]]
          // this.onHoldList=[...this.filteredDataList[2]]
          // console.log(this.inProgressList);
          // this.completedList=this.filteredDataList.completedList;
          // this.onHoldList=this.filteredDataList.onHoldList;

          console.log(this.filteredDataList);
        });
        this.spinnerService.removeSpinner();
      } catch (error) {
        this.toastService.error('Failed');
      }
    },
  };

  public defaultColDef: ColDef = {
    flex: 1,
    sortable: true,
    filter: true,
    resizable: true,
    floatingFilter: true,
    enableRowGroup: true,

    // filter: 'agMultiColumnFilter'
    // filter: 'agMultiColumnFilter',
    // filterParams: {
    //   filters: [
    //     {
    //       filter: 'agTextColumnFilter',
    //     },
    //     {
    //       filter: 'agSetColumnFilter',
    //     },
    //   ],
    // } as IMultiFilterParams,
  };

  onGridReady(params: any) {
    this.api = params.api;
  }

  assignTask() {
    let dialogRef = this.dialog.open(TasksDialogComponent, {
      data: {
        type: 'assign',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(() => this.Init());
  }

  updateTask() {
    let dialogRef = this.dialog.open(TasksDialogComponent, {
      data: {
        type: 'update',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      // if (result) {
      //   this.httpService.postRequest('addNewInfrastructure', result).subscribe({
      //     next: (result: any) => {
      //       this.toastService.success(result.message);
      //     },
      //     error: (error) => {
      //       this.toastService.error('Failed to save infrastructure');
      //       this.spinnerService.removeSpinner();
      //     },
      //     complete: () => {
      //       this.spinnerService.removeSpinner();
      //     },
      //   });
      // }
    });
  }

  exportData() {
    this.commonService.exportToCsv(this.activeTaskList, 'taskList.csv');
  }
}
