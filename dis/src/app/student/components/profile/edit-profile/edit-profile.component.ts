import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from 'src/app/services/student.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  editForm!: FormGroup;
  username: any = sessionStorage.getItem('username'); // Get username from sessionStorage

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private router: Router // Inject Router for navigation
  ) {}

  ngOnInit(): void {
    if (!this.username) {
      console.error('Username not found in session storage.');
      return;
    }

    // Initialize the form with only editable fields
    this.editForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      branch: ['', Validators.required],
      specification: ['', Validators.required],
      admissionYear: ['', Validators.required],
      dob: ['', Validators.required],
      mobileNo: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // Corrected to match form control name
    });

    this.loadStudentData();
  }

  // Load student data and populate editable fields
  loadStudentData(): void {
    this.studentService.getStudentById(this.username).subscribe({
      next: (student) => {
        this.editForm.patchValue({
          email: student.email,
          branch: student.branch,
          specification: student.specification,
          admissionYear: student.admissionYear, // Corrected to match form control name
          dob: student.dob,
          mobileNo: student.mobileNo, // Corrected to match form control name
        });
      },
      error: (error) => {
        console.error('Failed to fetch student data:', error);
      },
    });
  }

  // Submit the updated profile data
  onSubmit(): void {
    if (this.editForm.valid) {
      const updatedData = this.editForm.value;
      this.studentService.updateStudent(this.username, updatedData).subscribe({
        next: () => {
          alert('Profile updated successfully!');
          this.router.navigate(['/student/profile']); // Redirect to profile page
        },
        error: (error) => {
          console.error('Error updating profile:', error);
          alert('Failed to update profile. Please try again.');
        },
      });
    } else {
      console.warn('Form is invalid. Please check the fields.');
    }
  }
}
