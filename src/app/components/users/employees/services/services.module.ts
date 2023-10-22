import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';
import { NavbarRoutingModule } from '../../navbar/navbar-routing.module';
import { ServicesComponent } from './services.component';



@NgModule({
  declarations: [ServicesComponent],
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
export class ServicesModule { }
