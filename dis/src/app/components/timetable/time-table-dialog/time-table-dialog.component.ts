import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TimetableService } from 'src/app/services/timetable.service';
import { Moment } from 'moment';
import * as moment from 'moment';

@Component({
  selector: 'app-time-table-dialog',
  templateUrl: './time-table-dialog.component.html',
  styleUrls: ['./time-table-dialog.component.scss']
})
export class TimeTableDialogComponent implements OnInit{


  type: string ="";
  facultyList:any[] =[];
  days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  // filteredDays: any[] = [];
  // public dayFilter: FormControl<string> = new FormControl<string>('');

  scheduleForm:any = this.fb.group({
    subCode: new FormControl('', [ Validators.required]),
    subName: new FormControl('', [ Validators.required]),
    sessionStart: new FormControl('', [ Validators.required]),
    sessionEnd: new FormControl('', [ Validators.required]),
    day: new FormControl('', [ Validators.required]),
    faculty: new FormControl('', [ Validators.required]),
    labAtt: new FormControl('', [ Validators.nullValidator]),
    ta: new FormControl('', [ Validators.nullValidator]),
    // dayFilter: new FormControl('', [ Validators.nullValidator]),
    
  });

  
  constructor(public dialogRef: MatDialogRef<TimeTableDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private ttService: TimetableService){
    console.log(data.data);
    console.log(data.ttTypes);
    this.type =data.type;
   // this.filteredDays = this.days.slice();
    
  }

  ngOnInit(): void {
    // this.scheduleForm.valueChanges.subscribe(()=>{this.filterDays();});
  }
  // onKey(event:any, list: any){
  //   console.log(event);
    
  //   this.days = this.days.filter(option => option.toLowerCase().startsWith(event.value));
  // }

  // filterDays(){
  //   let search = this.scheduleForm.controls.dayFilter.value;
  //   this.filteredDays = this.days.filter(day=>day.toLowerCase().includes(search));
  // }
  closeDialog(){
    this.dialogRef.close();
  }
}
