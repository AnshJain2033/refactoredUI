// {
      //   path: 'admin',
      //   component: AdministrationComponent,
      //   children: [
      //     {
      //       path: '',
      //       redirectTo: 'expertLecture',
      //       pathMatch: 'full',
      //     },
      //     {
      //       path: 'myTasks',
      //       component: TasksComponent,
      //     },
      //     {
      //       path: 'expertLecture',
      //       component: ExpertLectureComponent,
      //       children: [
      //         {
      //           path: '',
      //           redirectTo: 'expert-lecture-pending',
      //           pathMatch: 'full',
      //         },
      //         {
      //           path: 'expert-lecture-pending',
      //           component: ExpertLecturePendingComponent,
      //         },
      //         {
      //           path: 'expert-lecture-upcoming',
      //           component: ExpertLectureUpcomingComponent,
      //         },
      //         {
      //           path: 'expert-lecture-completed',
      //           component: ExpertLectureCompletedComponent,
      //         },
      //       ],
      //     },
      //     {
      //       path: 'event',
      //       component: EventComponent,
      //       children: [
      //         {
      //           path: '',
      //           redirectTo: 'event-completed',
      //           pathMatch: 'full',
      //         },
      //         {
      //           path: 'event-completed',
      //           component: EventCompletedComponent,
      //         },
      //         {
      //           path: 'event-upcoming',
      //           component: EventUpcomingComponent,
      //         },
      //         {
      //           path: 'event-ongoing',
      //           component: EventOngoingComponent,
      //         },
      //       ],
      //     },
      //     {
      //       path: 'industryVisit',
      //       component: IndustryVisitComponent,
      //       children: [
      //         {
      //           path: '',
      //           redirectTo: 'industry-visit-pending',
      //           pathMatch: 'full',
      //         },
      //         {
      //           path: 'industry-visit-pending',
      //           component: IndustryVisitPendingComponent,
      //         },
      //         {
      //           path: 'industry-visit-upcoming',
      //           component: IndustryVisitUpcomingComponent,
      //         },
      //         {
      //           path: 'industry-visit-completed',
      //           component: IndustryVisitCompletedComponent,
      //         }
      //       ]
      //     },
      //     {
      //       path: 'systemAdmin',
      //       component: AdminComponent,
      //     },
      //   ]
      // },
      // {
      //   path: 'faculty',
      //   component: FacultyPageComponent,
      //   children: [
      //     {
      //       path: '',
      //       redirectTo: 'faculties',
      //       pathMatch: 'full',
      //     },
      //     {
      //       path: 'faculties',
      //       component: FacultiesComponent,
      //     },
      //     {
      //       path: 'staff',
      //       component: StaffComponent,
      //     },
      //   ]
      // },
      // {
      //   path: 'infrastructure',
      //   component: InfrastructureComponent,
      // },
      
      // {
      //   path: 'meetings',
      //   component: MeetingsComponent,
      // },
      // {
      //   path: 'tasks',
      //   component: TasksComponent,
      // },



import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentComponent } from './student.component';
// import { AdministrationComponent } from './components/administration/administration.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
// import { ExpertLectureComponent } from './components/administration/expert-lecture/expert-lecture.component';

// import { MeetingsComponent } from './components/meetings/meetings.component';
// import { ExpertLecturePendingComponent } from './components/administration/expert-lecture/expert-lecture-pending/expert-lecture-pending.component';
// import { ExpertLectureUpcomingComponent } from './components/administration/expert-lecture/expert-lecture-upcoming/expert-lecture-upcoming.component';
// import { ExpertLectureCompletedComponent } from './components/administration/expert-lecture/expert-lecture-completed/expert-lecture-completed.component';
// import { TasksComponent } from './components/tasks/tasks.component';
import { AboutComponent } from '../components/about/about.component';
import { OverviewComponent } from '../components/about/overview/overview.component';
import { ContactComponent } from '../components/about/contact/contact.component';
//  import { ProfileComponent } from '../components/profile/profile.component';
// import { ProfileComponent } from './profile/profile.component';
import { ProfileComponent } from './components/profile/profile/profile.component';
import { EventFetchComponent } from './components/event/event-fetch/event-fetch.component';
import { EventDetailComponent } from './components/event/event-detail/event-detail.component';
import { EventListComponent } from './components/event/event-list/event-list.component';
// import { PyqComponent } from './dis-pyq/pyq/pyq.component';
// import { UploadPyqComponent } from './dis-pyq/upload-pyq/upload-pyq.component';
import { AddDetailComponent } from './components/profile/add-detail/add-detail.component';
import { EditProfileComponent } from './components/profile/edit-profile/edit-profile.component';
import { PYQComponent } from './components/dis-pyq/pyq/pyq.component';
import { AddCompanyFormComponent } from './components/placement/addCompanyForm/addCompanyForm.component';
import { AddQuestionComponent } from './components/placement/addQuestion/addQuestion.component';
import { QuestionListComponent } from './components/placement/question-list/question-list.component';
import { TopicListComponent } from './components/placement/topic-list/topic-list.component';
import { CardPageComponent } from './components/placement/card-page/card-page.component';
import { LeaveComponent } from './components/leave/leave.component';
import { MoodleComponent } from '../components/moodle/moodle.component';
// import { FacultyPageComponent } from './components/faculty-page/faculty-page.component';
// import { FacultiesComponent } from './components/faculties/faculties.component';
// import { StaffComponent } from './components/staff/staff.component';
// import { InfrastructureComponent } from './components/infrastructure/infrastructure.component';
// import { IndustryVisitComponent } from './components/administration/industry-visit/industry-visit.component';
// import { AdminComponent } from '../components/admin/admin.component';
// import { IndustryVisitPendingComponent } from './components/administration/industry-visit/industry-visit-pending/industry-visit-pending.component';
// import { IndustryVisitUpcomingComponent } from './components/administration/industry-visit/industry-visit-upcoming/industry-visit-upcoming.component';
// import { IndustryVisitCompletedComponent } from './components/administration/industry-visit/industry-visit-completed/industry-visit-completed.component';
// import { FacultiesComponent } from './components/faculty-page/faculties/faculties.component';
// import { StaffComponent } from './components/faculty-page/staff/staff.component';

// import { EventCompletedComponent } from './components/administration/event/event-completed/event-completed.component';
// import { EventComponent } from './components/administration/event/event.component';
// import { EventOngoingComponent } from './components/administration/event/event-ongoing/event-ongoing.component';
// import { EventUpcomingComponent } from './components/administration/event/event-upcoming/event-upcoming.component';


const routes: Routes = [
  {
    path: '',
    component: StudentComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      // {
      //   path: 'profile',
      //   component: ProfileComponent,
      // },
      {
        path: 'profile',
        component: ProfileComponent,
        children: [
          { path: 'add-detail', component: AddDetailComponent },
         
        ],

      },
      { path: 'edit-profile', component: EditProfileComponent },
      { path: 'leaves', component:LeaveComponent},
      {
        path: 'about',
        component: AboutComponent,
        children: [
          {
            path: '',
            redirectTo: 'overview',
            pathMatch: 'full',
          },
          {
            path: 'overview',
            component: OverviewComponent,
          },
          {
            path: 'contact',
            component: ContactComponent,
          },
        ]
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
      {
        path: 'event-fetch',
        component: EventFetchComponent,
      },
      {
        path: 'event-list',
        component: EventListComponent,
      },
      {
        path: 'event-detail',
        component: EventDetailComponent,
      },
      { path: 'topic-list/:companyId/:value', component: TopicListComponent },
      { path: 'question-list/:topicId/:value', component: QuestionListComponent },
      { path: 'addCompanyForm', component: AddCompanyFormComponent },
      { path: 'addQuestion/:value/:category/:companyId', component: AddQuestionComponent },
      { path: 'PlacementTopic-list/:companyId', component: TopicListComponent },
      { path: 'PlacementQuestion-list/:topicId', component: QuestionListComponent },
      { path: 'addPlacementQuestion', component: AddQuestionComponent },
      {
        path: 'placement',
        component: CardPageComponent,
      },
      {
        path: 'moodle',
        component:MoodleComponent,
      },
      {
        path: 'pyq',
        component: PYQComponent,
      },
      // {
      //   path: 'pyq',
      //   component: PyqComponent,
      //   children: [
      //     {
      //       path: 'upload-pyq', 
      //       component: UploadPyqComponent,
      //     },
      //   ],
      // },
    ]
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
