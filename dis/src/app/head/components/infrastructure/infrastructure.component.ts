import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { HotToastService } from '@ngneat/hot-toast';
import { MatDialog } from '@angular/material/dialog';
import { Infrastructure } from './constants';
import { InfrastructureDialogComponent } from './infrastructure-dialog/infrastructure-dialog.component';

import { NavItem } from '../../constants';
import { SpinnerService } from 'src/app/services/spinner.service';
import { InfrastructureService } from 'src/app/services/infrastructure.service';

@Component({
  selector: 'app-infrastructure',
  templateUrl: './infrastructure.component.html',
  styleUrls: ['./infrastructure.component.scss'],
})
export class InfrastructureComponent implements OnInit {
  navItemList: NavItem[] = [
    { code: 'laboratory', value: 'Laboratory' },
    { code: 'classroom', value: 'Classroom' },
    { code: 'facultyRoom', value: 'Faculty Room' },
    { code: 'other', value: 'Other' },
    { code: 'inventory', value: 'Inventory' },
  ];

  constructor(private infraService: InfrastructureService, private toastService: HotToastService, private spinnerService: SpinnerService, private dialog: MatDialog) {}
  ngOnInit(): void {}
  createNewInfra() {
    let dialogRef = this.dialog.open(InfrastructureDialogComponent, {
      data: {
        type: 'add',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(async (result) => {
      if (result) {
        this.infraService.addNewInfrastructure(result).subscribe({
          next: (result: any) => {
            this.toastService.success(result.message);
          },
          error: (error) => {
            this.toastService.error('Failed to save infrastructure');
            this.spinnerService.removeSpinner();
          },
          complete: () => {
            this.spinnerService.removeSpinner();
          },
        });
      }
    });
  }
}
