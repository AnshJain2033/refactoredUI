import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AssignLeaveCoordinatorComponent } from './components/assign-leave-coordinator/assign-leave-coordinator.component';
import { AssignLeavePendingComponent } from './components/assign-leave-coordinator/components/assign-leave-pending/assign-leave-pending.component';
import { AssignLeaveCompletedComponent } from './components/assign-leave-coordinator/components/assign-leave-completed/assign-leave-completed.component';
import { AssignLeavePendingStudentComponent } from './components/assign-leave-coordinator/components/assign-leave-pending/components/assign-leave-pending-student/assign-leave-pending-student.component';
import { AssignLeavePendingFacultyComponent } from './components/assign-leave-coordinator/components/assign-leave-pending/components/assign-leave-pending-faculty/assign-leave-pending-faculty.component';
import { AssignLeaveCompletedStudentComponent } from './components/assign-leave-coordinator/components/assign-leave-completed/components/assign-leave-completed-student/assign-leave-completed-student.component';
import { AssignLeaveCompletedFacultyComponent } from './components/assign-leave-coordinator/components/assign-leave-completed/components/assign-leave-completed-faculty/assign-leave-completed-faculty.component';


const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'leaves',
        component:AssignLeaveCoordinatorComponent,
        children:[
          {
            path: 'assign-leave-pending',
            component: AssignLeavePendingComponent,
            children:[
              {
                path:'assign-leave-pending-student',
                component:AssignLeavePendingStudentComponent,
              },
              {
                path:'assign-leave-pending-faculty',
                component: AssignLeavePendingFacultyComponent,
              }
            ]
          },
          {
            path:'assign-leave-completed',
            component: AssignLeaveCompletedComponent,
            children:[
              {
                path:'assign-leave-completed-student',
                component:AssignLeaveCompletedStudentComponent,
              },
              {
                path:'assign-leave-completed-faculty',
                component:AssignLeaveCompletedFacultyComponent,
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
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
