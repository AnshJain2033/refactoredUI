import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {

  
 
  navItemList: any[] = [
    { code: 'overview', value: 'Overview' },
    { code: 'contact', value: 'Contact' },
    // { code: 'library', value: 'Library' },
    // { code: 'magazine', value: 'Magazine' },
    // { code: 'facultyMembers', value: 'Faculty Members' },
    // { code: 'staff', value: 'Staff' },
  ];
}
