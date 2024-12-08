import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabNavPanel } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { NavItem } from 'src/app/head/constants';
import { FacultyService } from 'src/app/services/faculty.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { StudentLeaveService } from 'src/app/services/student-leave.service';

@Component({
  selector: 'app-assign-leave-pending',
  templateUrl: './assign-leave-pending.component.html',
  styleUrls: ['./assign-leave-pending.component.scss']
})
export class AssignLeavePendingComponent implements OnInit {
  @ViewChild( 'tabPanel' ) tabPanel?: MatTabNavPanel;
  //selectedTab: string = 'expert-lecture-pending';

  url: string ;
  constructor(private router: Router){

    this.url= this.router.url;
  }
  navItemList: NavItem[] = [
    { code: 'assign-leave-pending-student', value: 'Student' },
    { code: 'assign-leave-pending-faculty', value: 'Faculty' }
  ];

   ngOnInit(): void {
    this.router.navigate([this.url]);
  }

}
