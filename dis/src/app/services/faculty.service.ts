import { Injectable } from '@angular/core';
import { serviceUrls } from '../shared/constants/serviceUrls';
import { HttpClient } from '@angular/common/http';
import { SpinnerService } from './spinner.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {

  private serviceUrls = serviceUrls;

  constructor(private http: HttpClient, private spinnerService: SpinnerService, private router: Router) { }

  public getFacultyData(){
    this.spinnerService.addSpinner();
    //const headers = new HttpHeaders({'Authorization':token});
    return this.http.get<any>(this.serviceUrls.getFacultydata);
  }

  public getStaffBasicProfile(userId:any,userType:any){
    this.spinnerService.addSpinner();
    
    return this.http.get<any>(this.serviceUrls.getStaffBasicProfile+"?userId="+userId+"&userType="+userType);

  }

  public getStaffData(){
    this.spinnerService.addSpinner();
    //const headers = new HttpHeaders({'Authorization':token});
    return this.http.get<any>(this.serviceUrls.getStaffdata);
  }
}
