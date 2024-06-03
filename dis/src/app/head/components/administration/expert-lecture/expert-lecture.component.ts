import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavItem } from 'src/app/head/constants';
import { ExpertDialogComponent } from './expert-dialog/expert-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTabNav, MatTabNavPanel } from '@angular/material/tabs';

@Component({
  selector: 'app-expert-lecture',
  templateUrl: './expert-lecture.component.html',
  styleUrls: ['./expert-lecture.component.scss']
})
export class ExpertLectureComponent {
  @ViewChild( 'tabPanel' ) tabPanel?: MatTabNavPanel;
  //selectedTab: string = 'expert-lecture-pending';
  navItemList: NavItem[] = [
    { code: 'expert-lecture-pending', value: 'Pending' },
    { code: 'expert-lecture-upcoming', value: 'Upcoming' },
    { code: 'expert-lecture-completed', value: 'Completed' },
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

  addExpertDialog() {
    const dialogRef = this.dialog.open(ExpertDialogComponent, {
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
