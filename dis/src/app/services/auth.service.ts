import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../components/login/model/user';
import { lastValueFrom, Observable, Subject } from 'rxjs';
import { serviceUrls } from '../shared/constants/serviceUrls';
import { SpinnerService } from './spinner.service';
import { Router } from '@angular/router';
import { SignUpInfo } from '../components/signup/model/signupInfo';
import { resetPassword } from '../reset-password/model/resetPassword';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private serviceUrls = serviceUrls;
  public isLoggedIn:boolean = false;
  public subject = new Subject<any>();

  constructor(private http: HttpClient, private spinnerService: SpinnerService, private router: Router) {}

  loginUser(user: User): Observable<any> {
    this.spinnerService.addSpinner();
    return this.http.post<any>(this.serviceUrls.login, user);
  }

  getToken() {
    return sessionStorage.getItem('token');
  }

  logOut() {
    sessionStorage.clear();
    //localStorage.clear();
    this.router.navigate(['/login']);
  }
  getUsername() {
    return sessionStorage.getItem('username');
  }
  isUserLoggedIn():any {
    let res;
    this.http.get<any>(this.serviceUrls.verifyToken).subscribe({next:
      (response)=>{
        console.log(response);
        res =response;
        return res;
      },error:(err)=>{
        console.log(err);
        res = err;
        return res;
      }
      
    }
    );
  //   // let response = lastValueFrom(request)
  //   //   .then((val) => val)
  //   //   .catch((err) => false);
  //    //return res;
   }

  // async isUserLoggedIn() {
  //   let request = this.http.get<any>(this.serviceUrls.verifyToken);
  //   let response = await lastValueFrom(request)
  //     .then((val) => val)
  //     .catch((err) => false);
  //   return response;
  // }

  getUserId(token:any){
    const headers = new HttpHeaders({'Authorization':token});
    return this.http.get<any>(this.serviceUrls.getMyUserID,{headers:headers});
  }

  getActiveUserId(userName:any){
    this.spinnerService.addSpinner();
    // let headers = new HttpHeaders({'Authorization':token});
    const headers = new HttpHeaders({'Access-Control-Allow-Origin':'*'});
    return this.http.get<any>(this.serviceUrls.getActiveUserId+"/"+userName,{headers:headers});
  }

  
  checkLoggedIn(){
    if(sessionStorage.getItem('currentUser')){
      this.isLoggedIn = true;
      this.subject.next({status: true});
      return true;
      
    }else{
      this.isLoggedIn = false;
      this.subject.next({status: false});
      return false;
    }
    //return this.subject;
  }

  clearStatus(){
    this.subject.next({status: false});
  }

  getStatus(): Observable<any>{
    return this.subject.asObservable();
  }

  signup(user: SignUpInfo) : Observable<any> {
    this.spinnerService.addSpinner();
    return this.http.post<any>(this.serviceUrls.signup, user);
  }

  forgotPassword(email: string) : Observable<any> {
    this.spinnerService.addSpinner();
    return this.http.post<any>(this.serviceUrls.forgotPassword,email);
  }

  resetPassword(data: resetPassword): Observable<any>{
    this.spinnerService.addSpinner();
    console.log(this.serviceUrls.resetPassword+": " +data);
    
    return this.http.put<any>(this.serviceUrls.resetPassword,data);
  }
}
