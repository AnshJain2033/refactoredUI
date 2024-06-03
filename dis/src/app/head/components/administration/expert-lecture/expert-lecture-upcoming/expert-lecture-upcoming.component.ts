import { Component } from '@angular/core';
import { ActionsCellRendererComponent } from '../actions-cell-renderer/actions-cell-renderer.component';
import { ColDef } from 'ag-grid-community';
import { ExpertEditDialogComponent } from '../expert-edit-dialog/expert-edit-dialog.component';
import { ExpertLectureService } from 'src/app/services/expert-lecture.service';
import { HotToastService } from '@ngneat/hot-toast';
import { SpinnerService } from 'src/app/services/spinner.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-expert-lecture-upcoming',
  templateUrl: './expert-lecture-upcoming.component.html',
  styleUrls: ['./expert-lecture-upcoming.component.scss']
})
export class ExpertLectureUpcomingComponent {
  upcomingList: any = [];
  facultyList: any = [];

  frameworkComponents: any = {
    actionsCellRenderer: ActionsCellRendererComponent,
  };

  api: any;
  gridOptions: any = {
    rowSelection: 'multiple',
  };

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
      minWidth: 200
    },
    {
      field: 'time',
      minWidth: 200
    },
    {
      field: 'expertName',
      minWidth: 200
    },
    {
      field: 'expertDesignation',
      minWidth: 200
    },
    {
      field: 'coordinator',
      minWidth: 200
    },

    {
      field: 'status',
      minWidth: 200,
      cellStyle: function (params) {
        return { color: 'blue' };
      },
    },
    {
      headerName: 'Actions',
      minWidth: 200,
      cellRenderer: 'actionsCellRenderer',
      cellRendererParams: {
        onDelete: this.onDelete.bind(this),
        onEdit: this.onEdit.bind(this),
        onStatus: this.onStatus.bind(this),
      },
    },
  ];

  // public autoGroupColumnDef: ColDef = {
  //   minWidth: 200,
  // };
  public rowGroupPanelShow: 'always' | 'onlyWhenGrouping' | 'never' = 'always';


  public defaultColDef: ColDef = {
    flex: 1,
    sortable: true,
     filter: true,
    resizable: true,
    floatingFilter: true,
    enableRowGroup: true,
  };

  ngOnInit(): void {
    this.Init();
  }

  constructor(private expertService: ExpertLectureService, private toastService: HotToastService, private spinnerService: SpinnerService, private dialog: MatDialog, private fb: FormBuilder, private http: HttpClient) {
    this.onDelete = this.onDelete.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onStatus = this.onStatus.bind(this);
  }
  async Init() {
    for (let key in this.fetchData) {
      await this.fetchData[key]();
    }
    // console.log(this.courseOptions)
    // console.log(this.subjectList)
  }

  fetchData: any = {
    getExpertLectureByStatus: async () => {
      try {
        this.expertService.getExpertLectureByStatus('upcoming').subscribe((Response) => {
          this.upcomingList = Response;
          console.log(this.upcomingList);
        });
        this.spinnerService.removeSpinner();
      } catch (error) {
        this.toastService.error('Failed');
      }
    },
  };

  

  // exportData() {
  //   this.commomService.exportToCsv(this.upcomingList, 'taskList.csv');
  // }

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
    dialogRef.afterClosed().subscribe(() => this.ngOnInit());


  }
  onStatus(rowData: any) {

    console.log('on status clicked');
    // alert(rowData);
    console.log(rowData);
    const dialogRef = this.dialog.open(ExpertEditDialogComponent, {
      data: {
        type: 'upcoming',
        data : rowData

      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(() => this.ngOnInit());


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
        this.fetchData['getExpertLectureByStatus']();
        this.spinnerService.removeSpinner();
      },
    });
  }

  
}
