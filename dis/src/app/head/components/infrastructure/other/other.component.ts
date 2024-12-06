import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { HttpService } from 'src/app/services/http.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { Infrastructure } from '../constants';
import { Action } from 'src/app/components/table/constants';
import { InfrastructureDialogComponent } from '../infrastructure-dialog/infrastructure-dialog.component';

@Component({
  selector: 'app-other',
  templateUrl: './other.component.html',
  styleUrls: ['./other.component.scss'],
})
export class OtherComponent implements OnInit {
  currentList: Infrastructure[] = [];
  columnsList: any[] = [
    { binding: 'name', header: 'Name' },
    { binding: 'location', header: 'Location' },
    { binding: 'area', header: 'Area' },
    { binding: 'attendant', header: 'Attendant' },
  ];
  displayColumns: string[] = ['name', 'location', 'area', 'attendant'];
  actionBtnList: Action[] = [
    {
      name: 'Delete',
      color: 'warn',
      icon: 'bi bi-trash',
    },
    {
      name: 'Edit',
      color: 'primary',
      icon: 'bi bi-pencil-fill',
    },
  ];
  constructor(private httpService: HttpService, private toastService: HotToastService, private spinnerService: SpinnerService, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.getInfrastructureByType();
  }

  getInfrastructureByType() {
    this.httpService.getRequest('getInfrastructureByType', ['other']).subscribe({
      next: (res: Infrastructure[]) => {
        this.currentList = res.map((e) => ({ ...e, area: e.area + ' sqft.' }));
      },
      error: (error: any) => {
        this.toastService.error('Failed to fetch infrastructure');
        this.spinnerService.removeSpinner();
      },
      complete: () => {
        this.spinnerService.removeSpinner();
      },
    });
  }
  actionBtnClickEvent(event: any) {
    switch (event.name) {
      case 'Delete': {
        if (confirm('Do you really want to delete?')) {
          this.deleteInfra(event.value);
        }
        break;
      }
      case 'Edit': {
        let dialogRef = this.dialog.open(InfrastructureDialogComponent, {
          data: {
            type: 'edit',
            data: { id: event.value.id, infraType: 'Other' },
          },
          disableClose: true,
        });
        dialogRef.afterClosed().subscribe((data) => {
          if (data) {
            this.updateInfra(data);
          }
        });
      }
    }
  }
  async updateInfra(data: Infrastructure) {
    this.httpService.putRequest('updateInfrastructure', data).subscribe({
      next: (result: any) => {
        this.toastService.success(result.message);
      },
      error: () => {
        this.toastService.error('Failed to update infrastructure');
        this.spinnerService.removeSpinner();
      },
      complete: () => {
        this.getInfrastructureByType();
        this.spinnerService.removeSpinner();
      },
    });
  }
  deleteInfra(infra: Infrastructure) {
    this.httpService.deleteRequest('deleteInfrastructure', [infra.id]).subscribe({
      next: (result: any) => {
        this.toastService.success(result.message);
      },
      error: () => {
        this.toastService.error('Failed to delete infrastructure');
        this.spinnerService.removeSpinner();
      },
      complete: () => {
        this.getInfrastructureByType();
        this.spinnerService.removeSpinner();
      },
    });
  }
}
