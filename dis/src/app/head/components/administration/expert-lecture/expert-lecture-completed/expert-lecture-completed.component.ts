import { Component } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { ActionsCellRendererComponent } from '../actions-cell-renderer/actions-cell-renderer.component';
import { ExpertLectureService } from 'src/app/services/expert-lecture.service';
import { HotToastService } from '@ngneat/hot-toast';
import { SpinnerService } from 'src/app/services/spinner.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-expert-lecture-completed',
  templateUrl: './expert-lecture-completed.component.html',
  styleUrls: ['./expert-lecture-completed.component.scss']
})
export class ExpertLectureCompletedComponent {

  completedList: any = [];
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
        return { color: 'green' };
      },
    },
    // {
    //   headerName: 'Actions',
    //   cellRenderer: 'actionsCellRenderer',
    //   cellRendererParams: {
    //     onDelete: this.onDelete.bind(this)
    //   }
    // }
  ];

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
    //this.onDelete = this.onDelete.bind(this);
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
        this.expertService.getExpertLectureByStatus('completed').subscribe((Response) => {
          this.completedList = Response;
          console.log(this.completedList);
        });
        this.spinnerService.removeSpinner();
      } catch (error) {
        this.toastService.error('Failed');
      }
    },
  };

  // exportData() {
  //   this.commomService.exportToCsv(this.completedList, 'taskList.csv');
  // }
}
