import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { cloneDeep } from 'lodash';
import { FacultyService } from 'src/app/services/faculty.service';
import { IndustryVisitService } from 'src/app/services/industry-visit.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-industry-visit-edit-dialog',
  templateUrl: './industry-visit-edit-dialog.component.html',
  styleUrls: ['./industry-visit-edit-dialog.component.scss']
})
export class IndustryVisitEditDialogComponent implements OnInit{

  type: string = '';
  formData : any ;
  facultyList: any[] = [];
  todayDate = new Date();
  participants: string[] = ['BE-I', 'BE-II', 'BE-III', 'BE-IV', 'ME-I', 'ME-II'];
  industryVisit: any;
  statusOptions : any = ["Pending","Completed"];
  pendingStatusOptions : any = ["Upcoming"];

  notesheet : any ;
  attendanceSheet: any;
  photosSheet: any;

  editIndustryForm: any = this.fb.group({
    
    date: ['', [Validators.required]],
    time: ['', [Validators.required]],
    coordinator1: ['', [Validators.required]],
    coordinator2: ['', [Validators.nullValidator]],
    participants: ['', [Validators.required]],

  });

  updateVisitStatus:any = this.fb.group({
    status: ['', [Validators.required]],
    file: ['', [Validators.required]],
  });

  updateUpcomingVisitStatus:any = this.fb.group({
    status: ['', [Validators.required]],
    attendanceFile: ['', [Validators.nullValidator]],
    photos: ['', [Validators.nullValidator]],
    file: ['', [Validators.nullValidator]]
  });
  constructor(public dialogRef: MatDialogRef<IndustryVisitEditDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private toastService: HotToastService, private spinnerService: SpinnerService, private facultyService: FacultyService, private industryService : IndustryVisitService) {
    this.type = data.type;
    this.formData = this.data.data;
    console.log(this.formData);
    
    
  }

  
  ngOnInit(): void {
    for (let key in this.fetchData) {
      this.fetchData[key]();
    }
  }

  fetchData: any = {
    getFacultyData: () => {
      try {
        this.facultyService.getFacultyData().subscribe((Response) => {
          this.facultyList = Response;
          console.log(this.facultyList);
        });
        this.spinnerService.removeSpinner();
      } catch (error) {
        this.toastService.error('Failed');
      }
    },
    getIndustryVisitById: async () => {
      try {
        this.industryService.getIndustryVisitById(this.formData.industryVisitId).subscribe((Response) => {
          this.industryVisit = Response;
          this.industryVisit.time = this.convertTime(this.industryVisit.time)
        //   this.industryVisit.participants = this.industryVisit.participants.split(',');
          // this.industryVisit.coordinator1 = this.industryVisit.coordinator1.split(',');
          // this.industryVisit.coordinator2 = this.industryVisit.coordinator2.split(',');
          console.log(this.industryVisit);
          this.formData = this.industryVisit;
          console.log(this.formData);
          this.editIndustryForm.reset(this.formData);
          this.editIndustryForm.updateValueAndValidity();
        });
        this.spinnerService.removeSpinner();
      } catch (error) {
        this.toastService.error('Failed');
      }
    },
  };

  convertTime(timeStr:any){
    // const [time, modifier] = timeStr.split(' ');
    let modifier;
    let [hours, minutes] = timeStr.split(':');
    if (hours >= '12') {
       hours =  parseInt(hours, 10) - 12;
       modifier = 'PM';
    }
    else {
       hours = parseInt(hours, 10);
       modifier = 'AM';
    }
    return `${hours}:${minutes} ${modifier}`;
   }
 
  prepareData(form: any) {
    let obj = cloneDeep(form.getRawValue());

    // Trim strings
    for (let key in obj) {
      obj = {
        ...obj,
        [key]: typeof obj[key] == 'string' ? obj[key].trim() : obj[key],
      };
    }
    return obj;
  }
  convertTimeTo24HFormat(timeStr:any){
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

  selectFileInput(event: any){
    console.log(event.target.files);
		this.notesheet=event.target.files[0];
	}

  selectAttendanceFileInput(event: any){
    console.log(event.target.files);
		this.attendanceSheet=event.target.files[0];
	}

  selectPhotosFileInput(event: any){
    console.log(event.target.files);
		this.photosSheet=event.target.files[0];
	}

  updateVisit() {
  console.log(this.editIndustryForm.getRawValue());
    let formData = this.editIndustryForm.getRawValue();
    let time = this.convertTimeTo24HFormat(formData.time);
    let date:string = ""; //= typeof(formData.date)=='string'?formData.date:formData.date.toLocaleDateString();
    let data;
    if(typeof(formData.date)=='string'){
      let [year, month, date] = formData.date.split('-');
      date = month+"/"+date+"/"+year;
      console.log(typeof date);
      data={
        date: date,
      time: time,
      
      participants: formData.participants,
      
      coordinator2: formData.coordinator2,
      coordinator1: formData.coordinator1,
       
      }
      
    }else{
      date = formData.date.toLocaleDateString();
      data={
        date: date,
      time: time,
      participants: formData.participants,
      
      coordinator2: formData.coordinator2,
      coordinator1: formData.coordinator1,
       
      }
    }
    console.log(date);

  
    console.log(this.editIndustryForm);

    // let data = { ...this.prepareData(this.editIndustryForm) };
    console.log(data);
    let response: any = { message: '' };
    //try {
      this.industryService.updateIndustryVisit(data , [this.formData.industryVisitId]).subscribe({
        next: (result: any) => {
          this.toastService.success(result.message);
        },
        error: (error) => {
          console.log(error);
          this.toastService.error('Unable to edit Industry Visit. Please try again.');
          this.spinnerService.removeSpinner();
        },
        complete: () => {
         // this.fetchData['getAllIndustryVisitsByStatus']();
          this.spinnerService.removeSpinner();
        },
      });
    // } catch (error) {
    //   this.spinnerService.removeSpinner();
    //   this.toastService.error('Unable to edit Industry Visit. Please try again.');
    //   return;
    // }
    // if (response) this.toastService.success(response.message);
    // this.spinnerService.removeSpinner();

    this.dialogRef.close(data);
  }

  async updateStatus(){
    let status = { ...this.prepareData(this.updateVisitStatus) };
    console.log("this is status" , status.status);
    const formData= new FormData();
    console.log(this.notesheet);
    formData.append('file',this.notesheet);
    //formData.append('status',status.status);
    console.log(formData);
    let response: any = { message: '' };
    try {
      response = await this.industryService.updateIndustryVisitByStatus(status.status,[this.formData.industryVisitId],formData); 
    
       
    } catch (error) {
      console.log(error)
      this.spinnerService.removeSpinner();
      this.toastService.error('Unable to update status. Please try again.');
      return;
    }
    if (response) this.toastService.success(response.message);
    this.spinnerService.removeSpinner();

    this.dialogRef.close(status);
  }

  async editUpcomingVisitStatus(){
    console.log(this.updateUpcomingVisitStatus.value.status);
   
    console.log(this.attendanceSheet);
    console.log(this.photosSheet);
    let status=this.updateUpcomingVisitStatus.value.status;
    const formData= new FormData();
    if(status.toLowerCase() === 'pending'){
      formData.append('file',this.notesheet);
    }else{
      formData.append('file',this.attendanceSheet);
      formData.append('photos',this.photosSheet);
    }
    let response3: any = { message: '' };
    try {
      response3 = await this.industryService.updateIndustryVisitByStatus(status,[this.formData.industryVisitId],formData); 
    
       
    } catch (error) {
      console.log(error)
      this.spinnerService.removeSpinner();
      this.toastService.error('Unable to update status. Please try again.');
      return;
    }
    if (response3) this.toastService.success(response3.message);
    this.spinnerService.removeSpinner();

    this.dialogRef.close(status);

  }

  closeDialog() {
    this.dialogRef.close();
  }
}
