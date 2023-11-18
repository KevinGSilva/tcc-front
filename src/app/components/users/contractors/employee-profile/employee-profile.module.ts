import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeProfileComponent } from './employee-profile.component';
import { NavbarRoutingModule } from '../../navbar/navbar-routing.module';
import { RouterModule } from '@angular/router';
import { StarRatingModule } from 'angular-star-rating';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EmployeeProfileComponent
  ],
  imports: [
    CommonModule,
    NavbarRoutingModule,
    RouterModule,
    StarRatingModule,
    FormsModule
  ]
})
export class EmployeeProfileModule { }
