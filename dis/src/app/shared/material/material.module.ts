import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {NgxMatTimepickerModule} from 'ngx-mat-timepicker';
import { MatChipsModule } from '@angular/material/chips';
//import { NgxMatDatetimePickerModule } from '@angular-material-components/datetime-picker';
//import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';

const materialModules = [
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatMenuModule,
  MatTabsModule,
  MatDialogModule,
  MatPaginatorModule,
  MatTableModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  NgxMatTimepickerModule,
  MatCardModule,
  MatChipsModule,
 // NgxMatDatetimePickerModule,
 // NgxMatMomentModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ...materialModules
  ],
  
  exports: [
    CommonModule,
    ...materialModules
  ]
})
export class MaterialModule { }
