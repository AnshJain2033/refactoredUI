import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/services/auth.service';
import { FacultyService } from 'src/app/services/faculty.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { images } from 'src/assets/images';

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

  images : any = images;

  constructor(private facultyService: FacultyService,private authService: AuthService, private toastService: HotToastService, private spinnerService: SpinnerService, private dialog: MatDialog, private router: Router) {
   
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
  }
  

  logout() {
    sessionStorage.clear();
    this.router.navigate(['welcome']);
  }
}
