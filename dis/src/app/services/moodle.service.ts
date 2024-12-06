import { Injectable } from '@angular/core';
import { serviceUrls } from '../shared/constants/serviceUrls';
import { SpinnerService } from './spinner.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoodleService {

  
  private serviceUrls = serviceUrls;
  
  constructor(private http: HttpClient, private spinnerService: SpinnerService) { }
  public getMoodleLoginPage():Observable<any>{
    this.spinnerService.addSpinner();
    const headers = new HttpHeaders({'Access-Control-Allow-Origin':'*'});
    
    
    return this.http.get<any>(this.serviceUrls.getMoodleLoginPage,{headers:headers});
  }
}
