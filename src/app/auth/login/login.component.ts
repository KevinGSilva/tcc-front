import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports:[
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class LoginComponent {
  email: any;
  password: any;
  errorRequest: boolean = false;
  errorRequestMessage?: any;

  loginForm = this.formBuilder.group({
    email: [undefined, [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(50),
    ]],
    password: [undefined, [
      Validators.required,
      Validators.minLength(6)
    ]]
  });

  constructor(
      private authSvc: AuthService,
      private formBuilder: UntypedFormBuilder,
      private router: Router,
      private loadingBar: LoadingBarService
    ){
  }

  login(){
    this.loadingBar.start()
    if(this.loginForm.invalid){


      this.loadingBar.complete();
      this.errorRequest = true;
      this.errorRequestMessage = 'Por favor informe o e-mail e a senha.'
      return;
    }
    localStorage.clear()
    this.authSvc.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: (data: any) => {
        if(data.status != undefined){
          localStorage.setItem('userId', data.user.id);
          localStorage.setItem('userName', data.user.name);
          localStorage.setItem('token', data.token);
          
          this.loadingBar.complete()
          this.router.navigate(['home']);
        }
      },
      error: (error: any) => {
        this.errorRequest = true;
        this.errorRequestMessage = error.error.message
        this.loadingBar.complete();
      }
      
    });
  }
}
