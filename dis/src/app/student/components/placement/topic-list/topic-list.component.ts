import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlacementService } from 'src/app/services/placement.service';
import { AddQuestionComponent } from '../addQuestion/addQuestion.component';

interface company {
  id : number;
  name: string;
  category: string;
  description: string;
  eligibility: string;
  website: string;
  package: string;
  designation: string
}
interface Topic {
  id: number;
  name: string;
  category: string;
  companyId: number;
}

@Component({
  selector: 'app-topic-list',
  // standalone: true,
  // imports: [CommonModule, AddQuestionComponent, NgbModule],
  templateUrl: './topic-list.component.html',
  styleUrls: ['./topic-list.component.css']
})

export class TopicListComponent{

  constructor(private router: Router, private placementService: PlacementService, private route: ActivatedRoute) {}

   // Variable to track the active tab
   activeTab: string = 'overview';
   @ViewChild(AddQuestionComponent) AddQuestionComponent!: AddQuestionComponent;

   // Method to set the active tab
   setActiveTab(tab: string) {
     this.activeTab = tab;
   }

topics: Topic[] = [];
category: string='';
showAddQuestionForm = false;
categorizedTopics: {
  onlineAssessment: Topic[];
  interview: Topic[];
  writtenTest: Topic[];
} = {
  onlineAssessment: [],
  interview: [],
  writtenTest: []
};

company!: company;
 value: string='';
 companyId: number=0;

ngOnInit() {
    this.value = this.route.snapshot.params['value'];
    this.companyId = this.route.snapshot.params['companyId'];
    this.fetchCompany(this.companyId);
    this.fetchTopics(this.companyId);
}

fetchCompany(companyId: number){
  this.placementService.getCompanyById(companyId).subscribe((company:company) => {
  this.company = company;
  console.log(this.company);
  console.log(this.company.package);
});
}

fetchTopics(companyId: number) {
  if (this.value == 'Internship'){
    this.placementService.getTopicsByCompanyId(companyId).subscribe((topics:Topic[]) => {
        this.topics = topics;
        this.categorizeTopics();
    });
  }
  else {
    this.placementService.getPlacementTopicsByCompanyId(companyId).subscribe((topics:Topic[]) => {
      this.topics = topics;
      this.categorizeTopics();
  });
}
}

categorizeTopics() {

  this.categorizedTopics.onlineAssessment = [];
  this.categorizedTopics.interview = [];
  this.categorizedTopics.writtenTest = [];

  this.topics.forEach((topic: Topic) => {
    switch (topic.category) {
      case 'Online Assessment':
        this.categorizedTopics.onlineAssessment.push(topic);
        break;
      case 'Interview':
        this.categorizedTopics.interview.push(topic);
        break;
      case 'Written Test':
        this.categorizedTopics.writtenTest.push(topic);
        break;
    }
  });
}
  navigateToQuestionList(topicId: number): void {
    this.router.navigate(['/student/question-list', topicId, this.value]);
  }

 isFormVisible = false;


  addQuestion(category: string){
    if (category === 'Online Assessment'){
      this.placementService.setTopics(this.categorizedTopics.onlineAssessment);
    }
    else if (category === 'Interview'){
      this.placementService.setTopics(this.categorizedTopics.interview);
    }
    else{
      this.placementService.setTopics(this.categorizedTopics.writtenTest);
    }
    // this.category=category;

    this.isFormVisible = !this.isFormVisible;
    //this.router.navigate(['/student/addQuestion', this.value, category, this.companyId]);
  }

  // onFormClosed() {
  //   this.showAddQuestionForm = false; // Hide the form when it's closed
  // }

  
}