// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class PyqService {

//   constructor() { }
// }

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable ,throwError } from 'rxjs';
import { urls } from '../shared/constants/urls';
import { serviceUrls } from '../shared/constants/serviceUrls';

@Injectable({
  providedIn: 'root'
})
export class PyqService {
private serviceUrls = serviceUrls;
//   private coursesUrl = 'http://localhost:8082/api/subject';
//   private pyqUrl='http://localhost:8082/api/pyq';

  constructor(private http: HttpClient) { }    
    getCourses(): Observable<any> {
      return this.http.get<any>(this.serviceUrls.getSubject);
    }

    uploadFile(formData: FormData): Observable<any> {
        return this.http.post<any>(this.serviceUrls.getUploadPyq, formData);
        }

    generatePyq(semester: string, type: string, course: string): Observable<any> {
      return this.http.get<{filepath:String,course:String,year:number}[]>(this.serviceUrls.getPyq+"/getFilePath", {
        params: { semester, type, course }
      });
    }
  
    downloadFile(filePath: string): Observable<Blob> {
      return this.http.get(this.serviceUrls.getPyq +"/download", {
        params: { filePath },
        responseType: 'blob'
      });
    }
    
  previewFile(filePath: string): Observable<Blob> {
    return this.http.get(this.serviceUrls.getPyq +"/preview", {
      params: { filePath },
      responseType: 'blob'
    });
  }
  getPYQList(): Observable<any[]> {
    return this.http.get<any[]>(this.serviceUrls.getPyq+"/list" );
  }
 private handleError(error: any): Observable<never> {
  console.error('An error occurred:', error);
  return throwError(() => new Error('Something went wrong; please try again later.'));
}
  
}
