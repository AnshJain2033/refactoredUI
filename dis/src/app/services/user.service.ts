import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { serviceUrls } from '../shared/constants/serviceUrls';
import { SpinnerService } from './spinner.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private serviceUrls = serviceUrls;
  token =sessionStorage.getItem('token') ;
  auth = this.token !== null? "Bearer "+this.token:"Bearer ";
  headers = new HttpHeaders({'Authorization': this.auth});

  constructor(private http: HttpClient, private spinnerService: SpinnerService, private router: Router) { }

  getDashboardSideNavigationDetails(token:any): Observable<any> {

    this.spinnerService.addSpinner();
    const headers = new HttpHeaders({'Authorization':token});
    return this.http.get<any>(this.serviceUrls.getSideNavigationDetails,{headers:headers});
  }

  removeUserWorkExp(id: any){
   
    // this.headers.append('Access-Control-Allow-Origin','*');
    return this.http.delete<any>(this.serviceUrls.deleteUserWorkExperience+"/"+id,{headers: this.headers});
  }

  deleteEducation(id:any){
    // this.headers.append('Access-Control-Allow-Origin','*');
    return this.http.delete<any>(this.serviceUrls.deleteUserQualification+"/"+id,{headers: this.headers});
  }

  deleteResearch(id:any){
    return this.http.delete<any>(this.serviceUrls.deleteUserResearchWork+"/"+id,{headers: this.headers}); 
  }

  deleteInternship(id:any){
    return this.http.delete<any>(this.serviceUrls.deleteUserInternship+"/"+id,{headers: this.headers}); 
  }

  deleteCompExam(id:any){
    return this.http.delete<any>(this.serviceUrls.deleteUserCompetitiveExams+"/"+id,{headers: this.headers}); 
  }

  deleteTechnicalActivity(id:any){
    return this.http.delete<any>(this.serviceUrls.deleteUserTechnicalActivity+"/"+id,{headers: this.headers}); 
  }
}
