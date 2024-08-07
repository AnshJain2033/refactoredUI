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
    alternateMobileNo: ['', [Validators.required]],
    areaOfSpecialization: ['', [Validators.required]],
    dob: [Date, [Validators.required]],
    email: ['', [Validators.required]],
    mobileNo: ['', [Validators.required]],
  });

  // exp list and form
  expList: any;

  addExpForm: FormGroup = this.fb.group({
    organizationName: ['', [Validators.required]],
    designation: ['', [Validators.required]],
    dateOfJoining: [Date, [Validators.required]],
    dateOfLeaving: [Date, [Validators.required]],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
    country: ['', [Validators.required]],
    payScale: ['', [Validators.required]],
  });

  // Education list and form

  addEducationForm: FormGroup = this.fb.group({
    degreeCertificate: ['', [Validators.required]],
    collegeSchool: ['', [Validators.required]],
    universityBoard: ['', [Validators.required]],
    specialization: ['', [Validators.required]],
    yearOfPassing: ['', [Validators.required]],
    percentageCgpa: ['', [Validators.required]],
  });


  //research list and form
  addResearchForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    yearOfPublication: ['', [Validators.required]],
    publisher: ['', [Validators.required]],
    category: ['', [Validators.required]],
    subcategory: ['', [Validators.required]],
    coAuthors: ['', [Validators.required]],
    guideName: ['', [Validators.required]],
    conferenceJournalName: ['', [Validators.required]],
  });

  options = ['Journal', 'Conference'];
  subOptions = ['National', 'International'];

  // interships and form
  addInternshipForm: FormGroup = this.fb.group({
    subject: ['', [Validators.required]],
    companyName: ['', [Validators.required]],
    city: ['', [Validators.required]],
    state: ['', [Validators.required]],
    country: ['', [Validators.required]],
    startDate: [Date, [Validators.required]],
    endDate: [Date, [Validators.required]],
  });
  // exams and form
  addCompExamForm: FormGroup = this.fb.group({
    nameOfExam: ['', [Validators.required]],
    rank: ['', [Validators.required]],
    registrationNo: ['', [Validators.required]],
    year: ['', [Validators.required]],
    score: ['', [Validators.required]],
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

  technicalActivityoptions = ['Attended', 'Organised'];
  //Technical Activities form
  addTechnicalActivitiesForm: FormGroup = this.fb.group({
    attendedOrganized: ['', [Validators.required]],
    fromDate: [Date, [Validators.required]],
    nameOfCoordinator: ['', [Validators.required]],
    place: ['', [Validators.required]],
    topicSubject: ['', [Validators.required]],
    toDate: [Date, [Validators.required]],
    type: ['', [Validators.required]],
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

  ngOnInit(): void {}
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
