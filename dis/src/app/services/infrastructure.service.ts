import { Injectable } from '@angular/core';
import { Infrastructure } from '../head/components/infrastructure/constants';
import { Router } from '@angular/router';
import { SpinnerService } from './spinner.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { serviceUrls } from '../shared/constants/serviceUrls';

@Injectable({
  providedIn: 'root'
})
export class InfrastructureService {
  private serviceUrls = serviceUrls;

  constructor(private http: HttpClient, private spinnerService: SpinnerService, private router: Router) { }

  public addNewInfrastructure(infra:Infrastructure){
    this.spinnerService.addSpinner();
    return this.http.post<any>(this.serviceUrls.addNewInfrastructure, infra);
  }

  public getInfraTypeList(){
    this.spinnerService.addSpinner();
    return this.http.get<any>(this.serviceUrls.getInfrastructureTypeLists);
  }

  public getListOfInfrastructureLocations(){
    this.spinnerService.addSpinner();
    return this.http.get<any>(this.serviceUrls.getListOfInfrastructureLocations);
  }

  public getFacultyNameList(){
    this.spinnerService.addSpinner();
    return this.http.get<any>(this.serviceUrls.getFacultyNameList);
  }

  public getStaffNameList(){
    this.spinnerService.addSpinner();
    return this.http.get<any>(this.serviceUrls.getStaffNameList);
  }

  public getInfraById(id:any){
    this.spinnerService.addSpinner();
    return this.http.get<any>(this.serviceUrls.getInfrastructurebyId+"/"+id);
  }

  token =sessionStorage.getItem('token') ;
  auth = this.token !== null? "Bearer "+this.token:"Bearer ";
  headers = new HttpHeaders({'Authorization': this.auth});

  public saveInfrastructure(data:any){
    this.spinnerService.addSpinner();
    return this.http.post<any>(this.serviceUrls.addNewInfrastructure,data, {headers:this.headers});
  }
}
