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
import { IndustryVisitEditDialogComponent } from './components/administration/industry-visit/industry-visit-edit-dialog/industry-visit-edit-dialog.component';
import { IndustryVisitPendingComponent } from './components/administration/industry-visit/industry-visit-pending/industry-visit-pending.component';
import { IndustryDialogComponent } from './components/administration/industry-visit/industry-dialog/industry-dialog.component';
import { IndustryVisitUpcomingComponent } from './components/administration/industry-visit/industry-visit-upcoming/industry-visit-upcoming.component';
import { IndustryVisitCompletedComponent } from './components/administration/industry-visit/industry-visit-completed/industry-visit-completed.component';
import { MeetingsComponent } from './components/meetings/meetings.component';
import { MeetingDialogComponent } from './components/meetings/meeting-dialog/meeting-dialog.component';

import { TableComponent } from '../components/table/table.component';
import { InfrastructureComponent } from './components/infrastructure/infrastructure.component';
import { LaboratoryComponent } from './components/infrastructure/laboratory/laboratory.component';
import { ClassroomComponent } from './components/infrastructure/classroom/classroom.component';
import { FacultyRoomComponent } from './components/infrastructure/faculty-room/faculty-room.component';
import { OtherComponent } from './components/infrastructure/other/other.component';
import { InfrastructureDialogComponent } from './components/infrastructure/infrastructure-dialog/infrastructure-dialog.component';
import { MoodleComponent } from './components/moodle/moodle.component';
import { LeavesComponent } from './components/leaves/leaves.component';
import { ComplaintsComponent } from './components/complaints/complaints.component';
import { NotificationsComponent } from './components/notifications/notifications.component';


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
    MeetingsComponent,
    MeetingDialogComponent,
    InfrastructureComponent,
    LaboratoryComponent,
    ClassroomComponent,
    FacultyRoomComponent,
    OtherComponent,
    InfrastructureDialogComponent,
    MoodleComponent,
    LeavesComponent,
    ComplaintsComponent,
    NotificationsComponent,
    IndustryVisitEditDialogComponent
    // TableComponent,
    
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
    FullCalendarModule
  ],
 // schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FacultyModule { }
