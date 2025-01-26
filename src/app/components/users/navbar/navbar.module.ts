import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarRoutingModule } from './navbar-routing.module';
import { ProfileComponent } from '../employees/profile/profile.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NavbarRoutingModule,
    RouterModule
  ]
})
export class NavbarModule { }
