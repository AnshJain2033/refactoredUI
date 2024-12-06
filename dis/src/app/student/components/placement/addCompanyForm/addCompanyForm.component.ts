import { Component, EventEmitter, Output } from '@angular/core';
import { PlacementService, company } from 'src/app/services/placement.service';
@Component({
  selector: 'app-addCompanyForm',
  // standalone: true,
  // imports: [FormsModule, CommonModule],
  templateUrl: './addCompanyForm.component.html',
  styleUrls: ['./addCompanyForm.component.css']
})
export class AddCompanyFormComponent {
  constructor(private placementService: PlacementService) {}

    company: company = {
      name: '',
      category: '',
      description: '',
      eligibility: '',
      website: '',
      package_offered: '',
      designation: ''
    };
  isVisible = false;

  @Output() formClosed = new EventEmitter<void>();

  openForm() {
    this.isVisible = true;
  }

  closeForm() {
    this.isVisible = false;
    this.formClosed.emit(); // Optional: Emit an event when the form is closed
  }

  onSubmit() {
    // Handle form submission
      this.placementService.addCompany(this.company).subscribe(
      response => {
        console.log('Company added successfully', response);
      },
      error => {
        console.error('Error adding company', error);
      }
    );
    this.closeForm(); // Close form after submission
  }

  updateCategory(category: string) {
    this.company.category = category;
  }

}

