import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { NavItem } from 'src/app/faculty/constants';
import { SpinnerService } from 'src/app/services/spinner.service';
import { IndustryDialogComponent } from './industry-dialog/industry-dialog.component';

@Component({
  selector: 'app-industry-visit',
  templateUrl: './industry-visit.component.html',
  styleUrls: ['./industry-visit.component.scss']
})
export class IndustryVisitComponent {

  constructor( private toastService: HotToastService, private spinnerService: SpinnerService, private dialog: MatDialog) {}

  selectedTab: string = 'expert-lecture-pending';
  navItemList: NavItem[] = [
    { code: 'industry-visit-pending', value: 'Pending' },
    { code: 'industry-visit-upcoming', value: 'Upcoming' },
    { code: 'industry-visit-completed', value: 'Completed' },
  ];

  addVisitDialog() {
    const dialogRef = this.dialog.open(IndustryDialogComponent, {
      data: {
        type: 'add',
      },
      disableClose: true,
    });
    
  }
}
