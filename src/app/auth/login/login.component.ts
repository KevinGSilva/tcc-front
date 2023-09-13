import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports:[
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LoginComponent {
  email: any;
  password: any;

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
      private router: Router
    ){
  }

  login(){
    
    if(this.loginForm.invalid){

      alert(`Por favor informe o e-mail e a senha.`);
      return;
    }
    localStorage.clear()
    this.authSvc.login(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: (data: any) => {
        if(data.status != undefined){
          localStorage.setItem('userId', data.user.id);
          localStorage.setItem('token', data.token);
          console.log(localStorage.getItem('token'))
          
          this.router.navigate(['home']);
        }
      },
      error: (error: any) => {
        alert(error.error.message);
      }
      
    });
  }
}
