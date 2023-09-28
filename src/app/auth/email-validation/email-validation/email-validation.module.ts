import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmailValidationComponent } from './email-validation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EmailValidationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class EmailValidationModule { }
