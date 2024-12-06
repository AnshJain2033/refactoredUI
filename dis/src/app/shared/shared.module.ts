import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { FooterComponent } from '../components/footer/footer.component';
import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from '../app-routing.module';
import { HeadRoutingModule } from '../head/head-routing.module';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TableComponent } from '../components/table/table.component';

const shared = [
  NavbarComponent,
  FooterComponent,
  // TableComponent
]

@NgModule({
  declarations: [
   ...shared
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    
    RouterModule
  ],
  exports: [
   ...shared
  ],
  
})
export class SharedModule { }
