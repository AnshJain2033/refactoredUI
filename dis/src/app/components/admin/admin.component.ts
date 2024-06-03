import { Component, OnInit } from '@angular/core';
import { HeaderItem, headerList } from '../navbar/constants';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UploadCsvDialogComponent } from './upload-csv-dialog/upload-csv-dialog.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit{

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
