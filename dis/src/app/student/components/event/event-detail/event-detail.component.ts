// import { Component } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventformService } from 'src/app/services/eventform.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent {
  eventName: string | null = null;
  event: any = {}; // Initialize to an empty object

  constructor(private route: ActivatedRoute, private eventService: EventformService, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.eventName = params.get('name'); // Get the event name from the route
      if (this.eventName) {
        this.fetchEventDetails(this.eventName); // Fetch event details based on the name
      }
    });
  }

  fetchEventDetails(eventName: string) {
    // Call your service to fetch event details by name
    this.eventService.getEventByName(eventName).subscribe(
      data => {
        this.event = data; // Store the fetched event details
      },
      error => {
        console.error('Error fetching event details:', error);
      }
    );
  }

  viewAllEvents(): void {
    console.log('View All Events button clicked!');
    // Implement the logic to show all events, possibly by navigating to another page or loading more events
    // For example, you might use a router to navigate to an events page:
    // this.router.navigate(['/events']);
    this.router.navigate(['/student/event-fetch']);
  }
}
