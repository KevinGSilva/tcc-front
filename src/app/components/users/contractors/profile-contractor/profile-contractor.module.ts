import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileContractorComponent } from './profile-contractor.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { NavbarRoutingModule } from '../../navbar/navbar-routing.module';



@NgModule({
  declarations: [ProfileContractorComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective, 
    NgxMaskPipe,
    NavbarRoutingModule
  ]
})
export class ProfileContractorModule { }
