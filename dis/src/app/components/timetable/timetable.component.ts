import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, DateAdapter } from '@angular/material/core';
import { HotToastService } from '@ngneat/hot-toast';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import 'ag-grid-community';
import { TasksService } from 'src/app/services/tasks.service';
import { TimetableService } from 'src/app/services/timetable.service';
import { Moment } from 'moment';
import * as moment from 'moment';
import { MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';

// const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY'
  },
  display: {
    dateInput: 'YYYY',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.component.html',
  styleUrls: ['./timetable.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ],
  
})
export class TimetableComponent {

  @Output()
dateChange: EventEmitter<MatDatepickerInputEvent<any>> = new EventEmitter();

  rowData = [
    {Monday: "'Subject': ML"}
  ];

  courseList: any[] = [];

  taskCategoryId: string ="";
  ttTypes : any[] = [];
  sessionStart: any;

  today = new Date();
  session1 = new Date();
  session2:any = null;
  session2Max:any = null;

  showSession2 = false;
  showGrid = false;

  semesters:any = [
    {course: 'BE', sem: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII']},
    {course: 'BTech', sem: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII']},
    {course: 'ME', sem: ['I', 'II', 'III', 'IV']},
    {course: 'MTech', sem: ['I', 'II', 'III', 'IV']},
    {course: 'Phd', sem: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII']},
  ];

  semesterList:any =[];

  colDefs: ColDef[] = [
    {
      field: 'Monday',
      minWidth: 200,
      autoHeight: true,
      wrapText: true
    },
    {
      field: 'Tuesday',
      minWidth: 200,
    },
    {
      field: 'Wednesday',
      minWidth: 200,
    },
    {
      field: 'Thursday',
      minWidth: 200,
    },
    {
      field: 'Friday',
      minWidth: 200,
    },
    {
      field: 'Saturday',
      minWidth: 200,
    }
  ];

  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    editable: true,
  };

  editTimeTableForm:any = this.fb.group({
    course: new FormControl('', [ Validators.required]),
    ttType: new FormControl('', [ Validators.required]),
    sessionStart: new FormControl(moment(), [ Validators.required]),
    sessionEnd: new FormControl(moment(), [ Validators.required]),
    semester: new FormControl('', [ Validators.required]),
  });


  

  constructor(private fb: FormBuilder, private ttService: TimetableService, private toastService: HotToastService, private taskService: TasksService){
  //  this.session1.setFullYear(this.today.getFullYear() + 4);
    this.editTimeTableForm.get('sessionEnd')?.disable();
    ttService.getAllCourses().subscribe((response:any) => {
      this.courseList = response;
    }); 
    

    taskService.getCategoryList().subscribe((response:any) => {
      let categoryList = response;
      for(let category of categoryList){
        if(category.name === 'Time Table'){
          this.taskCategoryId = category.id;
          console.log(this.taskCategoryId);
          
          break;
        }
      }
      taskService.getTaskByCategory(this.taskCategoryId).subscribe((response) => {
        this.ttTypes = response;
        console.log(this.ttTypes);
        
      });
    });
  }

  
  onGridReady(params: GridReadyEvent) {
  }

  chosenYearHandler(normalizedYear: Moment, datepicker: MatDatepicker<any>, str: string){
    console.log(normalizedYear);
    //let str = 'sessionStart';
    const ctrlValue = this.editTimeTableForm.controls[str].value;
    ctrlValue.year(normalizedYear.year());
    console.log(normalizedYear.year());
    this.editTimeTableForm.controls[str].setValue(ctrlValue);
    console.log(this.editTimeTableForm.controls.sessionStart.value);
    this.session2 = new Date();
    this.session2.setFullYear(normalizedYear.year());
    console.log(this.session2);
    this.editTimeTableForm.get('sessionEnd')?.enable();
    this.showSession2 = true;
    datepicker.close();
  }

  onCourseSelection(event:any){
    console.log(event.source.value);
    let course = event.source.value;
    for(let sem of this.semesters){
      if(sem['course'] === course){
        this.semesterList = sem['sem'];
        break;
      }
    }
  }

  sessionChange(event:any){
    console.log(event);
    
    
  }

  onSubmit(){
    this.showGrid = true;
  }
}
