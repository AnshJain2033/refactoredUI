import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/services/auth.service';
import { SpinnerService } from 'src/app/services/spinner.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  isValidated: boolean = false;
  loading: boolean = false;

  type = 'password';
  isText: boolean = false;
  eyeIcon: string = 'fa-eye-slash';

 // form: any = {};
  todayDate:Date = new Date();

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

  userType = ['faculty','head','student','staff'];
  designations:any = [
    {userType: 'head', designations: ['HOD:I']},
    {userType: 'faculty', designations: ['Professor:I', 'Associate Professor:I', 'Assistant Professor:II']},
    {userType: 'staff', designations: ['Lab Technician:III', 'Lab Incharge:III', 'Lab Staff:IV', 'Computer Operator:III']},
    // {userType: 'staff', designations:['TA', 'PhD']}
  ];
  currentDesignations: any =[];

  constructor(private authService: AuthService, private router: Router,  private spinnerService: SpinnerService, private fb: FormBuilder, private toastService: HotToastService) {}
  signupForm = this.fb.group(
    {
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      password: ['', [Validators.required]],
      mobileNo: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$')]],
      confirm_password: ['', [Validators.required]],
      userType: ['', [Validators.required]],
      fullName: ['', [Validators.required]],
      // designation: ['', [Validators.required]],
    },
    // {
    //   validator: PasswordValidation.passwordConfirmingValidator,
    // }
    );

    ngOnInit() {
      this.isValidated = false;
      this.loading = false;
    }
  
    hideShowPass(): void {
      this.isText = !this.isText;
      this.isText ? (this.eyeIcon = 'fa-eye') : (this.eyeIcon = 'fa-eye-slash');
      this.isText ? (this.type = 'text') : (this.type = 'password');
    }

    onUserTypeSelect(event:any){
      console.log(event.value);
      
      for(let d of this.designations){
        console.log(d);
        
      if(d['userType'] === event.value){
        this.currentDesignations = d['designations'];
        break;
      }
    }
    }
    onSubmit() {
      // if (!this.form.invalid) {
      //   this.isValidated = true;
      // }
      let formData = this.signupForm.getRawValue();
      if (this.signupForm.valid && formData.password === formData.confirm_password) {
        this.loading = true;
        let data = {
          username: formData.username,
      email: formData.email,
      dob: formData.dob,
      password: formData.password,
      mobileNo: formData.mobileNo,
      confirm_password:formData.confirm_password,
      userType: formData.userType,
      fullName: formData.fullName,
      // designation: formData.designation
        }
        this.authService.signup(data).subscribe({
          next: (response) => {
           // this.isSignedUp = true;
           // this.isSignUpFailed = false;
           // this.submitted = true;
           // this.spinnerService.removeSpinner();
            //this.toastService.success(response, { id: 'pause' });
          },
          complete: () => {
            console.log('------------ Completed ');
            // this.isSignedUp = true;
            // this.isSignUpFailed = false;
            // this.submitted = true;
            this.router.navigate(['login']);
             this.spinnerService.removeSpinner();
             this.toastService.success("User Registered successfully!");
          },
          error: (response) => {
          //  this.submitted = false;
            console.log(response);
            
            this.spinnerService.removeSpinner();
            this.toastService.error(response.error.message);
          },
        });
      }else{
        this.toastService.error("Password and confirm password fields do not match")
      }
    }
  
}
