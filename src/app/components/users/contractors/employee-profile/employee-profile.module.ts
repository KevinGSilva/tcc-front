import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeProfileComponent } from './employee-profile.component';
import { NavbarRoutingModule } from '../../navbar/navbar-routing.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    EmployeeProfileComponent
  ],
  imports: [
    CommonModule,
    NavbarRoutingModule,
    RouterModule
  ]
})
export class EmployeeProfileModule { }
