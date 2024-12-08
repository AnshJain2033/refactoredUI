import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './components/admin/admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MaterialModule } from '../shared/material/material.module';
import { UploadCsvDialogComponent } from './components/upload-csv-dialog/upload-csv-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AssignLeaveCoordinatorComponent } from './components/assign-leave-coordinator/assign-leave-coordinator.component';
import { AssignLeavePendingComponent } from './components/assign-leave-coordinator/components/assign-leave-pending/assign-leave-pending.component';
import { AssignLeaveCompletedComponent } from './components/assign-leave-coordinator/components/assign-leave-completed/assign-leave-completed.component';
import { AssignLeavePendingFacultyComponent } from './components/assign-leave-coordinator/components/assign-leave-pending/components/assign-leave-pending-faculty/assign-leave-pending-faculty.component';
import { AssignLeavePendingStudentComponent } from './components/assign-leave-coordinator/components/assign-leave-pending/components/assign-leave-pending-student/assign-leave-pending-student.component';
import { AssignLeaveCompletedStudentComponent } from './components/assign-leave-coordinator/components/assign-leave-completed/components/assign-leave-completed-student/assign-leave-completed-student.component';
import { AssignLeaveCompletedFacultyComponent } from './components/assign-leave-coordinator/components/assign-leave-completed/components/assign-leave-completed-faculty/assign-leave-completed-faculty.component';



@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    UploadCsvDialogComponent,
    AssignLeaveCoordinatorComponent,
    AssignLeavePendingComponent,
    AssignLeaveCompletedComponent,
    AssignLeavePendingFacultyComponent,
    AssignLeavePendingStudentComponent,
    AssignLeaveCompletedStudentComponent,
    AssignLeaveCompletedFacultyComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
})
export class AdminModule { }
