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

  constructor(private facultyService: FacultyService, private httpService: HttpService, private commonService: CommonService,private authService: AuthService, private toastService: HotToastService, private spinnerService: SpinnerService, private dialog: MatDialog, private router: Router) {
   
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
          this.technicalActivityList = Response;
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
          expList: this.researchList,
          userId: this.userId,
        },
        disableClose: true,
      })
      .afterClosed()
      .subscribe(() => this.fetchData['getResearchList']());
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
  addCompExams(): void {
    let dialogRef = this.dialog
      .open(ProfileDialogComponent, {
        data: {
          type: 'compExams',
          expList: this.compExamList,
          userId: this.userId,
        },
        disableClose: true,
      })
      .afterClosed()
      .subscribe(() => this.fetchData['getCompExamsList']());
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
