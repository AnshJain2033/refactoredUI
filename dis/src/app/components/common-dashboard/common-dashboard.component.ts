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
      { title: 'event 1', date: '2024-06-06' },
      { title: 'event 2', date: '2019-04-02' },
    ],
  };

  constructor() {}

  handleDateClick(arg: any) {
    alert('date click! ' + arg.dateStr);
  }
}
