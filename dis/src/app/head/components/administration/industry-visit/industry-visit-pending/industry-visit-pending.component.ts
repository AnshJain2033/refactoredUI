import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ActionsCellRendererComponent } from '../actions-cell-renderer/actions-cell-renderer.component';
import { ColDef } from 'ag-grid-community';
import { IndustryVisitService } from 'src/app/services/industry-visit.service';
import { CommonService } from 'src/app/services/common.service';
import { IndustryVisitEditDialogComponent } from '../industry-visit-edit-dialog/industry-visit-edit-dialog.component';

@Component({
  selector: 'app-industry-visit-pending',
  templateUrl: './industry-visit-pending.component.html',
  styleUrls: ['./industry-visit-pending.component.scss']
})
export class IndustryVisitPendingComponent implements OnInit {

  pendingList: any = [];
  facultyList: any = [];

  frameworkComponents: any = {
    actionsCellRenderer: ActionsCellRendererComponent,
  };

  api: any;
  gridOptions: any = {
    rowSelection: 'multiple',
    alwaysShowHorizontalScroll: true,
    alwaysShowVerticalScroll: true,
  };

  colDefs: ColDef[] = [
    {
      field: 'date',
      minWidth: 200,
      cellStyle: function (params) {
        return { fontWeight: 'bold' };
      },
    },
    {
      field: 'time',
      minWidth: 200,
    },
    {
      field: 'companyName',
      minWidth: 200,
    },
    {
      field: 'participants',
      minWidth: 200,
    },
    {
      field: 'coordinator1',
      minWidth: 200,
    },
    {
      field: 'coordinator2',
      minWidth: 200,
    },

    {
      headerName: 'Actions',
      cellRenderer: 'actionsCellRenderer',
      minWidth: 200,
      cellRendererParams: {
        onDelete: this.onDelete.bind(this),
        onEdit: this.onEdit.bind(this),
        //onStatus: this.onStatus.bind(this)
      },
    },
  ];

  public autoGroupColumnDef: ColDef = {
    minWidth: 200,
  };

  public rowGroupPanelShow: 'always' | 'onlyWhenGrouping' | 'never' = 'always';

  public defaultColDef: ColDef = {
    flex: 1,
    sortable: true,
    filter: true,
    resizable: true,
    floatingFilter: true,
    enableRowGroup: true,
    enablePivot: true,
    width: 2
  }
  constructor(private industryService: IndustryVisitService, private commonService: CommonService, private toastService: HotToastService, private spinnerService: SpinnerService, private dialog: MatDialog, private fb: FormBuilder, private http: HttpClient) {
    this.onDelete = this.onDelete.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }
  async Init() {
    for (let key in this.fetchData) {
      await this.fetchData[key]();
    }
    // console.log(this.courseOptions)
    // console.log(this.subjectList)
  }
  ngOnInit(): void {
    this.Init();
  }

  fetchData: any = {
    getAllIndustryVisitsByStatus: async () => {
      try {
        this.industryService.getAllIndustryVisitsByStatus('pending').subscribe((Response) => {
          this.pendingList = Response;
          console.log(this.pendingList);
        });
        this.spinnerService.removeSpinner();
      } catch (error) {
        this.toastService.error('Failed');
      }
    },
  };

  onDelete(rowData: any) {
    console.log('on delete clicked');
    // console.log("on delete clicked")
    console.log(rowData);

    this.industryService.deleteIndustryVisit(rowData.industryVisitId).subscribe({
      next: (result: any) => {
        this.toastService.success(result.message);
      },
      error: (error) => {
        console.log(error);
        this.toastService.error('Failed to delete industry visit');
        this.spinnerService.removeSpinner();
      },
      complete: () => {
        this.fetchData['getAllIndustryVisitsByStatus']();
        this.spinnerService.removeSpinner();
      },
    });
    this.pendingList = this.pendingList.filter((item: any) => item.id !== rowData.id);
  }

  onEdit(rowData: any) {

    console.log('on edit clicked');
    // alert(rowData);
    console.log(rowData);
    const dialogRef = this.dialog.open(IndustryVisitEditDialogComponent, {
      data: {
        type: 'edit',
        data : rowData

      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(() => this.fetchData['getAllIndustryVisitsByStatus']());


  }

  exportData() {
    this.commonService.exportToCsv(this.pendingList, 'taskList.csv');
  }
}
