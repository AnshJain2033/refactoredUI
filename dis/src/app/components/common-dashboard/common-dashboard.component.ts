import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-common-dashboard',
  templateUrl: './common-dashboard.component.html',
  styleUrls: ['./common-dashboard.component.scss']
})
export class CommonDashboardComponent {

  
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    height: 440,
    initialView: 'dayGridMonth',
    events: [
      { title: 'event 1', date: '2019-04-01' },
      { title: 'event 2', date: '2019-04-02' },
    ],
  };

  constructor() {}

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


  ngOnInit(): void {
    // Additional logic for initializing component if needed
  }

  // Function to handle "View All Events" button click
  viewAllEvents(): void {
    console.log('View All Events button clicked!');
    // Implement the logic to show all events, possibly by navigating to another page or loading more events
    // For example, you might use a router to navigate to an events page:
    // this.router.navigate(['/events']);
  }
}
