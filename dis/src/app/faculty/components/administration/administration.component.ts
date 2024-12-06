import { Component } from '@angular/core';
import { values } from 'lodash';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent {

  navItemList: any[] = [
    // { code: 'tasks', value: 'My Task' },
    { code: 'projectGuide', value: 'Project Guide' },
    { code: 'expertLecture', value: 'Expert Lecture' },
    // { code: 'magazine', value: 'Magazine' },
    { code: 'event', value: 'Event' },
    { code: 'industryVisit', value: 'Industry Visit' },
    { code: 'library', value: 'Library' },
    { code: 'MEScholarship', value: 'ME Scholarship' },
    { code: 'courseScheme', value: 'Course Scheme' },
    { code: 'systemAdmin', value: 'System Admin' },
    { code: 'uploadtimetable', value: 'Upload Timetable' }, 
    { code: 'leaves', value: 'Student Leave'}
    // { code: 'uploadevent', value: 'Upload Event' },
  ];
}

