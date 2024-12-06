import { Component,Input,OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { images } from 'src/assets/images';
import { UserLoginResponse } from '../login/model/user-login-response';
import { SpinnerService } from 'src/app/services/spinner.service';
import { Route, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  image:string = "./../../assets/images/CSDept.jpg";
  hodImage: string = images.vtewari;
  hod = "Dr. Vandan Tewari";
  eyeIcon: string = 'fa-eye-slash';
  show: boolean = false;
  type = 'password';

  footerList = [
    // {
    //   text: 'Gallery',
    //   route: 'gallery'
    // },
    {
      text: 'Home',
      route: '..'
    },
    {
      text: 'Contact Us',
      route: 'contact'
    }
  ]

  // @Input() renderList: any[] = [];
  // @Input() displayColumns: string[] = [];
  // currentRenderList: any[] = [];
  
  
  // imageObject = [{
  //   image: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/5.jpg',
  //   thumbImage: 'https://sanjayv.github.io/ng-image-slider/contents/assets/img/slider/5.jpg',
  //   title:'test'
  // }];
  //image:string = images.compdept;
  constructor(private fb: FormBuilder, private authService:AuthService, private spinnerService:SpinnerService, public router : Router, private toastService: HotToastService){
    console.log(this.image);
   // this.dataSource = new MatTableDataSource(this.Sample);
  }

  ngOnInit(): void {
    let userType = sessionStorage.getItem('userType');
    if (userType) {
      this.router.navigate([userType]);
    }

    // this.displayColumns.push('name');
    // this.currentRenderList = this.Sample;
  }

  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  login() {
    this.authService.loginUser(this.loginForm.getRawValue()).subscribe({
      next: (response: UserLoginResponse) => {
        console.log(response);
        
        sessionStorage.setItem('token', response.accessToken);
        sessionStorage.setItem('authorities', JSON.stringify(response.authorities));
        sessionStorage.setItem('tokenType', response.tokenType);
        sessionStorage.setItem('username', response.username);
        sessionStorage.setItem('userType', response.userType);
        this.authService.getActiveUserId(response.username).subscribe({
          next: (response) => {
            console.log("userID:"+ response);
            
            sessionStorage.setItem('userId', response.message);
          },
          error: () => {
            this.toastService.error('Failed to get user id', { id: 'pause' });
            this.spinnerService.removeSpinner();
          },
          complete: () => {
            this.spinnerService.removeSpinner();
          },
        });
        this.authService.checkLoggedIn();
      },
      complete: () => {
        this.spinnerService.removeSpinner();
        this.router.navigate([sessionStorage.getItem('userType')]);
        this.toastService.success('Logged In Successfully', { id: 'pause' });
      },
      error: () => {
        this.spinnerService.removeSpinner();
        this.toastService.error('Login Failed. Please Check Credentials', { id: 'pause' });
      },
    });
  }
  
  hideShowPass(): void {
    this.show = !this.show;
    this.show ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.show ? (this.type = 'text') : (this.type = 'password');
  }

  /////////////////////////

  
}
