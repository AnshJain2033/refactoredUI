import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';
import { FacultyService } from 'src/app/services/faculty.service';
import { SpinnerService } from 'src/app/services/spinner.service';


@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.scss'],
})
export class StaffComponent implements OnInit {
  constructor(private facultyService: FacultyService, private toastService: HotToastService, private spinnerService: SpinnerService, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.Init();
  }
  img : any = 'https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png';
  staffList: any;

  async Init() {
    for (let key in this.fetchData) {
      await this.fetchData[key]();
    }
  }

  UseLessParameter: any;
  fetchData: any = {
    getStaffList: async () => {
      try {
        this.facultyService.getStaffData().subscribe((Response) => {
          this.staffList = Response;
          console.log(this.staffList);
        });
        this.spinnerService.removeSpinner();
      } catch (error) {
        this.toastService.error('Failed');
      }
    },
  };
}
