import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/services/auth.service';
import { FacultyService } from 'src/app/services/faculty.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { images } from 'src/assets/images';
import { ProfileDialogComponent } from './profile-dialog/profile-dialog.component';
import { HttpService } from 'src/app/services/http.service';
import { CommonService } from 'src/app/services/common.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit{

  facultyProfile: any;
  facultyList: any[] = [];
  userType = sessionStorage.getItem('userType');
  userId = sessionStorage.getItem('userId');
  username:any = sessionStorage.getItem('username');

  
  expList: any;
  eduList:any;
  researchList: any;
  internshipList: any;
  compExamList: any;
  placementList:any;
  culturalActivityList: any;
  technicalActivityList: any;
  workshopList: any;
  


  images : any = images;
  img : any = 'https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png';

  constructor(private facultyService: FacultyService, private httpService: HttpService, private commonService: CommonService,private authService: AuthService, private userService: UserService, private toastService: HotToastService, private spinnerService: SpinnerService, private dialog: MatDialog, private router: Router) {
   
  }

  ngOnInit(): void {
   // console.log("jjjksj");
    
    this.authService.getActiveUserId(this.username).subscribe({
      next: (res: any)=>{
        console.log(res);
        this.userId = res.message;
        this.getFacultyProfile();
      },
      error: (error) => {
        console.log(error);
        
        this.toastService.error('Failed to fetch user id');
        this.spinnerService.removeSpinner();
      },
      complete: () => {
        this.spinnerService.removeSpinner();
      },
    });
    for (let key in this.fetchData) {
      this.fetchData[key]();
    }
  }

  Init() {

    // this.authService.getActiveUserId(this.username).subscribe({
    //   next: (res: string)=>{
    //     console.log(res);
    //     this.userId = res;
    //     this.getFacultyProfile();
    //   },
    //   error: (error) => {
    //     this.toastService.error('Failed to fetch user id');
    //     this.spinnerService.removeSpinner();
    //   },
    //   complete: () => {
    //     this.spinnerService.removeSpinner();
    //   },
    // });
    
  }

  getFacultyProfile() {
    this.facultyService.getStaffBasicProfile(this.userId,this.userType).subscribe({
    next: (res: any[]) => {
      console.log(res);
      
      this.facultyProfile = res;
    },
    error: () => {
      this.toastService.error('Failed to fetch staff info');
      this.spinnerService.removeSpinner();
    },
    complete: () => {
      this.spinnerService.removeSpinner();
    },
  })
  }

  UseLessParameter: any;
  fetchData: any = {
    getFacList:()=> {this.facultyService.getStaffBasicProfile(this.userId,this.userType).subscribe({
      next: (res: any[]) => {
        console.log(res);
        
        this.facultyProfile = res;
      },
      error: () => {
        this.toastService.error('Failed to fetch faculties');
        this.spinnerService.removeSpinner();
      },
      complete: () => {
        this.spinnerService.removeSpinner();
      },
    })
    },

    getFacultyDetails: async () => {
      try {
        this.httpService.getRequest('getFacultyNameList').subscribe((Response) => {
          this.facultyList = Response;
        });
        this.spinnerService.removeSpinner();
      } catch (error) {
        // this.toastService.error('Failed');
      }
    },
    getExpList: async () => {
      try {
        this.httpService
          .getRequest('userWorkExperience', this.UseLessParameter, {
            userId: this.userId,
          })
          .subscribe((Response) => {
            this.expList = Response;
            console.log(this.expList);
            
          });
        this.spinnerService.removeSpinner();
      } catch (error) {
        // this.toastService.error('Failed');
      }
    },
    getEducationList:async () => {
      try {
        this.httpService
          .getRequest('userQualification', this.UseLessParameter, {
            userId: this.userId,
          })
          .subscribe((Response) => {
            this.eduList = Response;
          });
        this.spinnerService.removeSpinner();
      } catch (error) {
        // this.toastService.error('Failed');
      }
    },

    getInternshipList: async () => {
      try {
        this.httpService
          .getRequest('userInternship', this.UseLessParameter, {
            userId: this.userId,
          })
          .subscribe((Response) => {
            this.internshipList = Response;
          });
        this.spinnerService.removeSpinner();
      } catch (error) {
        // this.toastService.error('Failed');
      }
    },
    getResearchList: async () => {
      try {
        this.httpService
          .getRequest('userResearchWork', this.UseLessParameter, {
            userId: this.userId,
          })
          .subscribe((Response) => {
            this.researchList = Response;
          });
        this.spinnerService.removeSpinner();
      } catch (error) {
        // this.toastService.error('Failed');
      }
    },
    getCompExamsList: async () => {
      try {
        this.httpService
          .getRequest('userCompetitiveExams', this.UseLessParameter, {
            userId: this.userId,
          })
          .subscribe((Response) => {
            this.compExamList = Response;
          });
        this.spinnerService.removeSpinner();
      } catch (error) {
        // this.toastService.error('Failed');
      }
    },
    getPlacementList:async () => {
      try {
        this.httpService
          .getRequest('userPlacement', this.UseLessParameter, {
            userId: this.userId,
          })
          .subscribe((Response) => {
            this.internshipList = Response;
          });
        this.spinnerService.removeSpinner();
      } catch (error) {
        // this.toastService.error('Failed');
      }
    },
    getCluturalActivityList: async () => {
      try {
        this.httpService
          .getRequest('userCulturalActivityAchievements', this.UseLessParameter, {
            userId: this.userId,
          })
          .subscribe((Response) => {
            this.culturalActivityList = Response;
          });
        this.spinnerService.removeSpinner();
      } catch (error) {
        // this.toastService.error('Failed');
      }
    },
    gettechnicalActivityList: async () => {
      try {
        this.httpService
          .getRequest('userTechnicalActivity', this.UseLessParameter, {
            userId: this.userId,
          })
          .subscribe((Response) => {
            this.technicalActivityList = Response;
          });
        this.spinnerService.removeSpinner();
      } catch (error) {
        // this.toastService.error('Failed');
      }
    },
    getWorkshopList:async () => {
      try {
        this.httpService
        .getRequest('userWorkshop', this.UseLessParameter, {
          userId: this.userId,
        })
        .subscribe((Response) => {
          this.workshopList = Response;
        });
        this.spinnerService.removeSpinner();
      } catch (error) {
      // this.toastService.error('Failed');
    }
  },
  }
  editProfile(): void {
    let dialogRef = this.dialog
      .open(ProfileDialogComponent, {
        data: {
          type: 'add',
          facultyProfile: this.facultyProfile,
        },
        disableClose: true,
      })
      .afterClosed()
      .subscribe(() => this.fetchData['getFacList']());
  }

  addExp(): void {
    let dialogRef = this.dialog
      .open(ProfileDialogComponent, {
        data: {
          type: 'exp',
          expList: this.expList,
          userId: this.userId,
        },
        disableClose: true,
      })
      .afterClosed()
      .subscribe(() => this.fetchData['getExpList']());
  }

  deleteExp(event:any){
    console.log(event.target.offsetParent.innerText);
    let data = event.target.offsetParent.innerText;
    console.log(data.substring(0,data.indexOf("\n")+1));
    
    let note = data.substring(0,data.indexOf("\n")+1);
    console.log(note);
    
    let org = data.substring(note.length, data.lastIndexOf("\n"));
    let designation = data.substring(note.length+org.length);
    console.log(note+" "+org+" "+designation);
    console.log(this.expList);
    let exp: string='0';
    // console.log(event.target.offsetParent.innerText.indexOf("\n")+1);
    for(exp in this.expList){
      // console.log(this.expList[exp].organizationName+" "+org.trim());
      
      if(this.expList[exp].organizationName === org.trim() && this.expList[exp].designation === designation.trim()){
        console.log(this.expList[exp]);
        break;
      }
    }
    console.log(exp);
    this.userService.removeUserWorkExp(this.expList[exp].id).subscribe({
      next: (result: any) => {
        this.toastService.success(result.message);
      },
      error: (error) => {
        console.log(error);
        this.toastService.error('Failed to delete work experience');
        this.spinnerService.removeSpinner();
      },
      complete: () => {
        this.fetchData['getExpList']();
        this.spinnerService.removeSpinner();
      },
    });
  }
  editExp(event:any){
    console.log(event.target.offsetParent.innerText);
    let data = event.target.offsetParent.innerText;
    let note = data.substring(0,data.indexOf("\n"));
    let org = data.substring(note.length, data.lastIndexOf("\n"));
    let designation = data.substring(note.length+org.length);
    console.log(note+" "+org+" "+designation);
    console.log(this.expList);
    let exp: string='0';
    // console.log(event.target.offsetParent.innerText.indexOf("\n")+1);
    for(exp in this.expList){
      
      if(this.expList[exp].organizationName === org.trim() && this.expList[exp].designation === designation.trim()){
        console.log(this.expList[exp]);
        break;
      }
    }

    let dialogRef = this.dialog
      .open(ProfileDialogComponent, {
        data: {
          type: 'expEdit',
          exp: this.expList[exp],
          userId: this.userId,
        },
        disableClose: true,
      })
      .afterClosed()
      .subscribe(() => this.fetchData['getExpList']());
      
  }

  editEducation(event:any){
    console.log(event.target.offsetParent.innerText);
    let data = event.target.offsetParent.innerText;
    let note = data.substring(0,data.indexOf("\n"));
    let program = data.substring(note.length, data.lastIndexOf("\n"));
    let institute = data.substring(note.length+program.length);
    console.log(note+" "+program+" "+institute);
    console.log(this.eduList);
    let edu: string='0';
    
    for(edu in this.eduList){
      
      if(this.eduList[edu].degreeCertificate === program.trim() && this.eduList[edu].collegeSchool === institute.trim()){
        console.log(this.eduList[edu]);
        break;
      }
    }

    let dialogRef = this.dialog
      .open(ProfileDialogComponent, {
        data: {
          type: 'editEducation',
          edu: this.eduList[edu],
          userId: this.userId,
        },
        disableClose: true,
      });
  }

  deleteEducation(event:any){
    console.log(event.target.offsetParent.innerText);
    let data = event.target.offsetParent.innerText;
    let note = data.substring(0,data.indexOf("\n"));
    let program = data.substring(note.length, data.lastIndexOf("\n"));
    let institute = data.substring(note.length+program.length);
    console.log(note+" "+program+" "+institute);
    console.log(this.eduList);
    let edu: string='0';
    
    for(edu in this.eduList){
      
      if(this.eduList[edu].degreeCertificate === program.trim() && this.eduList[edu].collegeSchool === institute.trim()){
        console.log(this.eduList[edu]);
        break;
      }
    }

    this.userService.deleteEducation(this.eduList[edu].id).subscribe({
      next: (result: any) => {
        this.toastService.success(result.message);
      },
      error: (error) => {
        console.log(error);
        this.toastService.error('Failed to delete user qualification');
        this.spinnerService.removeSpinner();
      },
      complete: () => {
        this.fetchData['getEducationList']();
        this.spinnerService.removeSpinner();
      },
    });
  }
  addEducation(): void {
    let dialogRef=this.dialog
    .open(ProfileDialogComponent,{
      data:{
        type: 'education',
        eduList: this.eduList,
        userId: this.userId,
      },
      disableClose: true,
    })
    .afterClosed()
    .subscribe(()=>this.fetchData['getEducationList']());
  }

  addResearch(): void {
    let dialogRef = this.dialog
      .open(ProfileDialogComponent, {
        data: {
          type: 'research',
          researchList: this.researchList,
          userId: this.userId,
        },
        disableClose: true,
      })
      .afterClosed()
      .subscribe(() => this.fetchData['getResearchList']());
  }

  editResearch(event:any){
    console.log(event.target.offsetParent.innerText);
    let data = event.target.offsetParent.innerText.toString();
    let publisher = data.substring(0,data.indexOf("\n"));
    console.log(publisher);
    
    console.log(data.substring(publisher.length+1).indexOf("n"));
    
    let category = data.substring(publisher.length+1, publisher.length+1+data.substring(publisher.length+1).indexOf("\n"));
    console.log(category);
    console.log(data.substring(publisher.length+category.length+2));
    
    let title = data.substring(publisher.length+category.length+2, publisher.length+category.length+2+data.substring(publisher.length+category.length+2).indexOf("\n"));
    let publishYear = data.substring(publisher.length+category.length+title.length+3);
    console.log(publisher+" "+category+" "+title+" "+publishYear);
    console.log(this.researchList);
    let research: string='0';
    
    for(research in this.researchList){
      console.log(this.researchList[research].yearOfPublication == publishYear.trim());
      
      if(this.researchList[research].title === title.trim() && this.researchList[research].yearOfPublication == publishYear.trim()){
        console.log(this.researchList[research]);
        break;
      }
    }

    let dialogRef = this.dialog
      .open(ProfileDialogComponent, {
        data: {
          type: 'editResearch',
          research: this.researchList[research],
          userId: this.userId,
        },
        disableClose: true,
      })
      .afterClosed()
      .subscribe(() => this.fetchData['getResearchList']());
  }

  deleteResearch(event:any){
    console.log(event.target.offsetParent.innerText);
    let data = event.target.offsetParent.innerText.toString();
    let publisher = data.substring(0,data.indexOf("\n"));
    console.log(publisher);
    
    console.log(data.substring(publisher.length+1).indexOf("n"));
    
    let category = data.substring(publisher.length+1, publisher.length+1+data.substring(publisher.length+1).indexOf("\n"));
    console.log(category);
    console.log(data.substring(publisher.length+category.length+2));
    
    let title = data.substring(publisher.length+category.length+2, publisher.length+category.length+2+data.substring(publisher.length+category.length+2).indexOf("\n"));
    let publishYear = data.substring(publisher.length+category.length+title.length+3);
    console.log(publisher+" "+category+" "+title+" "+publishYear);
    console.log(this.researchList);
    let research: string='0';
    
    for(research in this.researchList){
      console.log(this.researchList[research].yearOfPublication == publishYear.trim());
      
      if(this.researchList[research].title === title.trim() && this.researchList[research].yearOfPublication == publishYear.trim()){
        console.log(this.researchList[research]);
        break;
      }
    }

    this.userService.deleteResearch(this.researchList[research].id).subscribe({
      next: (result: any) => {
        this.toastService.success(result.message);
      },
      error: (error) => {
        console.log(error);
        this.toastService.error('Failed to delete research details');
        this.spinnerService.removeSpinner();
      },
      complete: () => {
        this.fetchData['getResearchList']();
        this.spinnerService.removeSpinner();
      },
    });
  }

  addInternship(): void {
    let dialogRef = this.dialog
      .open(ProfileDialogComponent, {
        data: {
          type: 'internship',
          expList: this.internshipList,
          userId: this.userId,
        },
        disableClose: true,
      })
      .afterClosed()
      .subscribe(() => this.fetchData['getInternshipList']());
  }

  editInternship(event:any){
    console.log(event.target.offsetParent.innerText);
    let data = event.target.offsetParent.innerText;
    let dates = data.substring(0,data.indexOf("\n"));
    let startDate = dates.split("to")[0].trim();
    let endDate = dates.split("to")[1].trim();
    console.log(endDate);
    
    let subject = data.substring(dates.length, data.lastIndexOf("\n"));
    let org = data.substring(dates.length+subject.length);
    console.log(dates+" "+org+" "+subject);
    console.log(this.internshipList);
    let intern: string='0';
    // console.log(event.target.offsetParent.innerText.indexOf("\n")+1);
    for(intern in this.internshipList){
      // console.log(this.internshipList[intern].companyName === org.trim());
      
      if(this.internshipList[intern].companyName === org.trim() && this.internshipList[intern].subject === subject.trim() && this.internshipList[intern].startDate === startDate){
        console.log(this.internshipList[intern]);
        break;
      }
    }

    let dialogRef = this.dialog
      .open(ProfileDialogComponent, {
        data: {
          type: 'internship',
          internship: this.internshipList[intern],
          userId: this.userId,
        },
        disableClose: true,
      })
      .afterClosed()
      .subscribe(() => this.fetchData['getInternshipList']());
      
  }

  deleteInternship(event:any){
    let data = event.target.offsetParent.innerText;
    let dates = data.substring(0,data.indexOf("\n"));
    let startDate = dates.split("to")[0].trim();    
    let subject = data.substring(dates.length, data.lastIndexOf("\n"));
    let org = data.substring(dates.length+subject.length);
    console.log(dates+" "+org+" "+subject);
    console.log(this.internshipList);
    let intern: string='0';
    for(intern in this.internshipList){      
      if(this.internshipList[intern].companyName === org.trim() && this.internshipList[intern].subject === subject.trim() && this.internshipList[intern].startDate === startDate){
        console.log(this.internshipList[intern]);
        break;
      }
    }

    this.userService.deleteInternship(this.internshipList[intern].id).subscribe({
      next: (result: any) => {
        this.toastService.success(result.message);
      },
      error: (error) => {
        console.log(error);
        this.toastService.error('Failed to delete internship details');
        this.spinnerService.removeSpinner();
      },
      complete: () => {
        this.fetchData['getInternshipList']();
        this.spinnerService.removeSpinner();
      },
    });
  }
  addCompExams(): void {
    let dialogRef = this.dialog
      .open(ProfileDialogComponent, {
        data: {
          type: 'compExams',
          examList: this.compExamList,
          userId: this.userId,
        },
        disableClose: true,
      })
      .afterClosed()
      .subscribe(() => this.fetchData['getCompExamsList']());
  }

  editCompExam(event:any){
    console.log(event.target.offsetParent.innerText);
    let data = event.target.offsetParent.innerText;
    let year = data.substring(0,data.indexOf("\n"));
    
    let exam = data.substring(year.length, data.lastIndexOf("\n"));
    let rank = data.substring(year.length+exam.length);
    console.log(year+" "+exam+" "+rank);
    console.log(this.compExamList);
    let ce: string='0';
    // console.log(event.target.offsetParent.innerText.indexOf("\n")+1);
    for(ce in this.compExamList){
      // console.log(this.internshipList[intern].companyName === org.trim());
      
      if(this.compExamList[ce].nameOfExam === exam.trim() && this.compExamList[ce].year == year){
        console.log(this.compExamList[ce]);
        break;
      }
    }

    let dialogRef = this.dialog
      .open(ProfileDialogComponent, {
        data: {
          type: 'compExams',
          compExam: this.compExamList[ce],
          userId: this.userId,
        },
        disableClose: true,
      })
      .afterClosed()
      .subscribe(() => this.fetchData['getCompExamsList']());
  }

  deleteCompExam(event:any){
    console.log(event.target.offsetParent.innerText);
    let data = event.target.offsetParent.innerText;
    let year = data.substring(0,data.indexOf("\n"));
    
    let exam = data.substring(year.length, data.lastIndexOf("\n"));
    let rank = data.substring(year.length+exam.length);
    console.log(year+" "+exam+" "+rank);
    console.log(this.compExamList);
    let ce: string='0';
    // console.log(event.target.offsetParent.innerText.indexOf("\n")+1);
    for(ce in this.compExamList){
      // console.log(this.internshipList[intern].companyName === org.trim());
      
      if(this.compExamList[ce].nameOfExam === exam.trim() && this.compExamList[ce].year == year){
        console.log(this.compExamList[ce]);
        break;
      }
    }

    this.userService.deleteCompExam(this.compExamList[ce].id).subscribe({
      next: (result: any) => {
        this.toastService.success(result.message);
      },
      error: (error) => {
        console.log(error);
        this.toastService.error('Failed to delete exam details');
        this.spinnerService.removeSpinner();
      },
      complete: () => {
        this.fetchData['getCompExamsList']();
        this.spinnerService.removeSpinner();
      },
    });
  }
  addPlacement(): void {
    let dialogRef=this.dialog
    .open(ProfileDialogComponent,{
      data:{
        type: 'placement',
        placementList: this.placementList,
        userId: this.userId,
      },
      disableClose: true,
    })
    .afterClosed()
    .subscribe(()=>this.fetchData['getPlacementList']());
  }

  addCultural(): void {
    let dialogRef = this.dialog
      .open(ProfileDialogComponent, {
        data: {
          type: 'cultural',
          userId: this.userId,
        },
        disableClose: true,
      })
      .afterClosed()
      .subscribe(() => this.fetchData['getCluturalActivityList']());
  }

  addTechnical(): void {
    let dialogRef = this.dialog
      .open(ProfileDialogComponent, {
        data: {
          type: 'technical',
          userId: this.userId,
        },
        disableClose: true,
      })
      .afterClosed()
      .subscribe(() => this.fetchData['gettechnicalActivityList']());
  }
  editTechnicalEvent(event:any){
    console.log(event.target.offsetParent.innerText);
    let data = event.target.offsetParent.innerText;
    let date = data.substring(0,data.indexOf("\n"));
    
    let eventType = data.substring(date.length, data.lastIndexOf("\n"));
    let eventName = data.substring(date.length+eventType.length);
    console.log(date+" "+eventType+" "+eventName);
    console.log(this.technicalActivityList);
    let ta: string='0';
    // console.log(event.target.offsetParent.innerText.indexOf("\n")+1);
    for(ta in this.technicalActivityList){
      // console.log(this.internshipList[intern].companyName === org.trim());
      
      if(this.technicalActivityList[ta].topicSubject === eventName.trim() && this.technicalActivityList[ta].fromDate == date){
        console.log(this.technicalActivityList[ta]);
        break;
      }
    }

    let dialogRef = this.dialog
      .open(ProfileDialogComponent, {
        data: {
          type: 'technical',
          event: this.technicalActivityList[ta],
          userId: this.userId,
        },
        disableClose: true,
      })
      .afterClosed()
      .subscribe(() => this.fetchData['gettechnicalActivityList']());
  }
  deleteTechnicalEvent(event:any){
    console.log(event.target.offsetParent.innerText);
    let data = event.target.offsetParent.innerText;
    let date = data.substring(0,data.indexOf("\n"));
    
    let eventType = data.substring(date.length, data.lastIndexOf("\n"));
    let eventName = data.substring(date.length+eventType.length);
    console.log(date+" "+eventType+" "+eventName);
    console.log(this.technicalActivityList);
    let ta: string='0';
    
    for(ta in this.technicalActivityList){
      
      if(this.technicalActivityList[ta].topicSubject === eventName.trim() && this.technicalActivityList[ta].fromDate == date){
        console.log(this.technicalActivityList[ta]);
        break;
      }
    }

    this.userService.deleteTechnicalActivity(this.technicalActivityList[ta].id).subscribe({
      next: (result: any) => {
        this.toastService.success(result.message);
      },
      error: (error) => {
        console.log(error);
        this.toastService.error('Failed to delete event details');
        this.spinnerService.removeSpinner();
      },
      complete: () => {
        this.fetchData['gettechnicalActivityList']();
        this.spinnerService.removeSpinner();
      },
    });
  }

  addWorkshop(): void {
    let dialogRef=this.dialog
    .open(ProfileDialogComponent,{
      data:{
        type: 'workshop',
        workshopList: this.workshopList,
        userId: this.userId,
      },
      disableClose: true,
    })
    .afterClosed()
    .subscribe(()=>this.fetchData['getWorkshopList']());
  }

  exportData() {
    this.commonService.exportToCsv(this.facultyList, 'facultyList.csv');
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['welcome']);
  }
}
