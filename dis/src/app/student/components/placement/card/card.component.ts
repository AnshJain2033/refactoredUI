import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PlacementService } from 'src/app/services/placement.service';

interface company {
  id : number;
  name: string;
  category: string;
  description: string;
  eligibility: string;
  website: string;
  package_offered: string;
  designation: string
}
interface Topic {
  id: number;
  name: string;
  category: string;
  companyId: number;
}
@Component({
  selector: 'app-card',
  // standalone: true,
  // imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})

export class CardComponent {
  topics: Topic[]= [];

  @Input() company!: company;
  value='';
  constructor(private router: Router, private placementService: PlacementService) {}

click(value: string) {
  this.router.navigate(['/student/topic-list', this.company.id, value]);
}


}
