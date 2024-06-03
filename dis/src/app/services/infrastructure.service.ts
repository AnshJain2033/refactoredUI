import { Injectable } from '@angular/core';
import { Infrastructure } from '../head/components/infrastructure/constants';
import { Router } from '@angular/router';
import { SpinnerService } from './spinner.service';
import { HttpClient } from '@angular/common/http';
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
}
