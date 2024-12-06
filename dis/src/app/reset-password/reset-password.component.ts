import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { SpinnerService } from '../services/spinner.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
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
  email = "";

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder,private route: ActivatedRoute,private spinnerService: SpinnerService, private toastService: HotToastService){

  }

  ngOnInit(){
    this.route.params.subscribe(params => {console.log(params);
    this.email = params['email']});
    
  }
  resetForm = this.fb.group(
    {
      email: [this.email,[Validators.nullValidator]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]]
    },
    );

  reset(){
    let formData = this.resetForm.getRawValue();
    if(this.resetForm.valid && formData.password === formData.confirm_password){
      
      let password = this.resetForm.getRawValue().password;
      console.log(password);
      
      let data = {
        email:this.email,
        password: password
      }
      this.authService.resetPassword(data).subscribe({
        next: (response) => {console.log(response)
        },
        complete: () => {
          this.router.navigate(['login']);
           this.spinnerService.removeSpinner();
           this.toastService.success("Password reset successfully!");
        },
        error: (response) => {
        //  this.submitted = false;
          this.spinnerService.removeSpinner();
          this.toastService.error(response);
        },
      });
    }else{
      let url = this.router.url;
      this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{this.router.navigate([url])});
      this.toastService.error("Password and confirm password values are same");
      //window.location.reload();
      
    }
  }
}
