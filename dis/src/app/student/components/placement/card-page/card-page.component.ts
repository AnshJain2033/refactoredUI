import { Component, ViewChild } from '@angular/core';
import { PlacementService } from 'src/app/services/placement.service';
import { AddCompanyFormComponent } from '../addCompanyForm/addCompanyForm.component';

@Component({
  selector: 'app-card-page',
  // standalone: true,
  // imports: [CardComponent, MatIconModule, RouterModule, AddCompanyFormComponent, CommonModule],
  // providers:[PlacementService],
  templateUrl: './card-page.component.html',
  styleUrls: ['./card-page.component.css']
})

export class CardPageComponent {
  constructor(private placementService: PlacementService) {}

  superdream: any[]=[];
  dream: any[]=[];
  nondream: any[]=[];

  ngOnInit(): void {
    this.getCompanyList();
  }

  getCompanyList(): void {
    const categories = ['Super Dream', 'Dream', 'Non Dream'];

    this.placementService.getCompanyList(categories).subscribe((data) => {
      
      this.superdream = data[0] || [];  // First category list
      this.dream = data[1] || [];  // Second category list
      this.nondream = data[2] || [];  // Third category list

    });
  }

  openPDF() {
    window.open('C:\Users\gs211\Downloads\PDQreport_PDQA_merged.pdf', '_blank');
  }

  @ViewChild(AddCompanyFormComponent) addCompanyFormComponent!: AddCompanyFormComponent;
  
  public setcategory(category: string): void{
    this.addCompanyFormComponent.updateCategory(category);
  }
  
}