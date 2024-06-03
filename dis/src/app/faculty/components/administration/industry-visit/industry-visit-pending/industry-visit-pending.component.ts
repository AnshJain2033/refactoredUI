import { Component, OnInit } from '@angular/core';
import { ActionsCellRendererComponent } from '../actions-cell-renderer/actions-cell-renderer.component';
import { ColDef } from 'ag-grid-community';
import { IndustryVisitService } from 'src/app/services/industry-visit.service';
import { CommonService } from 'src/app/services/common.service';
import { HotToastService } from '@ngneat/hot-toast';
import { SpinnerService } from 'src/app/services/spinner.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
  };

  colDefs: ColDef[] = [
    {
      field: 'date',
      cellStyle: function (params) {
        return { fontWeight: 'bold' };
      },
    },
    {
      field: 'time',
    },
    {
      field: 'companyName',
    },
    {
      field: 'participants',
    },
    {
      field: 'coordinator1',
    },
    {
      field: 'coordinator2',
    },

    {
      headerName: 'Actions',
      cellRenderer: 'actionsCellRenderer',
      cellRendererParams: {
        onDelete: this.onDelete.bind(this),
        //onEdit: this.onEdit.bind(this),
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
        this.toastService.error('Failed to delete industry');
        this.spinnerService.removeSpinner();
      },
      complete: () => {
        this.fetchData['getAllIndustryVisitsByStatus']();
        this.spinnerService.removeSpinner();
      },
    });
  }

  exportData() {
    this.commonService.exportToCsv(this.pendingList, 'taskList.csv');
  }
}

