import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { cloneDeep } from 'lodash';
import { map, Observable, startWith } from 'rxjs';
import { Infrastructure } from '../constants';
import { SpinnerService } from 'src/app/services/spinner.service';
import { InfrastructureService } from 'src/app/services/infrastructure.service';
import { FacultyService } from 'src/app/services/faculty.service';

@Component({
  selector: 'app-infrastructure-dialog',
  templateUrl: './infrastructure-dialog.component.html',
  styleUrls: ['./infrastructure-dialog.component.scss'],
})
export class InfrastructureDialogComponent implements OnInit {
  type: string = '';
  constructor(public dialogRef: MatDialogRef<InfrastructureDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private infraService: InfrastructureService,private facultyService: FacultyService, private toastService: HotToastService, private spinnerService: SpinnerService) {
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
    description: ['',[Validators.nullValidator]],
  });

  infraTypeList: string[] = [];
  infraLocList: string[] = [];
  facultyList: any[] = [];
  staffList: any[] = [];

  loadedInfra: any;
  filteredLocList: Observable<string[]> = new Observable<string[]>();
  ngOnInit(): void {
    for (let key in this.fetchData) {
      this.fetchData[key]();
      
      
    }

    if (this.type == 'edit') {
      this.getInfraById(this.data.data.id);
    }

    this.filteredLocList = this.infraForm.controls['location'].valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
    console.log(this.filteredLocList);
    
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

  fetchData: any = {
    
    getInfraTypeList:() => {this.infraService.getInfraTypeList().subscribe({
      next: (res: any[])=>{
        this.infraTypeList = res;
      },
      error: () => {
      this.toastService.error('Failed to fetch data');
        this.spinnerService.removeSpinner();
      },
      complete: () => {
        this.spinnerService.removeSpinner();
      },
    })
  },
  getInfraLocList:() => {this.infraService.getListOfInfrastructureLocations().subscribe({
    next: (res: any[])=>{
      this.infraLocList = res;
    },
    error: () => {
    this.toastService.error('Failed to fetch data');
      this.spinnerService.removeSpinner();
    },
    complete: () => {
      this.spinnerService.removeSpinner();
    },
  })
},
getFacList:() => {this.infraService.getFacultyNameList().subscribe({
  next: (res: any[])=>{
    this.facultyList = res;
  },
  error: () => {
  this.toastService.error('Failed to fetch data');
    this.spinnerService.removeSpinner();
  },
  complete: () => {
    this.spinnerService.removeSpinner();
  },
})
},
getStaffList:() => {this.infraService.getStaffNameList().subscribe({
  next: (res: any[])=>{
    this.staffList = res;
    console.log(this.staffList);
    
  },
  error: () => {
  this.toastService.error('Failed to fetch data');
    this.spinnerService.removeSpinner();
  },
  complete: () => {
    this.spinnerService.removeSpinner();
  },
})
},
  }
getInfraById(id:string) {
  console.log(this.data);
  let type = this.data.data.infraType;
  
  
  this.infraService.getInfraById(id).subscribe({
  next: (res: any[])=>{
    this.loadedInfra = { ...res, type: type };
       this.infraForm.reset(this.loadedInfra);
       this.infraForm.updateValueAndValidity();
  },
  error: () => {
  this.toastService.error('Failed to fetch infra with id : ' + id);
  this.closeDialog();
    this.spinnerService.removeSpinner();
  },
  complete: () => {
    this.spinnerService.removeSpinner();
  },
})
}
   
 

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

  saveClick() {
    let data = { ...this.loadedInfra, ...this.prepareData() };
    let response: any = { message: '' };
    //if (!this.infraLocList.map((loc) => loc.toLocaleLowerCase()).includes(data.location.toLowerCase())) 
    if(this.type==='add'){
      this.infraService.saveInfrastructure(data).subscribe({
        next: (response) => {
          this.toastService.success(response.message);
        },
        error: (error) => {
          console.log(error);
          this.toastService.error('Unable to save new location. Please try again.');
          this.spinnerService.removeSpinner();
        },
        complete: () => {
          //this.getTabData[this.selectedTab]();
          this.spinnerService.removeSpinner();
        },
      });
      
    this.dialogRef.close();
  }
  if(this.type==='edit'){
    this.dialogRef.close(data);
  }
}

// async updateInfra(data: Infrastructure) {
//   this.httpService.putRequest('updateInfrastructure', data).subscribe({
//     next: (result: any) => {
//       this.toastService.success(result.message);
//     },
//     error: () => {
//       this.toastService.error('Failed to update infrastructure');
//       this.spinnerService.removeSpinner();
//     },
//     complete: () => {
//       this.getInfrastructureByType();
//       this.spinnerService.removeSpinner();
//     },
//   });
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
