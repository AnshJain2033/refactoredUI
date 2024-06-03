import { HttpClient } from '@angular/common/http';
import { Component,OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { HotToastService } from '@ngneat/hot-toast';
import 'ag-grid-community';
import { ColDef, GridApi, IDateFilterParams, IMultiFilterParams, ISetFilterParams } from 'ag-grid-community';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ActionsCellRendererComponent } from '../actions-cell-renderer/actions-cell-renderer.component';
import { ExpertLectureService } from 'src/app/services/expert-lecture.service';
import { ExpertEditDialogComponent } from '../expert-edit-dialog/expert-edit-dialog.component';

@Component({
  selector: 'app-expert-lecture-pending',
  templateUrl: './expert-lecture-pending.component.html',
  styleUrls: ['./expert-lecture-pending.component.scss']
})
export class ExpertLecturePendingComponent implements OnInit {

 // gridApi!: GridApi;
  pendingList: any = [];
  columnDefs: ColDef[] = [];
  colDefs: ColDef[] = [
    {
      field: 'topic',
      minWidth: 200,
      cellStyle: function (params) {
        return { fontWeight: 'bold' };
      },
    },
    {
      field: 'date',
      minWidth: 200,
    },
    {
      field: 'time',
      minWidth: 200,
    },
    {
      field: 'expertName',
      minWidth: 200,
    },
    {
      field: 'expertDesignation',
      minWidth: 200,
    },

    {
      field: 'coordinator',
      minWidth: 200,
    },

    {
      field: 'status',
      minWidth: 200,
      cellStyle: function (params) {
        return { color: 'orange' };
      },
    },
    {
      headerName: 'Actions',
      cellRenderer: 'actionsCellRenderer',
      minWidth: 200,
      cellRendererParams: {
        onDelete: this.onDelete.bind(this),
        onEdit: this.onEdit.bind(this),
        onStatus: this.onStatus.bind(this)
      },
    },
  ];

  frameworkComponents: any = {
    actionsCellRenderer: ActionsCellRendererComponent,
  };

  gridOptions: any = {
    rowSelection: 'multiple',
    alwaysShowHorizontalScroll: true,
    alwaysShowVerticalScroll: true,
  };

  public defaultColDef: ColDef = {
    flex: 1,
    sortable: true,
    filter: true,
    resizable: true,
    floatingFilter: true,
    enableRowGroup: true,
    enablePivot: true,
    width: 2,
    // filter: 'agMultiColumnFilter',
    // filterParams: {
    //   filters: [
    //     {
    //       filter: 'agNumberColumnFilter',
    //     },
    //     {
    //       filter: 'agSetColumnFilter',
    //     },
    //   ],
    // } as IMultiFilterParams,

  };

  // dateFilterParams: IMultiFilterParams = {
  //   filters: [
  //     {
  //       filter: 'agDateColumnFilter',
  //       filterParams: {
  //         comparator: (filterDate: Date, cellValue: string) => {
  //           if (cellValue == null) return -1;
  //           return this.getDate(cellValue).getTime() - filterDate.getTime();
  //         },
  //       } as IDateFilterParams,
  //     },
  //     {
  //       filter: 'agSetColumnFilter',
  //       filterParams: {
  //         comparator: (a: string, b: string) => {
  //           return this.getDate(a).getTime() - this.getDate(b).getTime();
  //         },
  //       } as ISetFilterParams,
  //     },
  //   ],
  // };

  getDate(value: string) {
    var dateParts = value.split('/');
    return new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));
  }

  public autoGroupColumnDef: ColDef = {
    minWidth: 200,
  };
  public rowGroupPanelShow: 'always' | 'onlyWhenGrouping' | 'never' = 'always';

  @ViewChild(MatSort, {static: true}) sort!: MatSort;

  ngOnInit(): void {
    // this.Init();
  }

  constructor(private expertService: ExpertLectureService,private elementRef: ElementRef, private toastService: HotToastService, private spinnerService: SpinnerService, private dialog: MatDialog, private fb: FormBuilder, private http: HttpClient) {
    this.onDelete = this.onDelete.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onStatus = this.onStatus.bind(this);
    this.columnDefs = this.colDefs;
    this.expertService.getExpertLectureByStatus('pending').subscribe((response) => {
      this.pendingList = response;   
      // this.gridApi.sizeColumnsToFit({
      //   defaultMinWidth: 100,
      //   columnLimits: [{ key: 'Actions', minWidth: 900 }],
      // });
    });
    this.spinnerService.removeSpinner();
  }

  fetchData: any = {
    getExpertLectureByStatus: async () => {
      try {
        this.expertService.getExpertLectureByStatus('pending').subscribe((Response) => {
          this.pendingList = Response;
          console.log(this.pendingList);
        });
        this.spinnerService.removeSpinner();
      } catch (error) {
        this.toastService.error('Failed');
      }
    },
  };
  onEdit(rowData: any) {

    console.log('on edit clicked');
    // alert(rowData);
    console.log(rowData);
    const dialogRef = this.dialog.open(ExpertEditDialogComponent, {
      data: {
        type: 'edit',
        data : rowData

      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(() => this.fetchData['getExpertLectureByStatus']());


  }
  onStatus(rowData: any) {

    console.log('on status clicked');
    // alert(rowData);
    console.log(rowData);
    const dialogRef = this.dialog.open(ExpertEditDialogComponent, {
      data: {
        type: 'status',
        data : rowData

      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(() => this.fetchData['getExpertLectureByStatus']());


  }

  onDelete(rowData: any) {
    console.log('on delete clicked');
    // console.log("on delete clicked")
    console.log(rowData);

    this.expertService.deleteExpertLecture(rowData.expertLectureId).subscribe({
      next: (result: any) => {
        this.toastService.success(result.message);
      },
      error: (error) => {
        console.log(error);
        this.toastService.error('Failed to delete panel');
        this.spinnerService.removeSpinner();
      },
      complete: () => {
       // this.fetchData['getExpertLectureByStatus']();
        this.spinnerService.removeSpinner();
      },
    });
    this.pendingList = this.pendingList.filter((item: any) => item.id !== rowData.id);
  }

}
