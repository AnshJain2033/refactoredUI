import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SpinnerService } from './spinner.service';
import { serviceUrls } from '../shared/constants/serviceUrls';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndustryVisitService {

  private serviceUrls = serviceUrls;
  token =sessionStorage.getItem('token') ;
  auth = this.token !== null? "Bearer "+this.token:"Bearer ";
  headers = new HttpHeaders({'Authorization': this.auth});
  constructor(private http: HttpClient, private spinnerService: SpinnerService) { }

  public addIndustryVisit(data:any){
    this.spinnerService.addSpinner();
    return lastValueFrom(this.http.post<any>(this.serviceUrls.addIndustryVisit,data, {headers: this.headers}));
  }

  public getAllIndustryVisitsByStatus(status:any){
    this.spinnerService.addSpinner();
    return this.http.get<any>(this.serviceUrls.getAllIndustryVisitsByStatus+"/"+status, {headers: this.headers});
  }

  public deleteIndustryVisit(visitId: any){
    this.spinnerService.addSpinner();
    return this.http.delete<any>(this.serviceUrls.deleteIndustryVisit+"/"+visitId,{headers: this.headers});
  }

  public updateIndustryVisit(data: any, visitId:any){
    this.spinnerService.addSpinner();
    return this.http.put<any>(this.serviceUrls.editIndustryVisit+"/"+visitId, data, {headers: this.headers});
  }
}
