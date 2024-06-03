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

  constructor(private http: HttpClient, private spinnerService: SpinnerService, private router: Router) { }

  getDashboardSideNavigationDetails(token:any): Observable<any> {

    this.spinnerService.addSpinner();
    const headers = new HttpHeaders({'Authorization':token});
    return this.http.get<any>(this.serviceUrls.getSideNavigationDetails,{headers:headers});
  }
}
