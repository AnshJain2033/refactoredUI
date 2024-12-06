// // import { Component } from '@angular/core';

// // @Component({
// //   selector: 'app-event-fetch',
// //   standalone: true,
// //   imports: [],
// //   templateUrl: './event-fetch.component.html',
// //   styleUrl: './event-fetch.component.css'
// // })
// // export class EventFetchComponent {

// // }

// import { Component, OnInit } from '@angular/core';
// import { EventformService } from 'src/app/services/eventform.service';

// @Component({
//   selector: 'app-event-fetch',
//   templateUrl: './event-fetch.component.html',
//   styleUrls: ['./event-fetch.component.css']
// })
// export class EventFetchComponent implements OnInit {
//   eventDetails: any[] = [];  // To store event details
  

//   constructor(private eventformService: EventformService) { }

//   ngOnInit(): void {
//     this.loadEventDetails();
//   }

//   // Method to load event details from the backend
//   loadEventDetails() {
//     this.eventformService.getEventDetails().subscribe(
//       (data) => {
//         this.eventDetails = data;
//         console.log('Event Details:', this.eventDetails);
//       },
//       (error) => {
//         console.error('Error fetching event details:', error);
//       }
//     );
//   }
// }
import { Component, OnInit } from '@angular/core';
import { EventformService } from 'src/app/services/eventform.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-fetch',
  templateUrl: './event-fetch.component.html',
  styleUrls: ['./event-fetch.component.css']
})
export class EventFetchComponent implements OnInit {
  eventDetails: any[] = []; // To store all event details
  completedEvents: any[] = []; // To store completed events
  ongoingEvents: any[] = []; // To store ongoing events
  upcomingEvents: any[] = []; // To store upcoming events

  selectedTab = 0; // Default tab (0: Completed, 1: Ongoing, 2: Upcoming)

  //constructor(public dialog: MatDialog) {}

  registerForEvent(eventName: string) {
    this.dialog.open(RegistrationSuccessDialog, {
      data: {
        message: 'Registration successfully done!',
        eventName: eventName
      }
    });
  }

  constructor(private eventformService: EventformService,public dialog: MatDialog,private router: Router) { }

  ngOnInit(): void {
    this.loadEventDetails();
  }

  // Method to load event details from the backend
  loadEventDetails() {
    this.eventformService.getEventDetails().subscribe(
      (data) => {
        this.eventDetails = data;
        console.log('Event Details:', this.eventDetails);
        this.categorizeEvents();
      },
      (error) => {
        console.error('Error fetching event details:', error);
      }
    );
  }

  // Method to categorize events into completed, ongoing, and upcoming
  // categorizeEvents() {
  //   const currentDate = new Date();
  //   console.log(currentDate)
  //   this.completedEvents = this.eventDetails.filter(event => new Date(event.date) < currentDate);
  //   this.ongoingEvents = this.eventDetails.filter(event => new Date(event.date).toDateString() === currentDate.toDateString());
  //   this.upcomingEvents = this.eventDetails.filter(event => new Date(event.date) > currentDate);
    
  // }
  categorizeEvents() {
    const currentDate = new Date();
    
    // Set the time of the current date to midnight (ignoring the time)
    const currentDateWithoutTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  
    this.completedEvents = this.eventDetails.filter(event => {
      const eventDate = new Date(event.date);
      const eventDateWithoutTime = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
      return eventDateWithoutTime < currentDateWithoutTime;
    });
  
    // this.ongoingEvents = this.eventDetails.filter(event => {
    //   const eventDate = new Date(event.date);
    //   const eventDateWithoutTime = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
    //   return eventDateWithoutTime.getTime() === currentDateWithoutTime.getTime();
    // });
    // this.ongoingEvents = this.eventDetails.filter(event => {
    //   const eventDate = new Date(event.date);
    //   const eventDateWithoutTime = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
    //   return eventDateWithoutTime.toDateString() === currentDateWithoutTime.toDateString(); // Ongoing events
    // });
    this.ongoingEvents = this.eventDetails.filter(event => {
      const eventDate = new Date(event.date);
      const eventDateWithoutTime = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
      
      console.log("Event date:", eventDateWithoutTime.toDateString(), " | Current date:", currentDateWithoutTime.toDateString()); // Debugging
  
      return eventDateWithoutTime.toDateString() === currentDateWithoutTime.toDateString();
    });
  
    console.log("Ongoing events:", this.ongoingEvents); // Debugging output
  
    this.upcomingEvents = this.eventDetails.filter(event => {
      const eventDate = new Date(event.date);
      const eventDateWithoutTime = new Date(eventDate.getFullYear(), eventDate.getMonth(), eventDate.getDate());
      return eventDateWithoutTime > currentDateWithoutTime;
    });
  }
  

  // Method to switch between tabs
  selectTab(tabIndex: number) {
    this.selectedTab = tabIndex;
  }

  goToEventDetail(eventName: string) {
    // Use the router to navigate to the event detail page
    console.log('Navigating to event details for:', eventName);
    this.router.navigate(['student/event-detail', { name: eventName }]); // Assuming 'name' is a parameter in the route
  }
  // Method to navigate to event details page (for demonstration purposes)
  viewYourEvents(): void {
    console.log('View All Events button clicked!');
    // Implement the logic to show all events, possibly by navigating to another page or loading more events
    // For example, you might use a router to navigate to an events page:
    // this.router.navigate(['/events']);
    this.router.navigate(['/student/event-list']);
  }
  
}

import {  Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'registration-success-dialog',
  template: `
    <div style="text-align: center; padding: 20px;">
      <h3 style="color: green;">{{data.message}}</h3>
     
      <p>You have successfully registered for: <strong>{{data.eventName}}</strong></p>
    </div>
  `
})
export class RegistrationSuccessDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string, eventName: string }) {}
}
