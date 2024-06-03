import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { cloneDeep } from 'lodash';
import { map, Observable, startWith } from 'rxjs';
import { Infrastructure } from '../constants';
import { SpinnerService } from 'src/app/services/spinner.service';
import { InfrastructureService } from 'src/app/services/infrastructure.service';

@Component({
  selector: 'app-infrastructure-dialog',
  templateUrl: './infrastructure-dialog.component.html',
  styleUrls: ['./infrastructure-dialog.component.scss'],
})
export class InfrastructureDialogComponent implements OnInit {
  type: string = '';
  constructor(public dialogRef: MatDialogRef<InfrastructureDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private infraService: InfrastructureService, private toastService: HotToastService, private spinnerService: SpinnerService) {
    this.type = data.type;
  }

  infraForm: FormGroup = this.fb.group({
    type: ['', [Validators.required]],
    name: ['', [Validators.required]],
    nameAcronym: ['', [Validators.required]],
    location: ['', [Validators.required]],
    area: ['', [Validators.required]],
    incharge: ['', [Validators.required]],
    associateIncharge: ['', [Validators.required]],
    staff: ['', [Validators.required]],
    attendant: ['', [Validators.required]],
    description: [''],
  });

  infraTypeList: string[] = [];
  infraLocList: string[] = [];
  facultyList: any[] = [];
  staffList: any[] = [];

  loadedInfra: any;
  filteredLocList: Observable<string[]> = new Observable<string[]>();
  ngOnInit(): void {
  //  this.init();
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.infraLocList.filter((option) => option.toLowerCase().includes(filterValue));
  }
  // async init() {
  //   for (let key in this.fetchData) {
  //     await this.fetchData[key]();
  //   }
  //   if (this.type == 'edit') {
  //     await this.getInfraById(this.data.data.id);
  //   }
  //   this.filteredLocList = this.infraForm.controls['location'].valueChanges.pipe(
  //     startWith(''),
  //     map((value) => this._filter(value || ''))
  //   );
  // }

  closeDialog() {
    this.dialogRef.close();
  }

  // fetchData: any = {
  //   getInfraTypeList: async () => {
  //     try {
  //       let response = await this.httpService.getPromiseRequest('getInfrastructureTypeLists');
  //       this.infraTypeList = response;
  //     } catch (error) {
  //       this.toastService.error('Failed');
  //     }
  //     this.spinnerService.removeSpinner();
  //   },
  //   getInfraLocList: async () => {
  //     let response = await this.httpService.getPromiseRequest('getListOfInfrastructureLocations');
  //     try {
  //       this.infraLocList = response;
  //     } catch (error) {
  //       this.toastService.error('Failed');
  //     }
  //     this.spinnerService.removeSpinner();
  //   },
  //   getFacList: async () => {
  //     try {
  //       let response = await this.httpService.getPromiseRequest('getFacultyNameList');
  //       this.facultyList = response;
  //     } catch (error) {
  //       this.toastService.error('Failed');
  //     }

  //     this.spinnerService.removeSpinner();
  //   },
  //   getStaffList: async () => {
  //     try {
  //       let response = await this.httpService.getPromiseRequest('getStaffNameList');
  //       this.staffList = response;
  //     } catch (error) {
  //       this.toastService.error('Failed');
  //     }
  //     this.spinnerService.removeSpinner();
  //   },
  // };

  // async getInfraById(id: string) {
  //   try {
  //     let type = this.data.data.infraType;
  //     let response = await this.httpService.getPromiseRequest('getInfrastructurebyId', [id]);
  //     this.loadedInfra = { ...response, type: type };
  //     this.infraForm.reset(this.loadedInfra);
  //     this.infraForm.updateValueAndValidity();
  //   } catch (error) {
  //     this.toastService.error('Failed to fetch infra with id : ' + id);
  //     this.closeDialog();
  //   }
  //   this.spinnerService.removeSpinner();
  // }

  // async saveClick() {
  //   let data = { ...this.loadedInfra, ...this.prepareData() };
  //   let response: any = { message: '' };
  //   if (!this.infraLocList.map((loc) => loc.toLocaleLowerCase()).includes(data.location.toLowerCase())) {
  //     try {
  //       response = await this.httpService.postPromiseRequest('addNewInfrastructureLocation', '', [data.location]);
  //     } catch (error) {
  //       this.spinnerService.removeSpinner();
  //       this.toastService.error('Unable to save new location. Please try again.');
  //       return;
  //     }
  //     if (response) this.toastService.success(response.message);
  //     this.spinnerService.removeSpinner();
  //   }

  //   this.dialogRef.close(data);
  // }

  prepareData() {
    let obj = cloneDeep(this.infraForm.getRawValue());

    // Trim strings
    for (let key in obj) {
      obj = {
        ...obj,
        [key]: typeof obj[key] == 'string' ? obj[key].trim() : obj[key],
      };
    }
    return obj;
  }
}
