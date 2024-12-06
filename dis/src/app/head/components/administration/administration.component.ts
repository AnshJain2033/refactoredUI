import { Component } from '@angular/core';
import { NavItem } from '../../constants';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss']
})
export class AdministrationComponent {

  navItemList: NavItem[] = [
    // { code: 'myTasks', value: 'My Task' },
    { code: 'expertLecture', value: 'Expert Lecture' },
    { code: 'magazine', value: 'Magazine' },
    { code: 'industryVisit', value: 'Industry Visit' },
    { code: 'library', value: 'Library' },
    { code: 'MEScholarship', value: 'ME Scholarship' },
    { code: 'courseScheme', value: 'Course Scheme' },
    { code: 'systemAdmin', value: 'System Admin' },
    { code: 'projectGuide', value: 'Project Guide' },
    { code: 'event', value: 'Event' },
  ];
}
