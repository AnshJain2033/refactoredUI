import { Component, ElementRef, Inject, ViewChild, ViewChildren } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { FacultyService } from 'src/app/services/faculty.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { AuthService } from 'src/app/services/auth.service';
import { Meeting } from '../constants';
import { MeetingsService } from 'src/app/services/meetings.service';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-meeting-dialog',
  templateUrl: './meeting-dialog.component.html',
  styleUrls: ['./meeting-dialog.component.scss']
})
export class MeetingDialogComponent {

  @ViewChildren('all') private all : MatOption = {} as MatOption;
  constructor(public dialogRef: MatDialogRef<MeetingDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private facultyService: FacultyService, private toastService: HotToastService, private spinnerService: SpinnerService, private authService: AuthService,private meetingsService: MeetingsService){
    this.type = data.type;
  }

  type: string = '';
  summary: string = '';
  facultyList: any[] = [];
  attendees: any[]=[];
  presentAttendees: any[]=[];
  todayDate:Date = new Date();
  meetingForm:any;
  allFaculties: any[] = [];
  allSelected = false;

  //meetingForm: FormGroup = new FormGroup() ;
  // = this.fb.group({
  //   objective: ["this.data.meetingObjective", [Validators.required]],
  //   venue: [this.data.venue, [Validators.required]],
  //   date: ['', [Validators.required]],
  //   time: ['', [Validators.required]],
  //   endTime: ['', [Validators.required]],
  //   attendees: ['', [Validators.required]],
  // });

  

  ngOnInit(): void {
    console.log(this.data.data);
    
    this.meetingForm = this.fb.group({
      objective: ['', [Validators.required]],
      venue: ['', [Validators.required]],
      date: ['', [Validators.required]],
      time: ['', [Validators.required]],
      endTime: ['', [Validators.required]],
      attendees: ['', [Validators.required]],
    });
    //this.getFacultyData();
    if (this.type == 'viewsummary') {
      this.summary = this.data.data;
    }

    if(this.type =='updateSummary'){
      this.summary = this.data.data.meetingSummary;
      console.log(this.summary);
      
    }

    if (this.type == 'update' || this.type == 'add') {
      this.getFacultyData();
    }

    if (this.type == 'update') {
      let data: Meeting = this.data.data;
      let formData = {
        objective: data.meetingObjective,
        venue: data.meetingVenue,
        date: data.meetingDate,
        time: data.meetingTime,
        endTime: data.meetingEndTime,
        duration: data.meetingDuration,
        attendees: data.meetingAttendants,
      };
      this.meetingForm.reset(formData);
      this.meetingForm.updateValueAndValidity();
    }

    if (this.type == 'attendance') {
      let data: Meeting = this.data.data;
      console.log(data.meetingId);
      
      this.meetingsService.getAllAttendees(data.meetingId).subscribe({
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

    if(this.type == 'edit'){
      console.log(this.data);
      
    }

  }

  getFacultyData() {
    this.facultyService.getFacultyData().subscribe({
      next: (res: any[]) => {
        console.log(res);
        
        this.facultyList = res;
      },
      error: () => {
        this.toastService.error('Failed to fetch faculties');
        this.spinnerService.removeSpinner();
      },
      complete: () => {
        this.spinnerService.removeSpinner();
      },
    });
  }

  getParsedData() {
    if (this.type != 'updateSummary'){
      let formData = this.meetingForm.getRawValue();
      console.log(formData);
      
      if(this.allSelected){
        formData.attendees = this.allFaculties;
      }
    // if (this.type == 'updateSummary'){
    //   return formData.summary;
    // }else{
    //let duration = formData.time
    
    console.log(formData.date.toLocaleDateString());
    let startTime = this.convertTime(formData.time)
    let endTime = this.convertTime(formData.endTime)
    return {
      meetingDate: formData.date.toLocaleDateString(),
      meetingTime: startTime,
      hostId: this.authService.getUsername(),
      meetingObjective: formData.objective,
      meetingVenue: formData.venue,
      meetingEndTime:  endTime,
      meetingDuration: this.findTimediff(startTime,endTime),
      meetingAttendants: formData.attendees,
    };
    }else{
      return null;
    }
  }

  convertTime(timeStr:any){
    const [time, modifier] = timeStr.split(' ');
   let [hours, minutes] = time.split(':');
   if (hours === '12') {
      hours = '00';
   }
   if (modifier === 'PM') {
      hours = parseInt(hours, 10) + 12;
   }
   return `${hours}:${minutes}`;
  }

removeColon(s:string)
{
    if (s.length == 4) 
        s= s.replace(":", "");
     
    if (s.length == 5) 
        s= s.replace(":", "");
     
    return parseInt(s);
}
 
// Main function which finds difference
findTimediff( start:string,  end:string)
{
 
    // change string (eg. 2:21 --> 221, 00:23 --> 23)
     let startTime = this.removeColon(start);
    
     let endTime = this.removeColon(end);
     
 
    // difference between hours
     let hourDiff = (endTime / 100 - startTime / 100);
    if(hourDiff<1){
      hourDiff=0;
    }
    // difference between minutes
    let minDiff = (endTime % 100 - (startTime % 100));
 
    if (minDiff < 0) {
       // hourDiff++;
        minDiff = minDiff + 60;
    }
  
    // convert answer again in string with ':'
    let res = (Math.round(hourDiff)).toString() + ':' + (minDiff).toString();
    return res;
}


selectAllFaculties(){
  console.log(this.allSelected);
  
  //
  this.allSelected = !this.allSelected;
  this.allFaculties = [];
  if(this.allSelected){
  for(let faculty of this.facultyList){
    this.allFaculties.push(faculty.userId);
  }
  this.meetingForm.controls.attendees.patchValue([...this.allFaculties,0]);
  }else{
  this.meetingForm.controls.attendees.patchValue([]);
  }
  console.log(this.meetingForm.controls.attendees.value);

  
  
//}
}

  saveMeeting() {
    console.log(this.data.data);
    
    let data = { ...this.data.data, ...this.getParsedData() };
    console.log(data);
    
    if (this.type == 'updateSummary') {
      console.log(this.summary);
      let date = this.convertStringDateFormat(data.meetingDate);
      data = {
        ...this.data.data,
        meetingDate: date,
        meetingSummary: this.summary,
        hostId: this.authService.getUsername(),
      };
    }
    this.dialogRef.close(data);
  }

  convertStringDateFormat(formData:any){
    let [year, month, date] = formData.split('-');
      date = month+"/"+date+"/"+year;
      return date;
  }
  updateMeeting(){
    console.log(this.meetingForm.getRawValue());
    let formData = this.meetingForm.getRawValue();
    let startTime = this.convertTime(formData.time)
    let endTime = this.convertTime(formData.endTime)
    let data;
    if(typeof(formData.date)=='string'){
      //let [year, month, date] = formData.date.split('-');
      let date = this.convertStringDateFormat(formData.date);
      console.log(typeof date);
      data={
        //date: date,
        meetingDate: date,
        meetingTime: startTime,
        hostId: this.authService.getUsername(),
        meetingObjective: formData.objective,
        meetingVenue: formData.venue,
        meetingEndTime:  endTime,
        meetingDuration: this.findTimediff(startTime,endTime),
        meetingAttendants: formData.attendees,
        meetingId: this.data.data.meetingId
       
      }
      
    }else{
      //date = formData.date.toLocaleDateString();
      data={
        meetingDate: formData.date.toLocaleDateString(),
        meetingTime: startTime,
        hostId: this.authService.getUsername(),
        meetingObjective: formData.objective,
        meetingVenue: formData.venue,
        meetingEndTime:  endTime,
        meetingDuration: this.findTimediff(startTime,endTime),
        meetingAttendants: formData.attendees,
        meetingId: this.data.data.meetingId
       
      }
    }
    // let data={
    //   meetingDate: formData.date.toLocaleDateString(),
    //   meetingTime: startTime,
    //   hostId: this.authService.getUsername(),
    //   meetingObjective: formData.objective,
    //   meetingVenue: formData.venue,
    //   meetingEndTime:  endTime,
    //   meetingDuration: this.findTimediff(startTime,endTime),
    //   meetingAttendants: formData.attendees,
    //   meetingId: this.data.data.meetingId
    // }
    this.dialogRef.close(data);
  }

  markAttendance(attendees: MatListOption[]){
    console.log(this.data.data.meetingId);
    console.log(attendees);
    
    this.presentAttendees = attendees;
  }

  allPresent = false;
  selectAll(){
    this.allPresent = !this.allPresent;
    console.log(this.attendees);
    
   // this.attendeeList.selectAll();
    this.presentAttendees = this.attendees;
  }


  saveAttendance(){
    let attendees = [];
    if(this.allPresent){
      for(let att of this.presentAttendees)
        att.isPresent = 1;

      attendees = this.presentAttendees;
    }else{
    for(let att of this.presentAttendees){
      att.value['isPresent'] = 1;
   //   console.log(att.value);
      
      attendees.push(att.value);
    }
    console.log(this.attendees);
    
    for(let att of this.attendees){
      let flag = 0;
      for(let pre of this.presentAttendees){
        if(att.userId === pre.value['userId']){
          flag =1;
          break;
        }
      }
      if(flag == 0){
        att.isPresent = 0;
        attendees.push(att);
      }
    }
  }
    console.log(attendees);
    
    let data = {
      meetingId: this.data.data.meetingId,
      attendees: attendees
      //allAttendees: this.attendees
    };
    this.dialogRef.close(data);
  }
  closeDialog() {
    this.dialogRef.close();
  }
}
