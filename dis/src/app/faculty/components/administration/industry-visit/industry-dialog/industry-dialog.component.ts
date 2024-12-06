import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { cloneDeep } from 'lodash';
import { AuthService } from 'src/app/services/auth.service';
import { FacultyService } from 'src/app/services/faculty.service';
import { IndustryVisitService } from 'src/app/services/industry-visit.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-industry-dialog',
  templateUrl: './industry-dialog.component.html',
  styleUrls: ['./industry-dialog.component.scss']
})
export class IndustryDialogComponent implements OnInit {
  async Init() {
    for (let key in this.fetchData) {
      await this.fetchData[key]();
    }
    // console.log(this.courseOptions)
    // console.log(this.subjectList)
  }

  constructor(public dialogRef: MatDialogRef<IndustryDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private facultyService: FacultyService, private toastService: HotToastService, private spinnerService: SpinnerService, private authService: AuthService, private industryService: IndustryVisitService) {
    this.type = data.type;
  }
  ngOnInit(): void {
    this.Init();
  }

  participants: string[] = ['BE-I', 'BE-II', 'BE-III', 'BE-IV', 'ME-I', 'ME-II'];
  type: string = '';
  facultyList: any[] = [];
  todayDate: Date = new Date();

  addIndustryForm: FormGroup = this.fb.group({
    address: ['', [Validators.required]],
    city: ['', [Validators.required]],
    companyName: ['', [Validators.required]],
    date: ['', [Validators.required]],
    time: ['', [Validators.required]],
    coordinator1: ['', [Validators.required]],
    coordinator2: ['', [Validators.nullValidator]],
    participants: ['', [Validators.required]],
    pin: ['', [Validators.required]],
    state: ['', [Validators.required]],
  });
  UseLessParameter: any;
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
  };

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

  async onAddVisit() {
    console.log(this.addIndustryForm);

    let data = { ...this.prepareData(this.addIndustryForm) };
    console.log(data);
    let response: any = { message: '' };
    try {
      response = await this.industryService.addIndustryVisit(data);
    } catch (error) {
      this.spinnerService.removeSpinner();
      this.toastService.error('Unable to Add Industry Visit. Please try again.');
      return;
    }
    if (response) this.toastService.success(response.message);
    this.spinnerService.removeSpinner();

    this.dialogRef.close(data);
  }

  updateIndustryVisit() {
    console.log('Yess, it is updated now');
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
