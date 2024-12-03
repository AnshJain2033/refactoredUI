import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HeaderItem, headerList } from 'src/app/components/navbar/constants';
import { UploadCsvDialogComponent } from '../upload-csv-dialog/upload-csv-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  renderList: HeaderItem[] = [];

  ngOnInit():void{
    this.renderList = headerList['head']; 
  }

  constructor(private router: Router, private dialog: MatDialog){

  }

  uploadCsv( type: any){
    console.log(type);
    
    const dialogRef = this.dialog.open(UploadCsvDialogComponent,{
      data: {
        type: type
      },
      disableClose: true,
    });
 

  }
}
