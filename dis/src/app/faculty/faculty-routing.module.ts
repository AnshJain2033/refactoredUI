import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FacultyComponent } from './faculty.component';
import { DashboardComponent } from '../head/components/dashboard/dashboard.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { AboutComponent } from '../components/about/about.component';
import { OverviewComponent } from '../components/about/overview/overview.component';
import { ContactComponent } from '../components/about/contact/contact.component';
import { AdministrationComponent } from './components/administration/administration.component';
import { ExpertLectureComponent } from './components/administration/expert-lecture/expert-lecture.component';
import { ExpertLecturePendingComponent } from './components/administration/expert-lecture/expert-lecture-pending/expert-lecture-pending.component';
import { ExpertLectureUpcomingComponent } from './components/administration/expert-lecture/expert-lecture-upcoming/expert-lecture-upcoming.component';
import { ExpertLectureCompletedComponent } from './components/administration/expert-lecture/expert-lecture-completed/expert-lecture-completed.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { IndustryVisitComponent } from './components/administration/industry-visit/industry-visit.component';
import { IndustryVisitPendingComponent } from './components/administration/industry-visit/industry-visit-pending/industry-visit-pending.component';
import { IndustryVisitUpcomingComponent } from './components/administration/industry-visit/industry-visit-upcoming/industry-visit-upcoming.component';
import { IndustryVisitCompletedComponent } from './components/administration/industry-visit/industry-visit-completed/industry-visit-completed.component';

const routes: Routes = [
  {
    path: '',
    component: FacultyComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },
      {
        path: 'about',
        component: AboutComponent,
        children:[
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
        
          path: 'tasks',
          component: TasksComponent,
        
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
            path: 'tasks',
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
          }
        ]
      }
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
export class FacultyRoutingModule { }
