import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { EmailVerifyService } from 'src/app/services/auth/email-verify.service';

@Component({
  selector: 'app-email-validation',
  templateUrl: './email-validation.component.html',
  styleUrls: ['./email-validation.component.scss'],
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class EmailValidationComponent {

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private loadingBar: LoadingBarService,
    private emailSvc: EmailVerifyService
  ){}


  errorRequest: boolean = false;
  errorRequestMessage?: any;
  code: string = '';

  loginForm = this.formBuilder.group({
    code: [undefined, [
      Validators.required,
    ]]
  });

  test(){
    console.log(this.code)
  }

  postCode(){
    this.loadingBar.start();

    if(this.loginForm.invalid){

      this.errorRequest = true;
      this.loadingBar.complete();
      this.errorRequestMessage = 'Por favor informe o código.'
      return;

    }

    return this.emailSvc.verifyCode(this.code).subscribe({
      next: (data: any) => {
        if(data.status != undefined){
          this.loadingBar.complete()
          this.router.navigate(['auth/login']);
        }
      },
      error: (error: any) => {
        this.errorRequest = true;
        console.log(error)
        this.errorRequestMessage = error.error.message
        this.loadingBar.complete();
      }
    });
  }
}
