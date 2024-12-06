import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import 'ag-grid-community';
// import { AgGridModule } from 'ag-grid-angular';
import { ColDef, IDateFilterParams, IMultiFilterParams, ISetFilterParams } from 'ag-grid-community';


import { ActionsCellRendererTaskComponent } from './actions-cell-renderer-task/actions-cell-renderer-task.component';
import { A } from '@fullcalendar/core/internal-common';
import { EditTaskDialogComponent } from './edit-task-dialog/edit-task-dialog.component';
import { TasksService } from 'src/app/services/tasks.service';
import { FacultyService } from 'src/app/services/faculty.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit {
  inProgressLength: number =0;
  filteredDataList: any = [];
  activeTaskList: any = [];
  facultyList: any = [];
  taskStatusList: any = [];
  inProgressList: any = [];
  completedList: any = [];
  onHoldList: any = [];
  userId : any = sessionStorage.getItem("userId");
  frameworkComponents: any = {
    actionsCellRenderer: ActionsCellRendererTaskComponent,
  };


  // renderList: any = [];
  // displayColumns: string[] = ['assignedDate', 'taskName', 'description', 'deadline'];
  // columnsList: any[] = [
  //   { binding: 'assignedDate', header: 'Assigned Date' },
  //   { binding: 'taskName', header: 'Task Name' },
  //   { binding: 'description', header: 'Description' },
  //   { binding: 'deadline', header: 'Deadline' },
  // ];

  api: any;
  onEdit(rowData : any){
    let dialogRef = this.dialog.open(EditTaskDialogComponent,{
    data : {
      type: 'task',
      data : rowData
    },
    disableClose: true});
    dialogRef.afterClosed().subscribe(() => this.fetchData.getActiveTaskList());
    
  }

  constructor(private taskService: TasksService, private commonService: CommonService, private facultyService: FacultyService, private toastService: HotToastService, private spinnerService: SpinnerService, private dialog: MatDialog, private fb: FormBuilder, private http: HttpClient) {}

  onDelete(params: any) {
    this.activeTaskList.splice(params.rowData.index, 1);
    console.log(this.activeTaskList);
    this.api.updateRowData({ remove: [params.rowData] });
    this.api.forEachNode((node: { data: any }) => {
      console.log(node.data);
    });
    return this.activeTaskList;
  }

  onGridReady(params: any) {
    this.api = params.api;
  }

  ngOnInit(): void {
    this.Init();
  }

  async Init() {
    for (let key in this.fetchData) {
      await this.fetchData[key]();
    }
  }

  UseLessParameter: any;
  fetchData: any = {
    getActiveTaskList: async () => {
      try {
        this.taskService.searchTaskByUserId(this.userId).subscribe((Response) => {
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
          for(let task of this.filteredDataList.inProgressList){
            if(task.userId === this.userId)
              this.inProgressList.push(task);
          }
          for(let task of this.filteredDataList.onHoldList){
            if(task.userId === this.userId)
              this.onHoldList.push(task);
          }

          for(let task of this.filteredDataList.completedList){
            if(task.userId === this.userId)
             this.completedList.push(task);
          }
          
        });
        this.spinnerService.removeSpinner();
      } catch (error) {
        this.toastService.error('Failed');
      }
    },
  };

  gridOptions: any = {
    rowSelection: 'multiple',
    stylesheet: './tasks-dialog.component .scss',
  };
  public rowGroupPanelShow: 'always' | 'onlyWhenGrouping' | 'never' = 'always';

  handleDeleteSelectedRows() {
    const selectedRows = this.gridOptions.api.getSelectedRows();
    this.gridOptions.api.updateRowData({ remove: selectedRows });
  }
  colDefs: ColDef[] = [
    {
      field: 'userName',
    },
    {
      field: 'taskName',
    },
    {
      field: 'createdDate',
    },
    {
      field: 'deadline',
    },
    {
      field: 'status',
      cellStyle: function (params) {
        console.log(params.node);
        if (params.node.data.status == 'Progress') {
          //Here you can check the value and based on that you can change the color
          //mark police cells as red
          return { color: 'red' };
        } else if (params.node.data.status == 'Completed') {
          return { color: 'green' };
        } else {
          return { color: 'orange' };
        }
      },
    },
    {
      headerName: 'Actions',
      cellRenderer: 'actionsCellRenderer',
      cellRendererParams: {
        // onDelete: this.onDelete.bind(this),
        onEdit: this.onEdit.bind(this),
        // onStatus: this.onStatus.bind(this)
      },
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
  public defaultColDef: ColDef = {
    flex: 1,
    sortable: true,
    filter: true,
    resizable: true,
    floatingFilter: true,
    // filter: 'agMultiColumnFilter',
  };

  dateFilterParams: IMultiFilterParams = {
    filters: [
      {
        filter: 'agDateColumnFilter',
        filterParams: {
          comparator: (filterDate: Date, cellValue: string) => {
            if (cellValue == null) return -1;
            return this.getDate(cellValue).getTime() - filterDate.getTime();
          },
        } as IDateFilterParams,
      },
      {
        filter: 'agSetColumnFilter',
        filterParams: {
          comparator: (a: string, b: string) => {
            return this.getDate(a).getTime() - this.getDate(b).getTime();
          },
        } as ISetFilterParams,
      },
    ],
  };

  getDate(value: string) {
    var dateParts = value.split('/');
    return new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));
  }

  exportData() {
    this.commonService.exportToCsv(this.activeTaskList, 'taskList.csv');
  }

  updateTask() {
    let dialogRef = this.dialog.open(EditTaskDialogComponent, {
      data: {
        type: 'update',
      },
      disableClose: true,
    });
    // dialogRef.afterClosed().subscribe(async (result) => {
    //   if (result) {
    //     this.httpService.postRequest('addNewInfrastructure', result).subscribe({
    //       next: (result: any) => {
    //         this.toastService.success(result.message);
    //       },
    //       error: (error) => {
    //         this.toastService.error('Failed to save infrastructure');
    //         this.spinnerService.removeSpinner();
    //       },
    //       complete: () => {
    //         this.spinnerService.removeSpinner();
    //       },
    //     });
    //   }
    // });
  }

  deleteTask() {

  }
}
