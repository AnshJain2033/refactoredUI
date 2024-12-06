import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

// Injectable decorator allows this service to be injected into other components
@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
  // Variable to keep track of the spinner's status
  spinnerStatus = 0;

  constructor(private spinner: NgxSpinnerService) {}

  // Method to add the spinner
  addSpinner() {
    this.spinnerStatus += 1;
    if (this.spinnerStatus == 1) {
      this.spinner.show();
    }
  }

  // Method to remove the spinner
  removeSpinner() {
    this.spinnerStatus -= 1;
    if (this.spinnerStatus == 0) {
      this.spinner.hide();
    }
  }
}
