import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PyqService } from 'src/app/services/pyq.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-pyq',
  templateUrl: './pyq.component.html',
  styleUrls: ['./pyq.component.css']
})
export class PYQComponent implements OnInit {
  

  questionPaperForm: FormGroup;
  semesters: string[] = ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8'];
  types: string[] = ['Mst-1', 'Mst-2', 'Mst-3', 'End Sem'];
  courses: string[] = [];
  pyqList: any[] = [];
  selectedCourse:string='';

  constructor(private fb: FormBuilder, private pyqService: PyqService, private router: Router,private dialog:MatDialog) {
    // Initialize the form 
    this.questionPaperForm = this.fb.group({
      semester: [null],
      type: [null],
      course: [null],
    });
  }

  ngOnInit(): void {
    this.pyqService.getCourses().subscribe({
      next: (courses: any[]) => {
        console.log('Fetched courses:', courses);
        this.courses = courses.map(course => course.courseName);
      },
      error: (err) => {
        console.error('Error fetching courses:', err);
      }
    });
  }

  
  // navigateToUploadPyq(): void {
  //   this.router.navigate(['pyq','upload-pyq']);
  // }

//   navigateToUploadPyq() {
//     const dialogRef = this.dialog.open(UploadPyqComponent, {
//       data: {
//         type: 'add',
//       },
//       disableClose: true,
//     });
//     dialogRef.afterClosed().subscribe(() => {
//       //let url = this.router.url;
//       this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{this.router.navigate(['pyq','upload-pyq'])});
//     });
//
//   }
  onGenerate() {
    const selectedSemester = this.questionPaperForm.get('semester')?.value;
    const selectedType = this.questionPaperForm.get('type')?.value;
    const selectedCourse = this.questionPaperForm.get('course')?.value;
    
    if (selectedSemester && selectedType && selectedCourse) {
      console.log('Generating PYQ for:', selectedSemester, selectedType, selectedCourse);
  
      this.generatePYQ(selectedSemester, selectedType, selectedCourse);
    } else {
      console.error('Please select all fields!');
      alert('Please select all the required fields (Semester, Type, and Course).');
    }
  }

  
  generatePYQ(semester: string, type: string, course: string): void {
    this.pyqService.generatePyq(semester, type, course).subscribe({
      next: response => {
        console.log('Response from backend:', response); 
        if (response && response.length > 0) {
          this.pyqList = response; // Store the filtered PYQs
        } else {
          
          alert('No question papers available for the selected filters.');
          this.pyqList = []; // Clear the list
        }
      },
      error: error => {
        console.error('Error generating PYQ:', error);
        alert('Error fetching the question papers. Please try again later.');
      }
    });
  }

  
  previewAndDownloadFile(filePath: string): void {
    this.pyqService.previewFile(filePath).subscribe({
      next: blob => {
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank'); 
        const a = document.createElement('a');
        a.href = url;
        a.download = this.extractFileName(filePath); 
        a.click();
      },
      error: err => {
        console.error('Error previewing or downloading the file:', err);
        alert('Error previewing or downloading the file. Please try again later.');
      }
    });
  }

  extractFileName(filePath: string): string {
    return filePath.split('/').pop() ?? 'downloaded-file';

  }
  
}
