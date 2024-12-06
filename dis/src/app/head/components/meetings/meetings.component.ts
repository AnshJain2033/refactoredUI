import { Component } from '@angular/core';
import { SpinnerService } from 'src/app/services/spinner.service';
import { HotToastService } from '@ngneat/hot-toast';
import { MatDialog } from '@angular/material/dialog';
import { NavItem } from '../../constants';
import { Meeting } from './constants';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MeetingsService } from 'src/app/services/meetings.service';
import { Action } from 'src/app/components/table/constants';
import { MeetingDialogComponent } from './meeting-dialog/meeting-dialog.component';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss']
})
export class MeetingsComponent {
  constructor(private meetingsService: MeetingsService, private spinnerService: SpinnerService, private toastService: HotToastService, private dialog: MatDialog) {}

  currentList: Meeting[] = [];

  selectedTab: string = 'Past Meetings';

  paginatorData: any = {
    length: 0,
    pageIndex: 0,
  };

  displayList: Meeting[] = [];
  displayColumns: string[] = ['meetingObjective', 'meetingDate', 'meetingTime','meetingEndTime', 'meetingVenue'];
  columnsList: any[] = [
    { binding: 'meetingObjective', header: 'Objective' },
    { binding: 'meetingDate', header: 'Date' },
    { binding: 'meetingTime', header: 'Start Time' },
    { binding: 'meetingEndTime', header: 'End Time' },
    { binding: 'meetingVenue', header: 'Venue' },
  ];

  navListItem: NavItem[] = [
    { code: 'past', value: 'Past Meetings' },
    { code: 'current', value: 'Current Meetings' },
    { code: 'future', value: 'Future Meetings' },
  ];

  actionBtns: { [key: string]: Action[] } = {
    future: [
      {
        name: 'Delete',
        color: 'warn',
        icon: 'bi bi-trash',
      },
      {
        name: 'Update',
        color: 'primary',
        icon: 'bi bi-pencil-fill',
      },
    ],
    past: [
      {
        name: ' View Summary',
        color: 'primary',
        icon: 'bi bi-eye',
        displayName: 'View Summary',
      },
      // {
      //   name: ' Edit Summary',
      //   color: 'primary',
      //   icon: 'bi bi-pencil-fill',
      //   displayName: 'Edit Summary',
      // },
      {
        name: ' View Attendees',
        color: 'primary',
        icon: 'bi bi-person',
        displayName: 'View Attendees',
      },
    ],
    current: [
      {
        name: 'Add Summary',
        color: 'primary',
        displayName: 'Summary',
        icon: 'bi bi-pencil-fill',
      },
      {
        name: ' Mark Attendance',
        color: 'primary',
        icon: 'bi bi-person',
        displayName: 'Mark Attendance',
      }
    ],
  };
  actionBtnList: Action[] = this.actionBtns['past'];

  ngOnInit() {
    this.getTabData[this.selectedTab]();
    console.log(sessionStorage.getItem('role'));
    if(sessionStorage.getItem('role') === 'HOD'){
      this.actionBtns['past'].push( {
        name: ' Edit Summary',
        color: 'primary',
        icon: 'bi bi-pencil-fill',
        displayName: 'Edit Summary',
      })
    }
  }

  getTabData: any = {
    'Past Meetings': () => {
      this.meetingsService.getPastMeetings().subscribe({
        next: (res: any[]) => {
          this.currentList = res;
          this.paginatorData = {
            length: res.length,
            pageIndex: 0,
          };
          this.displayList = res.slice(0, 7);
        },
        error: () => {
          this.toastService.error('Failed to fetch past meetings');
          this.spinnerService.removeSpinner();
        },
        complete: () => {
          this.spinnerService.removeSpinner();
        },
      });
    },
    'Future Meetings': () => {
      this.meetingsService.getFutureMeetings().subscribe({
        next: (res: any[]) => {
          this.currentList = res;
          this.paginatorData = {
            length: res.length,
            pageIndex: 0,
          };
          this.displayList = res.slice(0, 7);
        },
        error: () => {
          this.toastService.error('Failed to fetch future meetings');
          this.spinnerService.removeSpinner();
        },
        complete: () => {
          this.spinnerService.removeSpinner();
        },
      });
    },
    'Current Meetings': () => {
      this.meetingsService.getCurrentMeetings().subscribe({
        next: (res: any[]) => {
          this.currentList = res;
          this.paginatorData = {
            length: res.length,
            pageIndex: 0,
          };
          this.displayList = res.slice(0, 7);
        },
        error: () => {
          this.toastService.error('Failed to fetch current meetings');
          this.spinnerService.removeSpinner();
        },
        complete: () => {
          this.spinnerService.removeSpinner();
        },
      });
    },
  };

  onTabSelectionChange(event: MatTabChangeEvent) {
    this.currentList = [];
    this.selectedTab = event.tab.textLabel;
    let tab = this.getCurrentTab();
    this.actionBtnList = this.actionBtns[tab];
  }

  animationDone() {
    this.getTabData[this.selectedTab]();
  }

  getCurrentTab(): string {
    if (this.selectedTab == 'Future Meetings') {
      return 'future';
    } else if (this.selectedTab == 'Current Meetings') {
      return 'current';
    } else {
      return 'past';
    }
  }

  actionBtnClickEvent(event: any) {
    console.log(event.name);
    switch (event.name.trim()) {
      case 'View Summary': {
        console.log(event.value);
        
        this.showSummary(event.value.meetingSummary);
        break;
      }
      case 'Delete': {
        this.deleteMeeting(event.value);
        break;
      }
      case 'Add Summary':
      case 'Edit Summary': {
        this.updateSummary(event.value);
        break;
      }
      case 'Update': {
        this.editMeeting(event.value);
        break;
      }
      case 'View Attendees':{
        this.getAllMeetingAttendees(event.value);
        break;
      }
      case 'Mark Attendance':{
        this.markAttendance(event.value);
        break;
      }
      // case 'Add': {
      //   this.addMeetingDialog();
      //   break;
      // }
    }

  }

  markAttendance(meet: Meeting) {
    const dialogRef = this.dialog.open(MeetingDialogComponent, {
      data: {
        data: meet,
        type: 'attendance',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        let attendance = {
          meetingId: result.meetingId
        }
        this.meetingsService.saveAttendance(result).subscribe({
          next: (response) => {
            this.toastService.success(response.message);
          },
          error: (error) => {
            console.log(error);
            this.toastService.error(error.error.message);
            this.spinnerService.removeSpinner();
          },
          complete: () => {
            this.getTabData[this.selectedTab]();
            this.spinnerService.removeSpinner();
          },
        });
        //this.updateMeeting(result);
      }
    });
  }
  getAllMeetingAttendees(meeting: Meeting) {
    const dialogRef = this.dialog.open(MeetingDialogComponent, {
      data: {
        data: meeting,
        type: 'viewAttendees',
      },
    });
  }

  showSummary(summary: string) {
    console.log(summary);
    
    this.dialog.open(MeetingDialogComponent, {
      data: {
        data: summary,
        type: 'viewsummary',
      },
      disableClose: true,
    });
  }

  addMeetingDialog() {
    const dialogRef = this.dialog.open(MeetingDialogComponent, {
      data: {
        type: 'add',
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.createMeeting(result);
      }
    });
  }

  editMeeting(meet: Meeting){
    console.log(meet);
    
    const dialogRef = this.dialog.open(MeetingDialogComponent, {
      data: {
        type: 'update',
        data: meet
      },
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        
        this.updateMeeting(result,'updateMeeting');
      }
    });
  }

  createMeeting(meet: Meeting) {
    console.log(meet);
    
    this.meetingsService.createMeeting(meet).subscribe({
      next: (response) => {
        this.toastService.success(response.message);
      },
      error: (error) => {
        console.log(error);
        this.toastService.error(error.error.message);
        this.spinnerService.removeSpinner();
      },
      complete: () => {
        this.getTabData[this.selectedTab]();
        this.spinnerService.removeSpinner();
      },
    });
  }

  deleteMeeting(meeting: Meeting) {
    this.meetingsService.deleteMeeting(meeting.meetingId).subscribe({
      next: (res) => {},
      error: () => {
        this.toastService.error('Meeting deletion failed');
        this.spinnerService.removeSpinner();
      },
      complete: () => {
        this.getTabData[this.selectedTab]();
        this.toastService.success('Meeting deleted successfully');
        this.spinnerService.removeSpinner();
      },
    });
  }

  updateMeeting(meet: Meeting,type: string) {
    this.meetingsService.updateMeeting(meet, [meet.meetingId],type).subscribe({
      next: (res) => {},
      error: (error) => {
        this.toastService.error('Meeting Update Failed');
        this.spinnerService.removeSpinner();
      },
      complete: () => {
        this.toastService.success('Meeting updated successfully');
        this.getTabData[this.selectedTab]();
        this.spinnerService.removeSpinner();
      },
    });
  }

  updateSummary(meet: Meeting) {
    const dialogRef = this.dialog.open(MeetingDialogComponent, {
      data: {
        data: meet,
        type: 'updateSummary',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateMeeting(result,'updateSummary');
      }
    });
  }
}
