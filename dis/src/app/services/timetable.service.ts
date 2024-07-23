import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { serviceUrls } from '../shared/constants/serviceUrls';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {

  private serviceUrls = serviceUrls;

  constructor(private http: HttpClient) { }

  public getAllCourses(){
    return this.http.get<any>(serviceUrls.getCourseList);
  }
  
}
