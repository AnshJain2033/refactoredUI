import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/services/auth.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  footerList = [
    {
      text: 'Gallery',
      route: 'gallery'
    },
    {
      text: 'Contact Us',
      route: 'contact'
    }
  ]

  forgetPasswordForm : any;

  constructor(private router: Router, private spinnerService: SpinnerService, private authService: AuthService, private formBuider: FormBuilder, private toastService: HotToastService) { }
  ngOnInit() {
    this.forgetPasswordForm = this.formBuider.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  forgotPassword() {
    let email = this.forgetPasswordForm.getRawValue().email;
    console.log(this.forgetPasswordForm.getRawValue());
    
    this.authService.forgotPassword(email).subscribe({
      next: (response) => {
       // this.submitted = true;
        // this.spinnerService.removeSpinner();
        // this.toastService.success(response.message, { id: 'pause' });
      },
      complete: () => {
        console.log('------------ Completed ');
        this.spinnerService.removeSpinner();
        this.toastService.success("Reset Link sent", { id: 'pause' });
      },
      error: (response) => {
        //this.submitted = false;
        this.spinnerService.removeSpinner();
        this.toastService.error(response, { id: 'pause' });
      },
    });
  }
}
