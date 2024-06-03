import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SpinnerService } from './spinner.service';
import { Router } from '@angular/router';
import { serviceUrls } from '../shared/constants/serviceUrls';
import { Attendance, Meeting } from '../head/components/meetings/constants';

@Injectable({
  providedIn: 'root'
})
export class MeetingsService {

  private serviceUrls = serviceUrls;

  constructor(private http: HttpClient, private spinnerService: SpinnerService, private router: Router) { }

  public getPastMeetings(){
    this.spinnerService.addSpinner();
    //const headers = new HttpHeaders({'Authorization':token});
    return this.http.get<any>(this.serviceUrls.getPastMeetings);
  }

  public getFutureMeetings(){
    this.spinnerService.addSpinner();
    //const headers = new HttpHeaders({'Authorization':token});
    return this.http.get<any>(this.serviceUrls.getFutureMeetings);
  }

  public getCurrentMeetings(){
    this.spinnerService.addSpinner();
    //const headers = new HttpHeaders({'Authorization':token});
    return this.http.get<any>(this.serviceUrls.getCurrentMeetings);
  }

  public createMeeting(meet:Meeting){
    this.spinnerService.addSpinner();
    return this.http.post<any>(this.serviceUrls.createMeeting, meet);
  }

  public deleteMeeting(meetingId:any){
    this.spinnerService.addSpinner();
    const headers = new HttpHeaders({'Access-Control-Allow-Origin':'*'});
    return this.http.delete<any>(this.serviceUrls.deleteMeeting+"/"+meetingId,{headers: headers});
    //return this.http.post<any>(this.serviceUrls.createMeeting, meet);
  }

  public updateMeeting(meet:Meeting, meetingId:any,type: string){
    this.spinnerService.addSpinner();
    console.log(meetingId);
    
   // const headers = new HttpHeaders({'Access-Control-Allow-Origin':'*'});
    return this.http.post<any>(this.serviceUrls.updateMeeting+"/"+type+"/"+meetingId,meet);
  }

  public getAllAttendees(meetingId:any){
    this.spinnerService.addSpinner();
    return this.http.get<any>(this.serviceUrls.getAllMeetingAttendees+"/"+meetingId);
  }

  public saveAttendance(attendance: Attendance){
    this.spinnerService.addSpinner();
    return this.http.put<any>(this.serviceUrls.markMeetingAttendance,attendance);
    
  }

  public getPastMeetingAttendees(meetingId:any){
    this.spinnerService.addSpinner();
    return this.http.get<any>(this.serviceUrls.getPastMeetingAttendees+"/"+meetingId);
  }
}
