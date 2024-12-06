import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeadComponent } from './head.component';
import { AdministrationComponent } from './components/administration/administration.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ExpertLectureComponent } from './components/administration/expert-lecture/expert-lecture.component';

import { MeetingsComponent } from './components/meetings/meetings.component';
import { ExpertLecturePendingComponent } from './components/administration/expert-lecture/expert-lecture-pending/expert-lecture-pending.component';
import { ExpertLectureUpcomingComponent } from './components/administration/expert-lecture/expert-lecture-upcoming/expert-lecture-upcoming.component';
import { ExpertLectureCompletedComponent } from './components/administration/expert-lecture/expert-lecture-completed/expert-lecture-completed.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { AboutComponent } from '../components/about/about.component';
import { OverviewComponent } from '../components/about/overview/overview.component';
import { ContactComponent } from '../components/about/contact/contact.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { FacultyPageComponent } from './components/faculty-page/faculty-page.component';
import { FacultiesComponent } from './components/faculties/faculties.component';
import { StaffComponent } from './components/staff/staff.component';
import { InfrastructureComponent } from './components/infrastructure/infrastructure.component';
import { IndustryVisitComponent } from './components/administration/industry-visit/industry-visit.component';
import { AdminComponent } from '../components/admin/admin.component';
import { IndustryVisitPendingComponent } from './components/administration/industry-visit/industry-visit-pending/industry-visit-pending.component';
import { IndustryVisitUpcomingComponent } from './components/administration/industry-visit/industry-visit-upcoming/industry-visit-upcoming.component';
import { IndustryVisitCompletedComponent } from './components/administration/industry-visit/industry-visit-completed/industry-visit-completed.component';
// import { FacultiesComponent } from './components/faculty-page/faculties/faculties.component';
// import { StaffComponent } from './components/faculty-page/staff/staff.component';

import { EventCompletedComponent } from './components/administration/event/event-completed/event-completed.component';
import { EventComponent } from './components/administration/event/event.component';
import { EventOngoingComponent } from './components/administration/event/event-ongoing/event-ongoing.component';
import { EventUpcomingComponent } from './components/administration/event/event-upcoming/event-upcoming.component';

const routes: Routes = [
  {
    path: '',
    component: HeadComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'admin',
        component: AdministrationComponent,
        children: [
          {
            path: '',
            redirectTo: 'expertLecture',
            pathMatch: 'full',
          },
          {
            path: 'myTasks',
            component: TasksComponent,
          },
          {
            path: 'expertLecture',
            component: ExpertLectureComponent,
            children: [
              {
                path: '',
                redirectTo: 'expert-lecture-pending',
                pathMatch: 'full',
              },
              {
                path: 'expert-lecture-pending',
                component: ExpertLecturePendingComponent,
              },
              {
                path: 'expert-lecture-upcoming',
                component: ExpertLectureUpcomingComponent,
              },
              {
                path: 'expert-lecture-completed',
                component: ExpertLectureCompletedComponent,
              },
            ],
          },
          {
            path: 'event',
            component: EventComponent,
            children: [
              {
                path: '',
                redirectTo: 'event-completed',
                pathMatch: 'full',
              },
              {
                path: 'event-completed',
                component: EventCompletedComponent,
              },
              {
                path: 'event-upcoming',
                component: EventUpcomingComponent,
              },
              {
                path: 'event-ongoing',
                component: EventOngoingComponent,
              },
            ],
          },
          {
            path: 'industryVisit',
            component: IndustryVisitComponent,
            children: [
              {
                path: '',
                redirectTo: 'industry-visit-pending',
                pathMatch: 'full',
              },
              {
                path: 'industry-visit-pending',
                component: IndustryVisitPendingComponent,
              },
              {
                path: 'industry-visit-upcoming',
                component: IndustryVisitUpcomingComponent,
              },
              {
                path: 'industry-visit-completed',
                component: IndustryVisitCompletedComponent,
              }
            ]
          },
          {
            path: 'systemAdmin',
            component: AdminComponent,
          },
          {
            path: 'infrastructure',
            component: InfrastructureComponent,
          },
        ]
      },
      {
        path: 'faculty',
        component: FacultyPageComponent,
        children: [
          {
            path: '',
            redirectTo: 'faculties',
            pathMatch: 'full',
          },
          {
            path: 'faculties',
            component: FacultiesComponent,
          },
          {
            path: 'staff',
            component: StaffComponent,
          },
        ]
      },
      {
        path: 'infrastructure',
        component: InfrastructureComponent,
      },
      
      {
        path: 'meetings',
        component: MeetingsComponent,
      },
      {
        path: 'tasks',
        component: TasksComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
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
export class HeadRoutingModule { }
