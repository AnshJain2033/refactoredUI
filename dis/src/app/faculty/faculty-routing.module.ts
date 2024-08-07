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
import { MeetingsComponent } from './components/meetings/meetings.component';
import { LaboratoryComponent } from './components/infrastructure/laboratory/laboratory.component';
import { ClassroomComponent } from './components/infrastructure/classroom/classroom.component';
import { FacultyRoomComponent } from './components/infrastructure/faculty-room/faculty-room.component';
import { OtherComponent } from './components/infrastructure/other/other.component';
import { InfrastructureComponent } from './components/infrastructure/infrastructure.component';
import { MoodleComponent } from './components/moodle/moodle.component';
import { ComplaintsComponent } from './components/complaints/complaints.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { LeavesComponent } from './components/leaves/leaves.component';

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
        path: 'meetings',
        component: MeetingsComponent,
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
        path: 'infrastructure',
        component: InfrastructureComponent,
        children: [
          {
            path: '',
            redirectTo: 'laboratory',
            pathMatch: 'full',
          },
          {
            path: 'laboratory',
            component: LaboratoryComponent,
          },
          {
            path: 'classroom',
            component: ClassroomComponent,
          },
          {
            path: 'facultyRoom',
            component: FacultyRoomComponent,
          },
          {
            path: 'other',
            component: OtherComponent,
          }
        ],
      },
      {
        path: 'moodle',
        component: MoodleComponent,
      },
      {
        path: 'complaints',
        component: ComplaintsComponent,
      },
      {
        path: 'notifications',
        component: NotificationsComponent,
      },
      {
        path: 'leaves',
        component: LeavesComponent,
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
