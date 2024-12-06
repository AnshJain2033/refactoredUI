import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {

  footerList = [
      {
        text: 'Home',
        route: '..'
      },
      {
        text: 'Contact Us',
        route: 'contact'
      }
    ]
  
}
