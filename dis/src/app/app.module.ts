import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { MaterialModule } from './shared/material/material.module';
import { LoginComponent } from './components/login/login.component';

import { HotToastModule } from '@ngneat/hot-toast';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NoGuardGuard } from './shared/guard/noguard.guard';
import { HeadGuard } from './shared/guard/head.guard';
import { FacultyGuard } from './shared/guard/faculty.guard';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AboutComponent } from './components/about/about.component';
import { OverviewComponent } from './components/about/overview/overview.component';
import { ContactComponent } from './components/about/contact/contact.component';
import { ProfileComponent } from './components/profile/profile.component';

import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AdminComponent } from './components/admin/admin.component';
import { UploadCsvDialogComponent } from './components/admin/upload-csv-dialog/upload-csv-dialog.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomePageComponent,
    SignupComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    AboutComponent,
    OverviewComponent,
    ContactComponent,
    ProfileComponent,
    UploadCsvDialogComponent,
    
    
    // FooterComponent,
    // NavbarComponent
    
   // TableComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HotToastModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
  ],
  
  providers: [NoGuardGuard,
    HeadGuard,
    FacultyGuard],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
