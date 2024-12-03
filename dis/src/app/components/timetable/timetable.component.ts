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
import { Subject } from 'rxjs';
import { TimeTableDialogComponent } from './time-table-dialog/time-table-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { group } from '@angular/animations';

// const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY'
  },
  display: {
    dateInput: 'YYYY',
    // monthYearLabel: 'YYYY',
    // dateA11yLabel: 'LL',
    // monthYearA11yLabel: 'MMMM YYYY'
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

  // rowData = [
  //   // {Monday: "'Subject': ML"}
  //   {Monday: { 'Subject': 'ML', 'Faculty': 'Himani Mishra', 'Time': '10:00-12:00' },}
  // ];

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
    {course: 'B.Tech', sem: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII']},
    {course: 'M.Tech', sem: ['I', 'II', 'III', 'IV']},
    {course: 'Phd', sem: ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII']},
  ];

  semesterList:any =[];

  colDefs: ColDef[] = [
    {
      field: 'Monday',
      minWidth: 200,
      autoHeight: true,
      wrapText: true,
      rowSpan(params) {
        return 4
      },
      cellClassRules: {
        "show-cell": "value !== undefined",
      },
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
    // {
    //   field: 'Saturday',
    //   minWidth: 200,
    // }
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


  gridData:any[] = [];
  gridDataTheory:any[] = [];
  gridDataLab:any[] = [];
  
  labGroups:any = {};  

  userType: any="";
  fullName:any ="";

  constructor(private fb: FormBuilder, private ttService: TimetableService, private toastService: HotToastService, private taskService: TasksService, private dialog:MatDialog){
    this.editTimeTableForm.get('sessionEnd')?.disable();
    ttService.getAllCourses().subscribe((response:any) => {
      this.courseList = response;
    }); 
    
    this.userType = sessionStorage.getItem("userType");
    this.fullName = sessionStorage.getItem("fullname");
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

  // onGridReady(params: GridReadyEvent) {
  // }

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

    let type = this.editTimeTableForm.controls.ttType.value;
    let course = this.editTimeTableForm.controls.course.value;
    let sem = this.editTimeTableForm.controls.semester.value;
    this.gridData = [];
    this.gridDataTheory = [];
    this.gridDataLab = [];
    this.labGroups = [];
    this.ttService.getDataByTypeCourseAndSemester(type,course,sem).subscribe(data=>{
      console.log(data);
      for(let d of data){
        this.gridData.push({day: d.day, faculty: d.faculty1, code: d.subjectCode, subject: d.subjectName, room: d.location, start: d.start, end: d.end, type: d.type, batch: d.batch });
      }
      console.log(this.gridData);
      
      
      for(let data of this.gridData){
        console.log(String(data.faculty));
        console.log(String(this.fullName));
        
        
        console.log(String(data.faculty).includes(String(this.fullName)));
        if(data.type === 'Lecture' && this.userType==='head')
          this.gridDataTheory.push(data);
        else{
          if(data.type  === 'Lecture' && this.userType==='faculty' && String(data.faculty).includes(String(this.fullName)))
            this.gridDataTheory.push(data);
        }
        // .filter((d:any)=> d.faculty.contains(this.fullName)));

        if(data.type === 'Lab' && this.userType==='head'){
          console.log(this.gridDataLab);
          this.gridDataLab.push(data);
        }else{
          if(data.type  === 'Lab' && this.userType==='faculty' && String(data.faculty).includes(String(this.fullName))){
            console.log(String(data.faculty));
          console.log(this.gridDataLab);
            this.gridDataLab.push(data);
          }
        }
      }
      console.log(this.gridDataTheory);
      console.log(this.gridDataLab);
      
      for(let lab of this.gridDataLab){
        let grpNo = this.convertTimeToNumber(lab.start); 
        let group = "group_"+grpNo+"_"+lab.day;
        // let object = {grpNo: {data: []}};
        console.log(this.labGroups[group]);
        
         if(!this.labGroups[group]){
          console.log("in if..");
          
          Object.defineProperty(this.labGroups, group,{writable: true, value: {}});
          Object.defineProperty(this.labGroups[group], 'data',{writable: true, value:[]});
          this.labGroups.push(this.labGroups[group]);
         }

          this.labGroups[group].data.push(lab);
        
        console.log(this.labGroups);
        
      }
      this.showGrid = true;
    }); 
  }

  createSchedule(){
    console.log(this.editTimeTableForm.value);
    const dialogRef = this.dialog.open(TimeTableDialogComponent, {
      data: {
        data: this.editTimeTableForm.value,
        ttTypes: this.ttTypes,
        lecTypes: ['Lab','Lecture'],
        type: 'add'
      },
      disableClose: true,
    });
    // dialogRef.afterClosed().subscribe(() => {
    //   //let url = this.router.url;
    //   this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{this.router.navigate([this.url])});
    // }); 
  }
  getStyle(data:any){
   // console.log(data);
    let start = 'time-'+data.start.replace(":","");    
    let end = 'time-'+data.end.replace(":","");
    return {'grid-column': data.day, 'grid-row-start': start ,'grid-row-end': end};
  }

  getLabStyle(group:any){ 
     let start = 'time-'+group['data'][0].start.replace(":","");     
     let end = 'time-'+group['data'][0].end.replace(":","");
     return {'grid-column': group['data'][0].day, 'grid-row-start': start ,'grid-row-end': end};
   }

  getRowStyle(i:any){
    i=i.replace(":","");
    let time= 'time-'+i;
    if(i>1200)
      time = 'time-0'+(i-1200);
    // console.log(time);
    return { 'grid-row': time};
  }

  convertTimeToNumber(t:string){
    return parseInt(t.substring(0,2));
  }

  editSchedule(data:any){
    console.log(data); 
  }
}
