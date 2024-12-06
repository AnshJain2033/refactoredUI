import { Component,OnInit,ViewChild,Inject, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTabGroup } from '@angular/material/tabs';
import { HotToastService } from '@ngneat/hot-toast';
import { ExpertLectureService } from 'src/app/services/expert-lecture.service';
import { FacultyService } from 'src/app/services/faculty.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { cloneDeep } from 'lodash';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-expert-dialog',
  templateUrl: './expert-dialog.component.html',
  styleUrls: ['./expert-dialog.component.scss']
})
export class ExpertDialogComponent implements OnInit {
  

  @ViewChild('tabGroup') tabGroup?: MatTabGroup;

  @ViewChildren('all') private all : MatOption = {} as MatOption;

  currentTab: any = 0;
  addExpertForm:any;
  todayDate:Date = new Date();
  selectedExpert: any = {};
  selectedExpertDob: Date = new Date();
  selectedExpertDobStr: any ='';
  participants: string[] = ['1 YEAR', '2 YEAR', '3 YEAR', '4 YEAR'];
  type: string = '';
  facultyList: any[] = [];
  expertList: any[] = [];
  expertLecturesList: any[] = [];
  allFaculties: any[] = [];
  allSelected = false;

  allAudience: any[] = [];
  allAudienceSelected = false;
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


  addExpertLectureForm:any = this.fb.group({
    topic: ['', [Validators.required]],
    expertName: ['', [Validators.required]],
    expertDesignation: ['', [Validators.required]],
    date: ['', [Validators.required]],
    time: ['', [Validators.required]],
    venue: ['', [Validators.required]],
    audience: ['', [Validators.required]],
    honorarium: ['', [Validators.nullValidator]],
    conveyance: ['', [Validators.nullValidator]],
    coordinator: ['', [Validators.required]],
  });

  editExpertForm: FormGroup = this.fb.group({
    expertId: ['', [Validators.required]],
    name: ['', [Validators.required]],
    designation: ['', [Validators.required]],
    email: ['', [Validators.required]],
    mobileNo: ['', [Validators.required]],
    dob: ['', [Validators.nullValidator]],
    fathersName: ['', [Validators.required]],
    officeAddress: ['', [Validators.required]],
    pinCode: ['', [Validators.required]],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
    country: ['', [Validators.required]],
    aadhaarNo: ['', [Validators.required]],
    panNo: ['', [Validators.required]],
    gstNo: ['', [Validators.required]],
    bankName: ['', [Validators.required]],
    accountNo: ['', [Validators.required]],
    ifsc: ['', [Validators.required]],
    uniqueTeqipId: ['', [Validators.required]],
    type: ['', [Validators.required]],
  });


  ngOnInit(): void {
    this.Init();
    this.addExpertForm = this.fb.group({
      name: ['',[Validators.required]],
      designation: ['', [Validators.required]],
      email: ['', [Validators.required]],
      mobileNo: ['', [Validators.required
        //, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"), Validators.minLength(10),Validators.maxLength(10)
      ]],
      dob: ['', [Validators.required]],
      fathersName: ['', [Validators.nullValidator]],
      officeAddress: ['', [Validators.required]],
      pinCode: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      aadhaarNo: ['', [Validators.required]],
      panNo: ['', [Validators.required]],
      gstNo: ['', [Validators.nullValidator]],
      bankName: ['', [Validators.required]],
      accountNo: ['', [Validators.required]],
      ifsc: ['', [Validators.required]],
      uniqueTeqipId: ['', [Validators.required]],
      type: ['', [Validators.required]],
    });
  }

  constructor(public dialogRef: MatDialogRef<ExpertDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private facultyService: FacultyService, private expertService: ExpertLectureService, private toastService: HotToastService, private spinnerService: SpinnerService) {
    this.type = data.type;
  }

  onTabButtonClick(): void {
    const selectedIndex = this.tabGroup?.selectedIndex;
    this.currentTab = selectedIndex;
    console.log(`Selected tab index: ${selectedIndex}`);
  }

  async Init() {
    for (let key in this.fetchData) {
      await this.fetchData[key]();
    }
    // console.log(this.courseOptions)
    // console.log(this.subjectList)
  }

  async onSelect(event: any) {
    this.selectedExpert = event.value;
    console.log(event);
    console.log(this.selectedExpert);
    console.log(typeof this.selectedExpert['dob']);
    let d = new Date(this.selectedExpert['dob']).toLocaleDateString();
    console.log(d);
    this.selectedExpertDobStr = d;
    this.selectedExpertDob = new Date(d);
    //this.editExpertForm.controls["dob"].setValue(this.selectedExpertDob);
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
    getExpertLectures: async () => {
      try {
        this.expertService.getExpertLectures().subscribe((Response) => {
          this.expertLecturesList = Response;
          console.log(this.expertLecturesList);
        });
        this.spinnerService.removeSpinner();
      } catch (error) {
        this.toastService.error('Failed');
      }
    },
  }

  prepareData(form: any) {
    let obj = cloneDeep(form.getRawValue());
    console.log(obj);
    
    // Trim strings
    for (let key in obj) {
      obj = {
        ...obj,
        [key]: typeof obj[key] == 'string' ? obj[key].trim() : obj[key],
      };
    }
    return obj;
  }

  async onAddExpert() {
    console.log(this.addExpertForm.controls);
    let data = { ...this.prepareData(this.addExpertForm) };
    console.log(data);
    let response: any = { message: '' };
    try {
      response = await this.expertService.addExpert(data);
    } catch (error) {
      this.spinnerService.removeSpinner();
      this.toastService.error('Unable to Add expert. Please try again.');
      return;
    }
    if (response) this.toastService.success(response.message);
    this.spinnerService.removeSpinner();

    this.dialogRef.close(data);
  }

  selectedExpertDesignation: any = '';
  selectedExpertName: any = '';
  handleSelect(event: any) {
    this.selectedExpertDesignation = event.value.designation;
    this.selectedExpertName = event.value.name;
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



  async onAddExpertLecture() {
    console.log(this.addExpertLectureForm);
    console.log(this.addExpertLectureForm.getRawValue());
    const expertDesignation = this.selectedExpertDesignation;
    const expertName = this.selectedExpertName;
    let coordinators = this.addExpertLectureForm.getRawValue().coordinator;
    console.log(coordinators);
    
    let coordinatorList = [];
    console.log(this.addExpertLectureForm.controls['expertName'].value);
    
    console.log(this.selectedExpertName);
    
    console.log(this.selectedExpertDesignation);

    for(let coordinator of coordinators){
      for(let fac of this.facultyList){
        if(fac.userId === coordinator){
          coordinatorList.push(fac.name);
          break;
        }
      } 
    }
  console.log(coordinatorList);
  

  //this.addExpertLectureForm.controls['coordinator'] = coordinatorList;
   // console.log( Date.parse(this.addExpertLectureForm.controls['date'].value!= null? this.addExpertLectureForm.controls['date'].value:""));
    
    //this.addExpertLectureForm.controls['date'] = this.addExpertLectureForm.controls['date'].value.toLocaleDateString()
    let data = { ...this.prepareData(this.addExpertLectureForm), expertDesignation, expertName,coordinator: coordinatorList };
    data.date = data.date.toLocaleDateString();
    data.time = this.convertTime(data.time);

    console.log(data);
    
    let response: any = { message: '' };
    try {
      response = await this.expertService.addExpertLecture(data);
    } catch (error) {
      this.spinnerService.removeSpinner();
      this.toastService.error('Unable to Add expert lecture. Please try again.');
      return;
    }
    if (response) this.toastService.success(response.message);
    this.spinnerService.removeSpinner();

    this.dialogRef.close(data);
  }

  async editExpert() {
    console.log(this.selectedExpert)
    console.log(this.editExpertForm.controls);
    //this.editExpertForm.controls['name'].setValue(this.selectedExpert.name);
    let data = this.prepareData(this.editExpertForm);
    console.log(data);
    for(let key in this.editExpertForm.controls ){
      //console.log(key);
      //console.log(this.selectedExpert[key]);
      if(data[key]==null || data[key]=="")
        this.editExpertForm.controls[key].setValue(this.selectedExpert[key]);
      else
        this.editExpertForm.controls[key].setValue(data[key]);
    }
    data = this.prepareData(this.editExpertForm);
    //data.dob = data.dob.toLocaleDateString();
    console.log(data);
    let response: any = { message: '' };
    try {
      this.expertService.editExpert(data).subscribe(res =>
        {
          console.log(res.status);
          
          response = res;
          if (response) this.toastService.success(response['message']);
          
          this.spinnerService.removeSpinner();

          this.dialogRef.close(data);
        },
        error=>{
          console.log(error);
          this.toastService.error('Unable to Add expert. Please try again.');
          this.spinnerService.removeSpinner();
          this.dialogRef.close(data);
        }
        );
    } catch (error) {
      console.log("in catch",error);
      
      this.toastService.error('Unable to Add expert. Please try again.');
      this.spinnerService.removeSpinner();
      this.dialogRef.close(data);
      return;
    }
  
  }
  async deleteExpert() {
    console.log(this.editExpertForm.controls);
  }

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
    this.addExpertLectureForm.controls.coordinator.patchValue([...this.allFaculties,0]);
    }else{
    this.addExpertLectureForm.controls.coordinator.patchValue([]);
    }
    console.log(this.addExpertLectureForm.controls.coordinator.value);
  }

  selectAllAudience(){
    console.log(this.allAudienceSelected);
    
    //
    this.allAudienceSelected = !this.allAudienceSelected;
    this.allAudience = [];
    if(this.allAudienceSelected){
    for(let option of this.options){
      this.allAudience.push(option.value);
    }
    this.addExpertLectureForm.controls.audience.patchValue([...this.allAudience,0]);
    }else{
    this.addExpertLectureForm.controls.audience.patchValue([]);
    }
    console.log(this.addExpertLectureForm.controls.audience.value);
  }


}
