import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { NavItem } from 'src/app/faculty/constants';
import { SpinnerService } from 'src/app/services/spinner.service';
import { IndustryDialogComponent } from './industry-dialog/industry-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-industry-visit',
  templateUrl: './industry-visit.component.html',
  styleUrls: ['./industry-visit.component.scss']
})
export class IndustryVisitComponent {

  url: string ;

  constructor( private toastService: HotToastService, private spinnerService: SpinnerService, private dialog: MatDialog, private router: Router) {
    this.url= this.router.url;
  }

  ngOnInit(): void {
    console.log(this.router.url);

    
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
