import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HotToastService } from '@ngneat/hot-toast';

import { FacultyService } from 'src/app/services/faculty.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { images } from 'src/assets/images';

@Component({
  selector: 'app-faculties',
  templateUrl: './faculties.component.html',
  styleUrls: ['./faculties.component.scss'],
})
export class FacultiesComponent implements OnInit {
  constructor(private facultyService: FacultyService, private toastService: HotToastService, private spinnerService: SpinnerService, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.Init();
  }

  img : any = 'https://w7.pngwing.com/pngs/178/595/png-transparent-user-profile-computer-icons-login-user-avatars-thumbnail.png';
  facultyList: any;
  images : any = images;

  async Init() {
    for (let key in this.fetchData) {
      await this.fetchData[key]();
    }
  }

  UseLessParameter: any;
  fetchData: any = {
    getFacList: async () => {
      try {
        this.facultyService.getFacultyData().subscribe((Response) => {
          this.facultyList = Response;
          console.log(this.facultyList);
        });
        this.spinnerService.removeSpinner();
      } catch (error) {
        this.toastService.error('Failed');
      }
    },
  };

  // addFacultyDialog() {
  //   const dialogRef = this.dialog.open(FacultyAddDialogComponent, {
  //     data: {
  //       type: 'add',
  //     },
  //     disableClose: true,
  //   });
  //   dialogRef.afterClosed().subscribe(() => this.ngOnInit());
  //   // dialogRef.afterClosed().subscribe(result => {
  //   //   if (result) {
  //   //     this.createMeeting(result)
  //   //   }
  //   // })
  // }

}
