import { Injectable } from '@angular/core';
import { SpinnerService } from './spinner.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { serviceUrls } from '../shared/constants/serviceUrls';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  token =sessionStorage.getItem('token') ;
  auth = this.token !== null? "Bearer "+this.token:"Bearer ";
  headers = new HttpHeaders({'Authorization': this.auth});

  constructor(private http: HttpClient, private spinnerService: SpinnerService) { }

  public getActiveTaskList(){
    this.spinnerService.addSpinner();
    //const headers = new HttpHeaders({'Authorization':token});
    return this.http.get<any>(serviceUrls.getActiveTaskList,{headers: this.headers});
  }

  public getTaskStatusList(){
    this.spinnerService.addSpinner();
    //const headers = new HttpHeaders({'Authorization':token});
    return this.http.get<any>(serviceUrls.getTaskStatusList, {headers: this.headers});
  }

  public deleteTask(id:any){
    this.spinnerService.addSpinner();
    return this.http.delete<any>(serviceUrls.deleteTask+"/"+id, {headers: this.headers});
  }

  public updateUserTask(id:any,status:any){
    this.spinnerService.addSpinner();
    return this.http.put<any>(serviceUrls.updateTaskStatus+"/"+status+"/"+id, {headers: this.headers});
  }

  public getCategoryList(){
    this.spinnerService.addSpinner();
    //const headers = new HttpHeaders({'Authorization':token});
    return this.http.get<any>(serviceUrls.getCategoryList, {headers: this.headers});
  }

  public assignTask(data: any){
    this.spinnerService.addSpinner();
    return lastValueFrom(this.http.post<any>(serviceUrls.assignTask,data, {headers: this.headers})); 
  }

  public getTaskByCategory(categoryId:any){
    this.spinnerService.addSpinner();
    return this.http.get<any>(serviceUrls.getTaskByCategory+"/"+categoryId, {headers: this.headers});
  }

  public searchTaskByUserId(userId:any){
    this.spinnerService.addSpinner();
    return this.http.get<any>(serviceUrls.searchTaskByUserId+"/"+userId, {headers: this.headers});
    
  }
}
