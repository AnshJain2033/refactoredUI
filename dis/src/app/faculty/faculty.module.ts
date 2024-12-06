import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FacultyRoutingModule } from './faculty-routing.module';
import { MaterialModule } from '../shared/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FacultyComponent } from './faculty.component';
import { AdministrationComponent } from './components/administration/administration.component';
import { ExpertLectureComponent } from './components/administration/expert-lecture/expert-lecture.component';
import { ExpertLecturePendingComponent } from './components/administration/expert-lecture/expert-lecture-pending/expert-lecture-pending.component';
import { ExpertLectureUpcomingComponent } from './components/administration/expert-lecture/expert-lecture-upcoming/expert-lecture-upcoming.component';
import { ExpertLectureCompletedComponent } from './components/administration/expert-lecture/expert-lecture-completed/expert-lecture-completed.component';
import { ExpertDialogComponent } from './components/administration/expert-lecture/expert-dialog/expert-dialog.component';
import { ExpertEditDialogComponent } from './components/administration/expert-lecture/expert-edit-dialog/expert-edit-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';
import { ActionsCellRendererComponent } from './components/administration/expert-lecture/actions-cell-renderer/actions-cell-renderer.component';

import { FullCalendarModule } from '@fullcalendar/angular';
import { RouterModule } from '@angular/router';
import { TasksComponent } from './components/tasks/tasks.component';
import { EditTaskDialogComponent } from './components/tasks/edit-task-dialog/edit-task-dialog.component';
import { ActionsCellRendererTaskComponent } from './components/tasks/actions-cell-renderer-task/actions-cell-renderer-task.component';
import { IndustryVisitComponent } from './components/administration/industry-visit/industry-visit.component';
import { IndustryVisitPendingComponent } from './components/administration/industry-visit/industry-visit-pending/industry-visit-pending.component';
import { IndustryDialogComponent } from './components/administration/industry-visit/industry-dialog/industry-dialog.component';
import { IndustryVisitUpcomingComponent } from './components/administration/industry-visit/industry-visit-upcoming/industry-visit-upcoming.component';
import { IndustryVisitCompletedComponent } from './components/administration/industry-visit/industry-visit-completed/industry-visit-completed.component';

import { EventComponent } from './components/administration/event/event.component';
import { EventDialogComponent } from './components/administration/event/event-dialog/event-dialog.component';
import { EventCompletedComponent } from './components/administration/event/event-completed/event-completed.component';
import { EventOngoingComponent } from './components/administration/event/event-ongoing/event-ongoing.component';
import { EventUpcomingComponent } from './components/administration/event/event-upcoming/event-upcoming.component';
import { EventFetchComponent } from './components/administration/event/event-fetch/event-fetch.component';
import { EventDetailComponent } from './components/administration/event/event-detail/event-detail.component';
import { UploadsPyqComponent } from './components/service/uploads-pyq/uploads-pyq.component';

import { MatTabsModule } from '@angular/material/tabs';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StudentLeaveAplcationComponentComponent } from './components/administration/student-leave-application-component/student-leave-application-component.component';
import { StudentLeaveDetailComponent } from './components/administration/student-leave-detail/student-leave-detail.component';

@NgModule({
  declarations: [
    FacultyComponent,
    AdministrationComponent,
    ExpertLectureComponent,
    ExpertLecturePendingComponent,
    ExpertLectureUpcomingComponent,
    ExpertLectureCompletedComponent,
    ExpertDialogComponent,
    ExpertEditDialogComponent,
    ActionsCellRendererComponent,
    TasksComponent,
    EditTaskDialogComponent,
    ActionsCellRendererTaskComponent,
    IndustryVisitComponent,
    IndustryVisitPendingComponent,
    IndustryDialogComponent,
    IndustryVisitUpcomingComponent,
    IndustryVisitCompletedComponent,
    EventComponent,
    EventDialogComponent,
    EventCompletedComponent,
    EventOngoingComponent,
    EventUpcomingComponent,
    EventFetchComponent,
    DashboardComponent,
    EventDetailComponent,
    UploadsPyqComponent,
    StudentLeaveAplcationComponentComponent,
    StudentLeaveDetailComponent
    // 
  ],
  imports: [
    CommonModule,
    FacultyRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule,
    FlexLayoutModule,
    FullCalendarModule,
    MatTabsModule,
    FacultyRoutingModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule,
    FlexLayoutModule,
    FullCalendarModule
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {}
    },
    {
      provide: MAT_DIALOG_DATA,
      useValue: {}
    },
 ],
 // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FacultyModule { }
