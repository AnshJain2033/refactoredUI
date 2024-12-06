import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urls } from '../shared/constants/urls';
import { serviceUrls } from '../shared/constants/serviceUrls';

export interface company {
  name: string;
  category: string;
  description: string;
  eligibility: string;
  website: string;
  package_offered: string;
  designation: string
}
export interface Topic {
  id: number;
  name: string;
  category: string;
  companyId: number;
}
export interface question{
question: string;
topicId: number;
}

@Injectable({
  providedIn: 'root'
})
export class PlacementService {
    private serviceUrls = serviceUrls;
    constructor(private http: HttpClient) {}

getTopicsByCompanyId(companyId: number): Observable<Topic[]> {
  return this.http.get<Topic[]>(this.serviceUrls.getTopicsByCompanyId+"/"+companyId+"/Internship");
}
getPlacementTopicsByCompanyId(companyId: number): Observable<Topic[]> {
  return this.http.get<Topic[]>(this.serviceUrls.getPlacementTopicsByCompanyId + "/" + companyId + "/Placement");
}

getCompanyList(categories: string[]): Observable<any> {
  let params = new HttpParams();
  categories.forEach(category => {
  params = params.append('categories', category);
});
  return this.http.get(this.serviceUrls.getCompanyList,  { params });

}

getCompanyById(companyId: number): Observable<any> {
  return this.http.get<any>(this.serviceUrls.getCompanyById+ "/" + companyId);

}

addCompany(company: company): Observable<company> {
  return this.http.post<company>(this.serviceUrls.addCompany, company);
}

addQuestion(question: question): Observable<question> {
  return this.http.post<question>(this.serviceUrls.addQuestion, question);
}

addTopic(topic:{ name: string; category: string; companyId: number;}): Observable<Topic>{
  return this.http.post<Topic>(this.serviceUrls.addTopic, topic);
}

getQuestionsByTopicId(topicId: number): Observable<question[]> {
  return this.http.get<question[]>(this.serviceUrls.getQuestionsByTopicId + "/" + topicId);
}

addPlacementQuestion(question: question): Observable<question> {
  return this.http.post<question>(this.serviceUrls.addPlacementQuestion, question);
}

addPlacementTopic(topic:{ name: string; category: string; companyId: number;}): Observable<Topic>{
  return this.http.post<Topic>(this.serviceUrls.addPlacementTopic, topic);
}

getPlacementQuestionsByTopicId(topicId: number): Observable<question[]> {
  return this.http.get<question[]>(this.serviceUrls.getPlacementQuestionsByTopicId + "/" + topicId);
}

private topics: { id: number; name: string; category: string; companyId: number;}[] = [];
setTopics(topics: { id: number; name: string; category: string; companyId: number;}[]) {
this.topics = topics;
}

getTopics() {
  return this.topics;
}

// Company!: { id: number; name: string; category: string; description: string; };
// setCompany(Company: { id: number; name: string; category: string; description: string;}) {
//   this.Company = Company;
//   console.log('from set',this.Company);
//   }

//   getCompany() {
//     console.log('from get',this.Company);
//     return this.Company;
//   }
}
