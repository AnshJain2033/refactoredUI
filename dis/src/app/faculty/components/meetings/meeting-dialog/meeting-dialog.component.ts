import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/services/auth.service';
import { FacultyService } from 'src/app/services/faculty.service';
import { MeetingsService } from 'src/app/services/meetings.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { Meeting } from '../constants';

@Component({
  selector: 'app-meeting-dialog',
  templateUrl: './meeting-dialog.component.html',
  styleUrls: ['./meeting-dialog.component.scss']
})
export class MeetingDialogComponent {

  type: string = '';
  attendees: any[]=[];
  facultyList: any[] = [];
  constructor(public dialogRef: MatDialogRef<MeetingDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private facultyService: FacultyService, private toastService: HotToastService, private spinnerService: SpinnerService, private authService: AuthService,private meetingsService: MeetingsService){
    this.type = data.type;
  }

  ngOnInit():void{
    if (this.type == 'viewAttendees'){
      let data: Meeting = this.data.data;
      console.log(data.meetingId);
      this.meetingsService.getPastMeetingAttendees(data.meetingId).subscribe({
        next: (res: any[]) => {
          console.log(res);
          this.facultyService.getFacultyData().subscribe(fac=>{  
            console.log(fac);
            this.facultyList = fac;
            
          for(let attendee of res){
            console.log(attendee.meetingAttendants.attendantId);
            
            for(let faculty of this.facultyList){
              console.log(faculty);
              
              if(attendee.meetingAttendants.attendantId === faculty.userId){
                console.log(faculty.name);
                
                this.attendees.push(faculty);
                break;
              }
            }
          }
          console.log(this.attendees);
        });
          //this.attendees = res;
        },
        error: () => {
          this.toastService.error('Failed to fetch attendees');
          this.spinnerService.removeSpinner();
        },
        complete: () => {
          this.spinnerService.removeSpinner();
        },
      });
    }
  }
}
