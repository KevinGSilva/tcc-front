import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'app-email-validation',
  templateUrl: './email-validation.component.html',
  styleUrls: ['./email-validation.component.scss']
})
export class EmailValidationComponent {

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private loadingBar: LoadingBarService
  ){}


  errorRequest: boolean = false;
  errorRequestMessage?: any;

  loginForm = this.formBuilder.group({
    code: [undefined, [
      Validators.required,
    ]]
  });

  postCode(){

  }
}
