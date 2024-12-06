import { Component, OnInit } from '@angular/core';
import { UserData } from './constant';
import { images } from 'src/assets/images';
import { SpinnerService } from 'src/app/services/spinner.service';
import { HotToastService } from '@ngneat/hot-toast';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard-sidenav',
  templateUrl: './dashboard-sidenav.component.html',
  styleUrls: ['./dashboard-sidenav.component.scss']
})
export class DashboardSidenavComponent implements OnInit {
  userData: UserData | undefined;
  images : any = images;
  userName : any ;
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
        if(this.userData.currentDesignation != null)
          sessionStorage.setItem('role',this.userData.currentDesignation);
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
