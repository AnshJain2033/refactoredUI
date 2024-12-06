import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { HotToastService } from '@ngneat/hot-toast';
import { UserLoginResponse } from './model/user-login-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  footerList = [
    // {
    //   text: 'Gallery',
    //   route: 'gallery'
    // },
    {
      text: 'Contact Us',
      route: 'contact'
    }
  ];
  eyeIcon: string = 'fa-eye-slash';
  show: boolean = false;
  type = 'password';

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService, private spinnerService: SpinnerService, private toastService: HotToastService){

  }
  ngOnInit(): void {
    let userType = sessionStorage.getItem('userType');
    if (userType) {
      this.router.navigate([userType]);
    }
  }

  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  hideShowPass(): void {
    this.show = !this.show;
    this.show ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
    this.show ? (this.type = 'text') : (this.type = 'password');
  }

  login() {
    this.authService.loginUser(this.loginForm.getRawValue()).subscribe({
      next: (response: UserLoginResponse) => {
        console.log(response);
        
        sessionStorage.setItem('token', response.accessToken);
        sessionStorage.setItem('authorities', JSON.stringify(response.authorities));
        sessionStorage.setItem('tokenType', response.tokenType);
        sessionStorage.setItem('username', response.username);
        sessionStorage.setItem('userType', response.userType);
        this.authService.getUserId(response.accessToken).subscribe({
          next: (response) => {
            console.log(response);
            
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
}
