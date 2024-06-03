import { Component } from '@angular/core';


@Component({
  selector: 'app-actions-cell-renderer',
  templateUrl: './actions-cell-renderer.component.html',
  styleUrls: ['./actions-cell-renderer.component.scss']
})
export class ActionsCellRendererComponent {
  onDelete: any;
  onEdit: any;
  onStatus: any;

  params: any;

  constructor() {}

  agInit(params: any): void {
    this.params = params;
    this.onDelete = this.params.onDelete;
    this.onEdit = this.params.onEdit;
    this.onStatus = this.params.onStatus;
  }

  onEditClick(event: any) {
    console.log(event);
    this.onEdit(this.params.data);
    try {
      

    } catch (e) {
      console.log(e);
    }
  }
  onStatusClick(event: any) {
    console.log(event);
    this.onStatus(this.params.data);
    try {
      

    } catch (e) {
      console.log(e);
    }
  }

  onDeleteClick(event: any) {

    
    try {
      this.onDelete(this.params.data);

    } catch (e) {
      console.log(e);
    }
  }

  refresh(params: any): boolean {
    return false;
  }
}
