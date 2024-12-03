import { Component, Inject, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { cloneDeep } from 'lodash';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

import { cA } from '@fullcalendar/core/internal-common';
import { SpinnerService } from 'src/app/services/spinner.service';
import { AuthService } from 'src/app/services/auth.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-profile-dialog',
  templateUrl: './profile-dialog.component.html',
  styleUrls: ['./profile-dialog.component.scss'],
})
export class ProfileDialogComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<ProfileDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private httpService: HttpService, private fb: FormBuilder, private toastService: HotToastService, private spinnerService: SpinnerService, private authService: AuthService) {}

  type: string = this.data.type;
  facultyProfile: any;

  editProfileForm: FormGroup = this.fb.group({
    alternateMobileNo: ['', [Validators.nullValidator]],
    areaOfSpecialization: ['', [Validators.required]],
    dob: [Date, [Validators.required]],
    email: ['', [Validators.required]],
    mobileNo: ['', [Validators.required]],
    bloodGroup: ['', [Validators.required]],
  });

  // exp list and form
  expList: any;
  exp: any = null;
  addExpForm: FormGroup = this.fb.group({
    organizationName: [this.data.exp!=null?this.data.exp.organizationName:'', [Validators.required]],
    designation: [this.data.exp!=null?this.data.exp.designation:'', [Validators.required]],
    dateOfJoining: [this.data.exp!=null?this.data.exp.dateOfJoining:Date, [Validators.required]],
    dateOfLeaving: [this.data.exp!=null?this.data.exp.dateOfLeaving:'', [Validators.nullValidator]],
    city: [this.data.exp!=null?this.data.exp.city:'', [Validators.required]],
    state: [this.data.exp!=null?this.data.exp.state:'', [Validators.required]],
    country: [this.data.exp!=null?this.data.exp.country:'', [Validators.required]],
    payScale: [this.data.exp!=null?this.data.exp.payScale:'', [Validators.required]],
  });

  // Education list and form

  addEducationForm: FormGroup = this.fb.group({
    degreeCertificate: [this.data.edu!=null?this.data.edu.degreeCertificate:'', [Validators.required]],
    collegeSchool: [this.data.edu!=null?this.data.edu.collegeSchool:'', [Validators.required]],
    universityBoard: [this.data.edu!=null?this.data.edu.universityBoard:'', [Validators.required]],
    specialization: [this.data.edu!=null?this.data.edu.specialization:'', [Validators.required]],
    yearOfPassing: [this.data.edu!=null?this.data.edu.yearOfPassing:'', [Validators.required]],
    percentageCgpa: [this.data.edu!=null?this.data.edu.percentageCgpa:'', [Validators.required]],
  });


  //research list and form
  addResearchForm: FormGroup = this.fb.group({
    title: [this.data.research!=null?this.data.research.title:'', [Validators.required]],
    yearOfPublication: [this.data.research!=null?this.data.research.yearOfPublication:'', [Validators.required]],
    publisher: [this.data.research!=null?this.data.research.publisher:'', [Validators.required]],
    category: [this.data.research!=null?this.data.research.category:'', [Validators.required]],
    subcategory: [this.data.research!=null?this.data.research.subcategory:'', [Validators.required]],
    coAuthors: [this.data.research!=null?this.data.research.coAuthors:'', [Validators.required]],
    guideName: [this.data.research!=null?this.data.research.guideName:'', [Validators.required]],
    journalConferenceName: [this.data.research!=null?this.data.research.journalConferenceName:'', [Validators.nullValidator]],
  });

  options = ['Journal', 'Conference'];
  subOptions = ['National', 'International'];

  // interships and form
  addInternshipForm: FormGroup = this.fb.group({
    subject: [this.data.internship!=null?this.data.internship.subject:'', [Validators.required]],
    companyName: [this.data.internship!=null?this.data.internship.companyName:'', [Validators.required]],
    city: [this.data.internship!=null?this.data.internship.city:'', [Validators.required]],
    state: [this.data.internship!=null?this.data.internship.state:'', [Validators.required]],
    country: [this.data.internship!=null?this.data.internship.country:'', [Validators.required]],
    startDate: [this.data.internship!=null?this.data.internship.startDate:Date, [Validators.required]],
    endDate: [this.data.internship!=null?this.data.internship.endDate:Date, [Validators.required]],
  });
  // exams and form
  addCompExamForm: FormGroup = this.fb.group({
    nameOfExam: [this.data.compExam!=null?this.data.compExam.nameOfExam:'', [Validators.required]],
    rank: [this.data.compExam!=null?this.data.compExam.rank:'', [Validators.required]],
    registrationNo: [this.data.compExam!=null?this.data.compExam.registrationNo:'', [Validators.required]],
    year: [this.data.compExam!=null?this.data.compExam.year:'', [Validators.required]],
    score: [this.data.compExam!=null?this.data.compExam.score:'', [Validators.nullValidator]],
  });
  // placement
  addPlacementForm: FormGroup = this.fb.group({
    nameOfExam: ['', [Validators.required]],
    rank: ['', [Validators.required]],
    registrationNo: ['', [Validators.required]],
    year: ['', [Validators.required]],
    score: ['', [Validators.required]],
  });

  //Cultural Activities form
  addCulturalActivitiesForm: FormGroup = this.fb.group({
    nameOfActivity: ['', [Validators.required]],
    type: ['', [Validators.required]],
    date: [Date, [Validators.required]],
    place: ['', [Validators.required]],
    achievement: ['', [Validators.required]],
  });

  technicalActivityoptions = ['Attended', 'Organized'];
  technicalActivityTypes = ['Workshop', 'Seminar', 'Technical Event'];
  //Technical Activities form
  addTechnicalActivitiesForm: FormGroup = this.fb.group({
    attendedOrganized: [this.data.event!= null? this.data.event.attendedOrganized: '', [Validators.required]],
    fromDate: [this.data.event!= null? this.data.event.fromDate: Date, [Validators.required]],
    nameOfCoordinator: [this.data.event!= null? this.data.event.nameOfCoordinator: '', [Validators.required]],
    place: [this.data.event!= null? this.data.event.place: '', [Validators.required]],
    topicSubject: [this.data.event!= null? this.data.event.topicSubject: '', [Validators.required]],
    toDate: [this.data.event!= null? this.data.event.toDate: Date, [Validators.required]],
    type: [this.data.event!= null? this.data.event.type: '', [Validators.required]],
  });
  // workshop
  addWorkshopForm: FormGroup = this.fb.group({
    attendedOrganized: ['', [Validators.required]],
    fromDate: [Date, [Validators.required]],
    nameOfCoordinator: ['', [Validators.required]],
    place: ['', [Validators.required]],
    topicSubject: ['', [Validators.required]],
    toDate: [Date, [Validators.required]],
    type: ['', [Validators.required]],
  });

  ngOnInit(): void {
    console.log(this.data.type);
    
    if(this.data.type==='expEdit'){
      console.log(this.data.type);
      
      this.exp = this.data.exp;
      console.log(this.exp);
      // this.data.type = 'exp';
      
    }

    if(this.data.type==='editEducation'){
      console.log(this.data.edu.degreeCertificate);
      let education = this.data.edu; 
      // this.editEducationForm.controls['degreeCertificate'].setValue(this.data.edu.degreeCertificate);
  //   this.editEducationForm.patchValue({
  //     degreeCertificate: education.degreeCertificate,

  //  });
  }
 

  }
  
  prepareData(form: FormGroup) {
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

  async editProfile() {
    let data = {
      ...this.data.facultyProfile,
      ...this.prepareData(this.editProfileForm),
    };
    console.log(data);
    
    let response: any = { message: '' };
    try {
      response = await this.httpService.postPromiseRequest('addStaffBasicProfile', data);
    } catch (error) {
      this.spinnerService.removeSpinner();
      this.toastService.error('Unable to edit profile. Please try again.');
      return;
    }
    if (response) this.toastService.success(response.message);
    this.spinnerService.removeSpinner();
    this.dialogRef.close(data);
  }

  async addExp() {
    const tempData = {
      userId: this.data.userId,
    };
    let data = { ...tempData, ...this.prepareData(this.addExpForm) };
    let response: any = { message: '' };
    try {
      response = await this.httpService.postPromiseRequest('addUserWorkExperience', data);
    } catch (error) {
      this.spinnerService.removeSpinner();
      this.toastService.error('Unable to edit profile. Please try again.');
      return;
    }
    if (response) this.toastService.success(response.message);
    this.spinnerService.removeSpinner();
    this.dialogRef.close(data);
  }
  async addEducation() {
    const tempData = {
      userId: this.data.userId,
    };
    let data = { ...tempData, ...this.prepareData(this.addEducationForm) };
    let response: any = { message: '' };
    try {
      response = await this.httpService.postPromiseRequest('addUserQualification', data);
    } catch (error) {
      this.spinnerService.removeSpinner();
      this.toastService.error('Unable to edit profile. Please try again.');
      return;
    }
    if (response) this.toastService.success(response.message);
    this.spinnerService.removeSpinner();
    this.dialogRef.close(data);
  }
  async addResearch() {
    const tempData = {
      userId: this.data.userId,
    };
    let data = { ...tempData, ...this.prepareData(this.addResearchForm) };
    let response: any = { message: '' };
    try {
      response = await this.httpService.postPromiseRequest('addUserResearchWork', data);
    } catch (error) {
      this.spinnerService.removeSpinner();
      this.toastService.error('Unable to edit profile. Please try again.');
      return;
    }
    if (response) this.toastService.success(response.message);
    this.spinnerService.removeSpinner();
    this.dialogRef.close(data);
  }
  async addExam() {
    const tempData = {
      userId: this.data.userId,
    };
    let data = { ...tempData, ...this.prepareData(this.addCompExamForm) };
    let response: any = { message: '' };
    try {
      response = await this.httpService.postPromiseRequest('addUserCompetitiveExams', data);
    } catch (error) {
      this.spinnerService.removeSpinner();
      this.toastService.error('Unable to edit profile. Please try again.');
      return;
    }
    if (response) this.toastService.success(response.message);
    this.spinnerService.removeSpinner();
    this.dialogRef.close(data);
  }
  async addInternship() {
    const tempData = {
      userId: this.data.userId,
    };
    let data = { ...tempData, ...this.prepareData(this.addInternshipForm) };
    let response: any = { message: '' };
    try {
      response = await this.httpService.postPromiseRequest('addUserInternship', data);
    } catch (error) {
      this.spinnerService.removeSpinner();
      this.toastService.error('Unable to edit profile. Please try again.');
      return;
    }
    if (response) this.toastService.success(response.message);
    this.spinnerService.removeSpinner();
    this.dialogRef.close(data);
  }
  async addPlacement() {
    const tempData = {
      userId: this.data.userId,
    };
    let data = { ...tempData, ...this.prepareData(this.addPlacementForm) };
    let response: any = { message: '' };
    try {
      response = await this.httpService.postPromiseRequest('addUserPlacement', data);
    } catch (error) {
      this.spinnerService.removeSpinner();
      this.toastService.error('Unable to add Placement details. Please try again.');
      return;
    }
    if (response) this.toastService.success(response.message);
    this.spinnerService.removeSpinner();
    this.dialogRef.close(data);
  }

  async addCulturalActivity() {
    const tempData = {
      userId: this.data.userId,
    };
    let data = {
      ...tempData,
      ...this.prepareData(this.addCulturalActivitiesForm),
    };
    let response: any = { message: '' };
    try {
      response = await this.httpService.postPromiseRequest('addUserCulturalActivityAchievements', data);
    } catch (error) {
      this.spinnerService.removeSpinner();
      this.toastService.error('Unable to add Cultural Activity. Please try again.');
      return;
    }
    if (response) this.toastService.success(response.message);
    this.spinnerService.removeSpinner();
    this.dialogRef.close(data);
  }

  async addTechnicalActivity() {
    const tempData = {
      userId: this.data.userId,
    };
    let data = {
      ...tempData,
      ...this.prepareData(this.addTechnicalActivitiesForm),
    };
    let response: any = { message: '' };
    try {
      response = await this.httpService.postPromiseRequest('addUserTechnicalActivity', data);
    } catch (error) {
      this.spinnerService.removeSpinner();
      this.toastService.error('Unable to add Technical Activity. Please try again.');
      return;
    }
    if (response) this.toastService.success(response.message);
    this.spinnerService.removeSpinner();
    this.dialogRef.close(data);
  }
  async addWorkshop() {
    const tempData = {
      userId: this.data.userId,
    };
    let data = {
      ...tempData,
      ...this.prepareData(this.addWorkshopForm),
    };
    let response: any = { message: '' };
    try {
      response = await this.httpService.postPromiseRequest('addUserWorkshop', data);
    } catch (error) {
      this.spinnerService.removeSpinner();
      this.toastService.error('Unable to add Workshop/Seminar details. Please try again.');
      return;
    }
    if (response) this.toastService.success(response.message);
    this.spinnerService.removeSpinner();
    this.dialogRef.close(data);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
