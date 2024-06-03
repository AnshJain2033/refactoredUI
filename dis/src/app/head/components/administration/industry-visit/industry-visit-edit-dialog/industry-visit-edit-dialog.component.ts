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

  editIndustryForm: FormGroup = this.fb.group({
    
    date: ['', [Validators.required]],
    time: ['', [Validators.required]],
    coordinator1: ['', [Validators.required]],
    coordinator2: ['', [Validators.nullValidator]],
    participants: ['', [Validators.required]],

  });

  constructor(public dialogRef: MatDialogRef<IndustryVisitEditDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private toastService: HotToastService, private spinnerService: SpinnerService, private facultyService: FacultyService, private industryService : IndustryVisitService) {
    this.type = data.type;
    this.formData = this.data.data;
    
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

  updateVisit() {
    console.log(this.editIndustryForm);

    let data = { ...this.prepareData(this.editIndustryForm) };
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

  closeDialog() {
    this.dialogRef.close();
  }
}
