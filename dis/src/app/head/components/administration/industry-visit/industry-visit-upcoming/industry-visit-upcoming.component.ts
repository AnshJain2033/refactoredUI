import { Component, OnInit } from '@angular/core';
import { ActionsCellRendererComponent } from '../actions-cell-renderer/actions-cell-renderer.component';
import { ColDef } from 'ag-grid-community';
import { HotToastService } from '@ngneat/hot-toast';
import { SpinnerService } from 'src/app/services/spinner.service';
import { CommonService } from 'src/app/services/common.service';
import { HttpClient } from '@angular/common/http';
import { IndustryVisitService } from 'src/app/services/industry-visit.service';

@Component({
  selector: 'app-industry-visit-upcoming',
  templateUrl: './industry-visit-upcoming.component.html',
  styleUrls: ['./industry-visit-upcoming.component.scss']
})
export class IndustryVisitUpcomingComponent implements OnInit {
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
    // filter: true,
    resizable: true,
    floatingFilter: true,
    enableRowGroup: true,

  };

  getDate(value: string) {
    var dateParts = value.split('/');
    return new Date(Number(dateParts[2]), Number(dateParts[1]) - 1, Number(dateParts[0]));
  }

  constructor(private industryService: IndustryVisitService, private toastService: HotToastService, private spinnerService: SpinnerService, private commomService: CommonService, private http: HttpClient) {
    this.onDelete = this.onDelete.bind(this);
  }

  ngOnInit(): void {
    this.Init();
  }

  async Init() {
    for (let key in this.fetchData) {
      await this.fetchData[key]();
    }
    // console.log(this.courseOptions)
    // console.log(this.subjectList)
  }

  fetchData: any = {
    getAllIndustryVisitsByStatus: async () => {
      try {
        this.industryService.getAllIndustryVisitsByStatus('upcoming').subscribe((Response) => {
          this.upcomingList = Response;
          console.log(this.upcomingList);
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
    this.commomService.exportToCsv(this.upcomingList, 'taskList.csv');
  }
}
