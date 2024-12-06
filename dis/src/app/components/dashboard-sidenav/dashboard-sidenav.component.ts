import { CUSTOM_ELEMENTS_SCHEMA, Component, NgModule, OnInit } from '@angular/core';
import { UserData } from './constant';
import { images } from 'src/assets/images';
import { SpinnerService } from 'src/app/services/spinner.service';
import { HotToastService } from '@ngneat/hot-toast';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard-sidenav',
  templateUrl: './dashboard-sidenav.component.html',
  styleUrls: ['./dashboard-sidenav.component.scss'],
})

export class DashboardSidenavComponent implements OnInit {
  userData: UserData | undefined;
  images : any = images;
  img : any = 'https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png';
  userName : any ;
  name:any;
  token:any;

  constructor(private userService: UserService, private spinnerService: SpinnerService, private toastService: HotToastService) {}

  ngOnInit(): void {
    this.token = sessionStorage.getItem('token');
    this.token = "Bearer "+this.token;
    this.userService.getDashboardSideNavigationDetails(this.token).subscribe({
      next: (response: UserData) => {
        this.userData = response;
        console.log(this.userData);
        this.userName = this.userData.username;
        this.name = this.userData.name;
        if(this.userData.currentDesignation != null && this.userData.name != null )
          sessionStorage.setItem('role',this.userData.currentDesignation);
        sessionStorage.setItem('fullname',this.name);
      },
      error: () => {
        this.toastService.error('Unable to fetch Side Navigation Details', { id: 'pause' });
        this.spinnerService.removeSpinner();
      },
      complete: () => {
        this.spinnerService.removeSpinner();
      },
    });
  }
}
