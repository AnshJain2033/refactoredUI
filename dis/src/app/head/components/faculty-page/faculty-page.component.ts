import { Component } from '@angular/core';
import { NavItem } from '../../constants';

@Component({
  selector: 'app-faculty-page',
  templateUrl: './faculty-page.component.html',
  styleUrls: ['./faculty-page.component.scss']
})
export class FacultyPageComponent {
  constructor( ) {}

  selectedTab: string = 'Faculty';
  navItemList: NavItem[] = [
    { code: 'faculties', value: 'Faculty members' },
    { code: 'staff', value: 'Staff' },
    // { code: 'panel', value: 'Panel' },
  ];
}
