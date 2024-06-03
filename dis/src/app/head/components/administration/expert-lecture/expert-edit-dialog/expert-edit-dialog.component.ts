import { Component, Inject, ViewChildren } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { cloneDeep } from 'lodash';
import { ExpertLectureService } from 'src/app/services/expert-lecture.service';
import { FacultyService } from 'src/app/services/faculty.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-expert-edit-dialog',
  templateUrl: './expert-edit-dialog.component.html',
  styleUrls: ['./expert-edit-dialog.component.scss']
})
export class ExpertEditDialogComponent {

  @ViewChildren('all') private all : MatOption = {} as MatOption;

  formData : any;
  //participants: string[] = ['1 YEAR', '2 YEAR', '3 YEAR', '4 YEAR'];
  type: string = '';
  facultyList: any[] = [];
  expertList: any[] = [];
  expertLecture: any;
  statusOptions : any = ["Pending","Upcoming","Completed"];
  notesheet : any ;
  attendanceSheet: any;
  photosSheet: any;
 // pendingNote: any;
  uselessParameter: any;
  allFaculties: any[] = [];
  allSelected = false;
  todayDate:Date = new Date();

  updateExpertLectureForm:any = this.fb.group({
   
    date: ['', [Validators.required]],
    time: ['', [Validators.required]],
    venue: ['', [Validators.required]],
    audience: ['', [Validators.required]],
    honorarium: ['', [Validators.required]],
    conveyance: ['', [Validators.required]],
    coordinator: ['', [Validators.required]],
  });

  updateLectureStatus:any = this.fb.group({
    status: ['', [Validators.required]],
    file: ['', [Validators.required]],
  });

  updateUpcomingLectureStatus:any = this.fb.group({
    status: ['', [Validators.required]],
    attendanceFile: ['', [Validators.nullValidator]],
    photos: ['', [Validators.nullValidator]],
    file: ['', [Validators.nullValidator]]
  });

  options: any = [
    {
      label: 'BE-I',
      value: 'BE-I',
    },
    {
      label: 'BE-II',
      value: 'BE-II',
    },
    {
      label: 'BE-III',
      value: 'BE-III',
    },
    {
      label: 'BE-IV',
      value: 'BE-IV',
    },
    {
      label: 'ME-I',
      value: 'ME-I',
    },
    {
      label: 'ME-II',
      value: 'ME-II',
    },
  ];


  ngOnInit(): void {
    this.Init();
    console.log("this is record data" , this.formData);
  } 

  constructor(public dialogRef: MatDialogRef<ExpertEditDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private expertService: ExpertLectureService,private facultyService: FacultyService, private toastService: HotToastService, private spinnerService: SpinnerService) {
    this.type = data.type;
    this.formData = this.data.data;
    
  }

  async Init() {
    for (let key in this.fetchData) {
      await this.fetchData[key]();
    }
    console.log(this.data.data);
  }

  fetchData: any = {
    getFacultyData: async () => {
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
    getExperts: async () => {
      try {
        this.expertService.getExperts().subscribe((Response) => {
          this.expertList = Response;
          console.log(this.expertList);
        });
        this.spinnerService.removeSpinner();
      } catch (error) {
        this.toastService.error('Failed');
      }
    },
    getExpertLectureById: async () => {
      try {
        this.expertService.getExpertLectureById(this.formData.expertLectureId).subscribe((Response) => {
          this.expertLecture = Response;
          this.expertLecture.time = this.convertTime(this.expertLecture.time)
          this.expertLecture.audience = this.expertLecture.audience.split(',');
          this.expertLecture.coordinator = this.expertLecture.coordinator.split(',');
          console.log(this.expertLecture);
          this.formData = this.expertLecture;
          console.log(this.formData);
          this.updateExpertLectureForm.reset(this.formData);
          this.updateExpertLectureForm.updateValueAndValidity();
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

  async editExpert() {
    
    let status = { ...this.prepareData(this.updateLectureStatus) };
    console.log("this is status" , status.status);
    const formData= new FormData();
    console.log(this.notesheet)
    // let data={
    //   file: this.notesheet,
    //   status: status.status
    // }
    formData.append('file',this.notesheet);
    //formData.append('status',status.status);
    console.log(formData);


  
    let response: any = { message: '' };
    try {
      response = await this.expertService.updateExpertLectureByStatus(status.status,[this.formData.expertLectureId],formData); 
    
       
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

  async editUpcomingLectureStatus(){
    console.log(this.updateUpcomingLectureStatus.value.status);
   
    console.log(this.attendanceSheet);
    console.log(this.photosSheet);
    let status=this.updateUpcomingLectureStatus.value.status;
    const formData= new FormData();
    if(status.toLowerCase() === 'pending'){
      formData.append('file',this.notesheet);
    }else{
      formData.append('file',this.attendanceSheet);
    }
    let response3: any = { message: '' };
    try {
      response3 = await this.expertService.updateExpertLectureByStatus(status,[this.formData.expertLectureId],formData); 
    
       
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

  async onUpdateExpertLecture() {
    console.log(this.updateExpertLectureForm.getRawValue());
    let formData = this.updateExpertLectureForm.getRawValue();
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
      venue: formData.venue,
      audience: formData.audience,
      honorarium: formData.honorarium,
      conveyance: formData.conveyance,
      coordinator: formData.coordinator,
       
      }
      
    }else{
      date = formData.date.toLocaleDateString();
      data={
        date: date,
      time: time,
      venue: formData.venue,
      audience: formData.audience,
      honorarium: formData.honorarium,
      conveyance: formData.conveyance,
      coordinator: formData.coordinator,
       
      }
    }
    console.log(date);
   
   


    //let data = { ...this.prepareData(this.updateExpertLectureForm),  };
    
    console.log(data);
    let response2: any = { message: '' };
    try {
      response2 = await this.expertService.editExpertLecture(data , [this.formData.expertLectureId]) ;
      // response = await this.httpService.postPromiseRequest('editExpertLecture', data , [this.formData.expertLectureId]);
       
    } catch (error) {
      console.log(error)
      this.spinnerService.removeSpinner();
      this.toastService.error('Unable to update expert lecture. Please try again.');
      return;
    }
    if ( response2) this.toastService.success(  response2.message);
    this.spinnerService.removeSpinner();

    this.dialogRef.close(data);
  }


  //this.meetingForm.reset(formData);
    //  this.meetingForm.updateValueAndValidity();
  

  closeDialog() {
    this.dialogRef.close();
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
    this.updateExpertLectureForm.controls.coordinator.patchValue([...this.allFaculties,0]);
    }else{
    this.updateExpertLectureForm.controls.coordinator.patchValue([]);
    }
    console.log(this.updateExpertLectureForm.controls.coordinator.value);
  }
  
  
}
