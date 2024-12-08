import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabNavPanel } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { NavItem } from 'src/app/head/constants';
import { FacultyService } from 'src/app/services/faculty.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { StudentLeaveService } from 'src/app/services/student-leave.service';

@Component({
  selector: 'app-assign-leave-coordinator',
  templateUrl: './assign-leave-coordinator.component.html',
  styleUrls: ['./assign-leave-coordinator.component.scss']
})
export class AssignLeaveCoordinatorComponent implements OnInit{
  @ViewChild( 'tabPanel' ) tabPanel?: MatTabNavPanel;
  //selectedTab: string = 'expert-lecture-pending';

  url: string ;
  constructor(private router: Router){

    this.url= this.router.url;
  }
  navItemList: NavItem[] = [
    { code: 'assign-leave-pending', value: 'Pending' },
    { code: 'assign-leave-completed', value: 'Assigned' }
  ];

   ngOnInit(): void {
    this.router.navigate([this.url]);
  }

 
}
