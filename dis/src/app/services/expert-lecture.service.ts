import { Injectable } from '@angular/core';
import { SpinnerService } from './spinner.service';
import { serviceUrls } from '../shared/constants/serviceUrls';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExpertLectureService {

  private serviceUrls = serviceUrls;
  token =sessionStorage.getItem('token') ;
  auth = this.token !== null? "Bearer "+this.token:"Bearer ";
  headers = new HttpHeaders({'Authorization': this.auth});

  constructor(private http: HttpClient, private spinnerService: SpinnerService) { }

  public getExperts(){
    this.spinnerService.addSpinner();
    // let token = sessionStorage.getItem('token');
    // let auth = token !== null? "Bearer "+token:"Bearer ";
    // const headers = new HttpHeaders({'Authorization': auth});
    
    return this.http.get<any>(this.serviceUrls.getExperts,{headers: this.headers});
  }

  public getExpertLectures(){
    this.spinnerService.addSpinner();
    // let token = sessionStorage.getItem('token');
    // let auth = token !== null? "Bearer "+token:"Bearer ";
    // const headers = new HttpHeaders({'Authorization': auth});
    return this.http.get<any>(this.serviceUrls.getExpertLectures,{headers: this.headers});
  }

  public addExpert(data:any){
    this.spinnerService.addSpinner();
    return lastValueFrom(this.http.post<any>(this.serviceUrls.addExpert,data, {headers: this.headers}));
  }

  public addExpertLecture(data:any){
    this.spinnerService.addSpinner();
    return lastValueFrom(this.http.post<any>(this.serviceUrls.addExpertLecture,data, {headers: this.headers}));
  }

  public editExpert(data:any){
    this.spinnerService.addSpinner();
    return this.http.post<any>(this.serviceUrls.editExpert, data,{headers: this.headers});
  }

  public getExpertLectureByStatus(status:string){
    this.spinnerService.addSpinner();
    // let token = sessionStorage.getItem('token');
    // let auth = token !== null? "Bearer "+token:"Bearer ";
    // const headers = new HttpHeaders({'Authorization': auth});
    return this.http.get<any>(this.serviceUrls.getExpertLectureByStatus+"/"+status,{headers: this.headers});
    
  }
  public getExpertLectureById(id:string){
    this.spinnerService.addSpinner();
    
    return this.http.get<any>(this.serviceUrls.getExpertLectureById+"/"+id,{headers: this.headers});
    
  }

  public deleteExpertLecture(id:any){
    this.spinnerService.addSpinner();
    let headers = new HttpHeaders({'Access-Control-Allow-Origin':'*'});
    headers = headers.append('Authorization', this.auth);
    return this.http.delete<any>(this.serviceUrls.deleteExpertLecture+"/"+id,{headers: headers});
  }

  public updateExpertLectureByStatus(status:any,id:any, file:any){
    this.spinnerService.addSpinner();
    return lastValueFrom(this.http.put<any>(this.serviceUrls.updateExpertLectureByStatus+"/"+status+"/"+id,file, {headers: this.headers}));
  }

  public editExpertLecture(data:any, id:any){
    this.spinnerService.addSpinner();
    return lastValueFrom(this.http.put<any>(this.serviceUrls.editExpertLecture+"/"+id,data, {headers: this.headers}));
  }
}
