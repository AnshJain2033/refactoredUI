import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NoGuardGuard } from './shared/guard/noguard.guard';
import { HeadGuard } from './shared/guard/head.guard';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { SignupComponent } from './components/signup/signup.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ContactComponent } from './components/about/contact/contact.component';

const routes: Routes = [
  { path: '', redirectTo: 'welcome', pathMatch: 'full' },
  {
    path: 'login',
    component: LoginComponent,
  //  canActivate: [NoGuardGuard],
  },
  {
    path: 'head',
    loadChildren: () => import('./head/head.module').then((m) => m.HeadModule),
  //  canActivate: [HeadGuard],
  },
  {
    path: 'faculty',
    loadChildren: () => import('./faculty/faculty.module').then((m) => m.FacultyModule),
   
  },
  {
    path: 'sign-up',
    component: SignupComponent,
    // canActivate: [NoGuardGuard],
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    // canActivate: [NoGuardGuard],
  },
  {
    path: 'reset-password/:email',
    component: ResetPasswordComponent,
    // canActivate: [NoGuardGuard],
  },
  {
    path: 'welcome',
    component: WelcomePageComponent,
    children: [
      {
        path: 'contact',
        component: ContactComponent,
      },
      
    ]
  },
  
  
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash : true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
