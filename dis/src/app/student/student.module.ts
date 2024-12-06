import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ReactiveFormsModule } from '@angular/forms';

import { StudentRoutingModule } from './student-routing.module';
import { EventComponent } from './components/event/event.component';
import { EventFormComponent } from './components/event/event-form/event-form.component';
import { StudentComponent } from './student.component';
import { EventFetchComponent } from './components/event/event-fetch/event-fetch.component';
// import { NavbarComponent } from '../components/navbar/navbar.component';
// import { FooterComponent } from '../components/footer/footer.component';
import { MaterialModule } from '../shared/material/material.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EventDetailComponent } from './components/event/event-detail/event-detail.component';
import { EventListComponent } from './components/event/event-list/event-list.component';
// import { ProfileComponent } from './profile/profile.component';
import { ProfileComponent } from './components/profile/profile/profile.component';
import { AddDetailComponent } from './components/profile/add-detail/add-detail.component';
import { EditProfileComponent } from './components/profile/edit-profile/edit-profile.component';
import { DisPyqComponent } from './components/dis-pyq/dis-pyq.component';
import { PYQComponent } from './components/dis-pyq/pyq/pyq.component';
import { AddCompanyFormComponent } from './components/placement/addCompanyForm/addCompanyForm.component';
import { AddQuestionComponent } from './components/placement/addQuestion/addQuestion.component';
import { CardPageComponent } from './components/placement/card-page/card-page.component';
import { CardComponent } from './components/placement/card/card.component';
import { QuestionListComponent } from './components/placement/question-list/question-list.component';
import { TopicListComponent } from './components/placement/topic-list/topic-list.component';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { LeaveComponent } from './components/leave/leave.component';
import { LeaveFormComponent } from './components/leave-form/leave-form.component';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
  declarations: [
    EventComponent,
    EventFormComponent,
    StudentComponent,
    DashboardComponent,
    EventFetchComponent,
    EventDetailComponent,
    EventListComponent,
    DisPyqComponent,
    PYQComponent,
    ProfileComponent,
    AddDetailComponent,
    EditProfileComponent,
    AddCompanyFormComponent,
    AddQuestionComponent,
    CardComponent,
    CardPageComponent,
    QuestionListComponent,
    TopicListComponent,
    StudentComponent,
      LeaveFormComponent
    
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    SharedModule,
    MaterialModule,
    FullCalendarModule,
    ReactiveFormsModule,
    FormsModule,
    StudentRoutingModule,
    SharedModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MaterialModule,
    MatDialogModule,
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
})
export class StudentModule { }
