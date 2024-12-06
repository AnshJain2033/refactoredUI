
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavItem } from 'src/app/head/constants';
import { EventDialogComponent } from './event-dialog/event-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTabNav, MatTabNavPanel } from '@angular/material/tabs';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent {
  @ViewChild( 'tabPanel' ) tabPanel?: MatTabNavPanel;
  //selectedTab: string = 'expert-lecture-pending';
  navItemList: NavItem[] = [
    { code: 'event-ongoing', value: 'Ongoing' },
    { code: 'event-upcoming', value: 'Upcoming' },
    { code: 'event-completed', value: 'Completed' },
  ];

  url: string ;
  constructor(private dialog:MatDialog, private route: ActivatedRoute, private router: Router){

    this.url= this.router.url;
  }

  ngOnInit(): void {
    console.log(this.router.url);

    console.log(this.tabPanel);
    
    this.router.navigate([this.url]);
  }

  addEventDialog() {
    const dialogRef = this.dialog.open(EventDialogComponent, {
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
