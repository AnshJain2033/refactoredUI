import { Injectable } from '@angular/core';
import { SpinnerService } from './spinner.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { serviceUrls } from '../shared/constants/serviceUrls';
import { Observable } from 'rxjs';
import { options } from '@fullcalendar/core/preact';

@Injectable({
  providedIn: 'root'
})
export class StudentLeaveService {

  
    
    private serviceUrls = serviceUrls;
  
    constructor(private http: HttpClient, private spinnerService: SpinnerService) { }
    public addLeaveSupportingDocument(leaveId:any,data:any):Observable<any>{
      this.spinnerService.addSpinner();
      const headers = new HttpHeaders({'Access-Control-Allow-Origin':'*'});
      const params = new HttpParams().set('id',leaveId);
      
      return this.http.post<any>(this.serviceUrls.addLeaveSupportingDocument,data,{params:params,headers:headers});
    }
    public addLeave(data:any):Observable<any>{
      this.spinnerService.addSpinner();
      console.log(data)
      const headers = new HttpHeaders({'Access-Control-Allow-Origin':'*'});
      return this.http.post<any>(this.serviceUrls.addLeave,data,{headers:headers});
    }
    public getLeaveByStudentId(studentId:any):Observable<any>{
      this.spinnerService.addSpinner();
      const headers = new HttpHeaders({'Access-Control-Allow-Origin':'*'});
      const params = new HttpParams().set('studentId',studentId)
      return this.http.get<any>(this.serviceUrls.getLeaveByStudentId,{params:params,headers:headers})
    }
    public deleteLeaveByLeaveId(leaveId:any):Observable<any>{
      this.spinnerService.addSpinner();
      const headers = new HttpHeaders({'Access-Control-Allow-Origin':'*'});
      const params = new HttpParams().set('leaveId',leaveId)
      return this.http.delete<any>(this.serviceUrls.deleteLeaveByLeaveId,{params:params,headers:headers})
    }
    public getLeaveByAssignedId(assignedId:any):Observable<any>{
      this.spinnerService.addSpinner();
      const headers = new HttpHeaders({'Access-Control-Allow-Origin':'*'});
      const params = new HttpParams().set('assignedId',assignedId)
      return this.http.get<any>(this.serviceUrls.getLeaveByAssignedID,{params:params,headers:headers})
    }
    public putLeaveStatusByLeaveId(leaveId:any,status:any):Observable<any>{
      this.spinnerService.addSpinner();
      const headers = new HttpHeaders({'Access-Control-Allow-Origin':'*'});
      // const params = new HttpParams();
      // console.log(leaveId)
      // console.log(status)
      // params.set('leaveId',leaveId)
      // params.set('status',status)
      return this.http.put<any>(this.serviceUrls.putLeaveStatusByLeaveId+"?"+'leaveId'+"="+leaveId+"&"+'status'+"="+status,{headers:headers});
    }
}
