// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';  // To get the route parameters
// import { StudentService } from 'src/app/services/student.service'; // Adjust path as needed
// import { Student } from 'src/app/models/student';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-profile',
//   templateUrl: './profile.component.html',
//   styleUrls: ['./profile.component.scss']
// })
// export class ProfileComponent implements OnInit {
//   student: Student | null = null;
//   username:any = sessionStorage.getItem('username');
//   router: any;


//   constructor(
//     private studentService: StudentService,
//     private route: ActivatedRoute  // Injecting ActivatedRoute to get parameters from URL
//   ) {}

//   ngOnInit(): void {
//     // Fetch the student ID from the URL parameter and call the service
    
//     console.log(this.username);
    
//     if (this.username) {
//       this.fetchStudentData(this.username);
//     }
//   }

//   // Fetch student data by ID
//   fetchStudentData(studentId: string): void {
//     this.studentService.getStudentById(this.username).subscribe({
//       next: (data: Student) => {
//         console.log(data); // Log data for debugging
//         this.student = { ...data }; // Assign the fetched data to the student variable
//       },
//       error: (error) => {
//         console.error('Error fetching student data:', error);
//       },
//       complete: () => {
//         console.log('Data fetching completed.');
//       }
//     });
//   }

//   editProfile(): void {
//     // Logic for editing the profile
//     console.log('Edit Profile button clicked');
//     //this.router.navigate(['/student/edit-profile']);
//     this.router.navigate(['/edit-profile']);

//     // You can implement navigation to a profile edit page here
//   }
// }

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  // To get the route parameters
import { StudentService } from 'src/app/services/student.service'; // Adjust path as needed
import { Student } from 'src/app/models/student';
import { Router } from '@angular/router'; // Import Router

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  student: Student | null = null;
  username: any = sessionStorage.getItem('username');

  // Properly inject Router in the constructor
  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,  // Injecting ActivatedRoute to get parameters from URL
    private router: Router // Inject Router service here
  ) {}

  ngOnInit(): void {
    // Fetch the student ID from the URL parameter and call the service
    console.log(this.username);

    if (this.username) {
      this.fetchStudentData(this.username);
    }
  }

  // Fetch student data by ID
  fetchStudentData(studentId: string): void {
    this.studentService.getStudentById(this.username).subscribe({
      next: (data: Student) => {
        console.log(data); // Log data for debugging
        this.student = { ...data }; // Assign the fetched data to the student variable
      },
      error: (error) => {
        console.error('Error fetching student data:', error);
      },
      complete: () => {
        console.log('Data fetching completed.');
      }
    });
  }

  // Method to navigate to the edit profile page
  editProfile(): void {
    console.log('Edit Profile button clicked');
    this.router.navigate(['/student/edit-profile']); // Use the router instance for navigation
  }
}
