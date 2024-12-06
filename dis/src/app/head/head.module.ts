import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FullCalendarModule } from '@fullcalendar/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HeadRoutingModule } from './head-routing.module';
import { HeadComponent } from './head.component'; 
// import { NavbarComponent } from '../components/navbar/navbar.component';
// import { FooterComponent } from '../components/footer/footer.component';

import { CommonDashboardComponent } from '../components/common-dashboard/common-dashboard.component';
import { DashboardSidenavComponent } from '../components/dashboard-sidenav/dashboard-sidenav.component';

import { MaterialModule } from '../shared/material/material.module';
import { AgGridModule } from 'ag-grid-angular';


import { AdministrationComponent } from './components/administration/administration.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ExpertLectureComponent } from './components/administration/expert-lecture/expert-lecture.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { MeetingsComponent } from './components/meetings/meetings.component';
import { TableComponent } from '../components/table/table.component';
import { MeetingDialogComponent } from './components/meetings/meeting-dialog/meeting-dialog.component';
import { ExpertDialogComponent } from './components/administration/expert-lecture/expert-dialog/expert-dialog.component';
import { ExpertLecturePendingComponent } from './components/administration/expert-lecture/expert-lecture-pending/expert-lecture-pending.component';
import { ExpertLectureCompletedComponent } from './components/administration/expert-lecture/expert-lecture-completed/expert-lecture-completed.component';
import { ExpertLectureUpcomingComponent } from './components/administration/expert-lecture/expert-lecture-upcoming/expert-lecture-upcoming.component';
import { ActionsCellRendererComponent } from './components/administration/expert-lecture/actions-cell-renderer/actions-cell-renderer.component';
import { ExpertEditDialogComponent } from './components/administration/expert-lecture/expert-edit-dialog/expert-edit-dialog.component';
import { ActionsCellRendererTaskComponent } from './components/tasks/actions-cell-renderer-task/actions-cell-renderer-task.component';
import { TasksDialogComponent } from './components/tasks/tasks-dialog/tasks-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { FacultyPageComponent } from './components/faculty-page/faculty-page.component';
import { FacultiesComponent } from './components/faculties/faculties.component';
import { StaffComponent } from './components/staff/staff.component';
import { InfrastructureComponent } from './components/infrastructure/infrastructure.component';
import { InfrastructureDialogComponent } from './components/infrastructure/infrastructure-dialog/infrastructure-dialog.component';
import { IndustryVisitComponent } from './components/administration/industry-visit/industry-visit.component';
import { IndustryDialogComponent } from './components/administration/industry-visit/industry-dialog/industry-dialog.component';
import { AdminComponent } from '../components/admin/admin.component';
import { IndustryVisitPendingComponent } from './components/administration/industry-visit/industry-visit-pending/industry-visit-pending.component';
import { IndustryVisitUpcomingComponent } from './components/administration/industry-visit/industry-visit-upcoming/industry-visit-upcoming.component';
import { IndustryVisitCompletedComponent } from './components/administration/industry-visit/industry-visit-completed/industry-visit-completed.component';
import { IndustryVisitEditDialogComponent } from './components/administration/industry-visit/industry-visit-edit-dialog/industry-visit-edit-dialog.component';
import { EventComponent } from './components/administration/event/event.component';
import { EventCompletedComponent } from './components/administration/event/event-completed/event-completed.component';
import { EventOngoingComponent } from './components/administration/event/event-ongoing/event-ongoing.component';
import { EventUpcomingComponent } from './components/administration/event/event-upcoming/event-upcoming.component';
import { EventDialogComponent } from './components/administration/event/event-dialog/event-dialog.component';
// import { FacultyDialogComponent } from './components/faculty-page/faculties/faculty-dialog/faculty-dialog.component';

//import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
@NgModule({
  declarations: [
    HeadComponent,
    // NavbarComponent,
    //  FooterComponent,
    AdministrationComponent,
    DashboardComponent,
    ExpertLectureComponent,
    TasksComponent,
    CommonDashboardComponent,
    DashboardSidenavComponent,
    MeetingsComponent,
    TableComponent,
    MeetingDialogComponent,
    ExpertDialogComponent,
    ExpertLecturePendingComponent,
    ExpertLectureCompletedComponent,
    ExpertLectureUpcomingComponent,
    ActionsCellRendererComponent,
    ExpertEditDialogComponent,
    ActionsCellRendererTaskComponent,
    TasksDialogComponent,
    FacultyPageComponent,
    FacultiesComponent,
    StaffComponent,
    InfrastructureComponent,
    InfrastructureDialogComponent,
    IndustryVisitComponent,
    IndustryDialogComponent,
    AdminComponent,
    IndustryVisitPendingComponent,
    IndustryVisitUpcomingComponent,
    IndustryVisitCompletedComponent,
    IndustryVisitEditDialogComponent,
    EventComponent,
    EventCompletedComponent,
    EventOngoingComponent,
    EventUpcomingComponent,
    EventDialogComponent
    
   
  ],
  imports: [
    CommonModule,
    HeadRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FullCalendarModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule,
    SharedModule,
  ]
})
export class HeadModule { }
