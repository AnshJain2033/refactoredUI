import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { UserData } from './constants';
import { images } from 'src/assets/images';
import { SpinnerService } from 'src/app/services/spinner.service';
import { HotToastService } from '@ngneat/hot-toast';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  // images = {
  //   'JohnDoe': 'assets/images/johndoe.png'
  //   // Add other users as needed
  // };

  // userName = 'JohnDoe';
  
  // userData = {
  //   name: 'John Doe',
  //   currentDesignation: 'Student',
  //   username: 'JohnDoe'
  // };
  userData: UserData | undefined;
  images : any = images;
  userName : any ;
  token:any;

  constructor(private userService: UserService, private spinnerService: SpinnerService, private toastService: HotToastService,private router: Router) {}

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

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    height: 440,
    initialView: 'dayGridMonth',
    events: [
      { title: 'event 1', date: '2019-04-01' },
      { title: 'event 2', date: '2019-04-02' },
    ],
  };

  // constructor() {}

  handleDateClick(arg: any) {
    alert('date click! ' + arg.dateStr);
  }

  events = [
    {
      name: 'Annual Meetup',
      date: new Date('2024-10-10')
    },
    {
      name: 'Hackathon',
      date: new Date('2024-11-05')
    },
    {
      name: 'Networking Event',
      date: new Date('2024-12-01')
    }
  ];


  // ngOnInit(): void {
  //   // Additional logic for initializing component if needed
  // }

  // Function to handle "View All Events" button click
  viewAllEvents(): void {
    console.log('View All Events button clicked!');
    // Implement the logic to show all events, possibly by navigating to another page or loading more events
    // For example, you might use a router to navigate to an events page:
    // this.router.navigate(['/events']);
    this.router.navigate(['/student/event-fetch']);
  }
}
