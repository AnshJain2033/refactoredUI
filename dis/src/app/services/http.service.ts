import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { serviceUrls } from '../shared/constants/serviceUrls';
import { SpinnerService } from './spinner.service';
import { Router } from '@angular/router';
import { lastValueFrom, Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

// declare function getRequest<S extends string>(url : {}) : Observable<any>

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private serviceUrls = serviceUrls;
   

  token =sessionStorage.getItem('token') ;
  auth = this.token !== null? "Bearer "+this.token:"Bearer ";
  headers = new HttpHeaders({'Authorization': this.auth});
  constructor(private http: HttpClient, private spinnerService: SpinnerService, private router: Router) { }

  getRequest(url: string, pathParams?: any[], queryParams?: any) {
    this.spinnerService.addSpinner();
    let newUrl = this.serviceUrls[url];
    if (pathParams) {
      newUrl.endsWith('/') ? (newUrl += pathParams.join('/')) : (newUrl += '/' + pathParams.join('/'));
    }
    if (newUrl.endsWith('/')) {
      newUrl = newUrl.substring(0, newUrl.length - 1);
    }
    if (queryParams) {
      newUrl += '?';
      Object.entries(queryParams).forEach(([k, v]) => {
        newUrl += k + '=' + v + '&';
      });
      newUrl = newUrl.substring(0, newUrl.length - 1);
    }
    return this.http.get<any>(newUrl);
  }

  postRequest(url: string, requestData: any, pathParams?: any[], queryParams?: any) {
    this.spinnerService.addSpinner();
    let newUrl = this.serviceUrls[url];
    if (pathParams) {
      newUrl.endsWith('/') ? (newUrl += pathParams.join('/')) : (newUrl += '/' + pathParams.join('/'));
    }
    if (newUrl.endsWith('/')) {
      newUrl = newUrl.substring(0, newUrl.length - 1);
    }
    if (queryParams) {
      newUrl += '?';
      Object.entries(queryParams).forEach(([k, v]) => {
        newUrl += k + '=' + v + '&';
      });

      newUrl = newUrl.substring(0, newUrl.length - 1);
    }
    return this.http.post<any>(newUrl, requestData);
  }

  deleteRequest(url: string, pathParams?: any[], queryParams?: any) {
    this.spinnerService.addSpinner();
    let newUrl = this.serviceUrls[url];
    if (pathParams) {
      newUrl.endsWith('/') ? (newUrl += pathParams.join('/')) : (newUrl += '/' + pathParams.join('/'));
    }
    if (newUrl.endsWith('/')) {
      newUrl = newUrl.substring(0, newUrl.length - 1);
    }
    if (queryParams) {
      newUrl += '?';
      Object.entries(queryParams).forEach(([k, v]) => {
        newUrl += k + '=' + v + '&';
      });

      newUrl = newUrl.substring(0, newUrl.length - 1);
    }
    return this.http.delete<any>(newUrl, {headers:this.headers});
  }

  putRequest(url: string, requestData: any, pathParams?: any[], queryParams?: any) {
    this.spinnerService.addSpinner();
    let newUrl = this.serviceUrls[url];
    if (pathParams) {
      newUrl.endsWith('/') ? (newUrl += pathParams.join('/')) : (newUrl += '/' + pathParams.join('/'));
    }
    if (newUrl.endsWith('/')) {
      newUrl = newUrl.substring(0, newUrl.length - 1);
    }
    if (queryParams) {
      newUrl += '?';
      Object.entries(queryParams).forEach(([k, v]) => {
        newUrl += k + '=' + v + '&';
      });

      newUrl = newUrl.substring(0, newUrl.length - 1);
    }
    return this.http.put<any>(newUrl, requestData, {headers:this.headers});
  }

  getPromiseRequest(url: string, pathParams?: any[], queryParams?: any) {
    this.spinnerService.addSpinner();
    let newUrl = this.serviceUrls[url];
    if (pathParams) {
      newUrl.endsWith('/') ? (newUrl += pathParams.join('/')) : (newUrl += '/' + pathParams.join('/'));
    }
    if (newUrl.endsWith('/')) {
      newUrl = newUrl.substring(0, newUrl.length - 1);
    }
    if (queryParams) {
      newUrl += '?';
      Object.entries(queryParams).forEach(([k, v]) => {
        newUrl += k + '=' + v + '&';
      });

      newUrl = newUrl.substring(0, newUrl.length - 1);
    }
    return lastValueFrom(this.http.get<any>(newUrl));
  }

  postPromiseRequest(url: string, requestData: any, pathParams?: any[], queryParams?: any) {
    console.log('Into post promise');
    
    this.spinnerService.addSpinner();
    let newUrl = this.serviceUrls[url];
    if (pathParams) {
      newUrl.endsWith('/') ? (newUrl += pathParams.join('/')) : (newUrl += '/' + pathParams.join('/'));
    }
    if (newUrl.endsWith('/')) {
      newUrl = newUrl.substring(0, newUrl.length - 1);
    }
    if (queryParams) {
      newUrl += '?';
      Object.entries(queryParams).forEach(([k, v]) => {
        newUrl += k + '=' + v + '&';
      });

      newUrl = newUrl.substring(0, newUrl.length - 1);
    }
    console.log(newUrl, requestData);
    return lastValueFrom(this.http.post<any>(newUrl, requestData,{headers: this.headers}));
  }

  deletePromiseRequest(url: string, pathParams?: any[], queryParams?: any) {
    this.spinnerService.addSpinner();
    let newUrl = this.serviceUrls[url];
    if (pathParams) {
      newUrl.endsWith('/') ? (newUrl += pathParams.join('/')) : (newUrl += '/' + pathParams.join('/'));
    }
    if (newUrl.endsWith('/')) {
      newUrl = newUrl.substring(0, newUrl.length - 1);
    }
    if (queryParams) {
      newUrl += '?';
      Object.entries(queryParams).forEach(([k, v]) => {
        newUrl += k + '=' + v + '&';
      });

      newUrl = newUrl.substring(0, newUrl.length - 1);
    }
    return lastValueFrom(this.http.delete<any>(newUrl));
  }

  putPromiseRequest(url: string, requestData: any, pathParams?: any[], queryParams?: any) {
    this.spinnerService.addSpinner();
    let newUrl = this.serviceUrls[url];
    if (pathParams) {
      newUrl.endsWith('/') ? (newUrl += pathParams.join('/')) : (newUrl += '/' + pathParams.join('/'));
    }
    if (newUrl.endsWith('/')) {
      newUrl = newUrl.substring(0, newUrl.length - 1);
    }
    if (queryParams) {
      newUrl += '?';
      Object.entries(queryParams).forEach(([k, v]) => {
        newUrl += k + '=' + v + '&';
      });

      newUrl = newUrl.substring(0, newUrl.length - 1);
    }
    return lastValueFrom(this.http.put<any>(newUrl, requestData));
  }

  getRequestInBackground(url: string, pathParams?: any[], queryParams?: any) {
    let newUrl = this.serviceUrls[url];
    if (pathParams) {
      newUrl.endsWith('/') ? (newUrl += pathParams.join('/')) : (newUrl += '/' + pathParams.join('/'));
    }
    if (newUrl.endsWith('/')) {
      newUrl = newUrl.substring(0, newUrl.length - 1);
    }
    if (queryParams) {
      newUrl += '?';
      Object.entries(queryParams).forEach(([k, v]) => {
        newUrl += k + '=' + v + '&';
      });

      newUrl = newUrl.substring(0, newUrl.length - 1);
    }
    return this.http.get<any>(newUrl);
  }

  postRequestInBackground(url: string, requestData: any, pathParams?: any[], queryParams?: any) {
    let newUrl = this.serviceUrls[url];
    if (pathParams) {
      newUrl.endsWith('/') ? (newUrl += pathParams.join('/')) : (newUrl += '/' + pathParams.join('/'));
    }
    if (newUrl.endsWith('/')) {
      newUrl = newUrl.substring(0, newUrl.length - 1);
    }
    if (queryParams) {
      newUrl += '?';
      Object.entries(queryParams).forEach(([k, v]) => {
        newUrl += k + '=' + v + '&';
      });

      newUrl = newUrl.substring(0, newUrl.length - 1);
    }
    return this.http.post<any>(newUrl, requestData);
  }

  deleteRequestInBackground(url: string, pathParams?: any[], queryParams?: any) {
    let newUrl = this.serviceUrls[url];
    if (pathParams) {
      newUrl.endsWith('/') ? (newUrl += pathParams.join('/')) : (newUrl += '/' + pathParams.join('/'));
    }
    if (newUrl.endsWith('/')) {
      newUrl = newUrl.substring(0, newUrl.length - 1);
    }
    if (queryParams) {
      newUrl += '?';
      Object.entries(queryParams).forEach(([k, v]) => {
        newUrl += k + '=' + v + '&';
      });

      newUrl = newUrl.substring(0, newUrl.length - 1);
    }
    return this.http.delete<any>(newUrl);
  }

  putRequestInBackground(url: string, requestData: any, pathParams?: any[], queryParams?: any) {
    let newUrl = this.serviceUrls[url];
    if (pathParams) {
      newUrl.endsWith('/') ? (newUrl += pathParams.join('/')) : (newUrl += '/' + pathParams.join('/'));
    }
    if (newUrl.endsWith('/')) {
      newUrl = newUrl.substring(0, newUrl.length - 1);
    }
    if (queryParams) {
      newUrl += '?';
      Object.entries(queryParams).forEach(([k, v]) => {
        newUrl += k + '=' + v + '&';
      });

      newUrl = newUrl.substring(0, newUrl.length - 1);
    }
    return this.http.put<any>(newUrl, requestData);
  }
}
