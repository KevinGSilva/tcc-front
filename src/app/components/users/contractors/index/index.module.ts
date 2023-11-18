import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index.component';
import { FormsModule } from '@angular/forms';
import { StarRatingModule } from 'angular-star-rating';



@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    StarRatingModule,
  ]
})
export class IndexModule { }
