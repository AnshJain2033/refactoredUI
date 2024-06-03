import { Component, ViewChild } from '@angular/core';
import { NavItem } from '../../../constants';

import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTabChangeEvent, MatTabNavPanel } from '@angular/material/tabs';
import { HotToastService } from '@ngneat/hot-toast';


import { IndustryVisit } from './constants';
import { IndustryDialogComponent } from './industry-dialog/industry-dialog.component';
import { SpinnerService } from 'src/app/services/spinner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-industry-visit',
  templateUrl: './industry-visit.component.html',
  styleUrls: ['./industry-visit.component.scss'],
})
export class IndustryVisitComponent {
  @ViewChild( 'tabPanel' ) tabPanel?: MatTabNavPanel;

  url: string ;

  constructor( private toastService: HotToastService, private spinnerService: SpinnerService, private dialog: MatDialog, private router: Router) {
    this.url= this.router.url;
  }

  ngOnInit(): void {
    console.log(this.router.url);

    console.log(this.tabPanel);
    
    this.router.navigate([this.url]);
  }

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
    dialogRef.afterClosed().subscribe(() => {
      //let url = this.router.url;
      this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{this.router.navigate([this.url])});
    });
  }
}
