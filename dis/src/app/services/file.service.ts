import { Injectable } from '@angular/core';
import { serviceUrls } from '../shared/constants/serviceUrls';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SpinnerService } from './spinner.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private serviceUrls = serviceUrls;
  token =sessionStorage.getItem('token') ;
  auth = this.token !== null? "Bearer "+this.token:"Bearer ";
  headers = new HttpHeaders({'Authorization': this.auth});
  
  constructor(private http: HttpClient, private spinnerService: SpinnerService) { }

  public uploadCsv(userType: any, csv:any){
    this.spinnerService.addSpinner();
    console.log(this.serviceUrls.uploadCsv);
    // let headers = new HttpHeaders({'Access-Control-Allow-Origin':'*'});
    // headers = headers.append('Authorization', this.auth);
    // this.serviceUrls.updateExpertLectureByStatus+"/"+status+"/"+id,file,
    return this.http.post<any>(this.serviceUrls.uploadCsv+"/"+userType,csv, {headers: this.headers})
  }
}
