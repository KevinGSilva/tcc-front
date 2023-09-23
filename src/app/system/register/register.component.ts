import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { toArray } from 'rxjs';
import { RegisterService } from 'src/app/services/register/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  name?: string;
  document?: string;
  email?: string;
  emailCheck?: string;
  password?: string;
  passwordCheck?: string;
  errorRequest: boolean = false;
  errorRequestMessage?: any;
  validationMessage: string = '';

  loader = this.loadingBar.useRef();

  registerForm = this.formBuilder.group({
    name: [undefined, [
      Validators.required,
      Validators.minLength(4)
    ]],
    document: [undefined, [
      Validators.required,
    ]],
    email: ['', [
      Validators.required,
      Validators.email
    ]],
    password: [undefined, [
      Validators.required,
      Validators.minLength(6)
    ]]
  });

  constructor(
      private registerSvc: RegisterService,
      private formBuilder: UntypedFormBuilder,
      private router: Router,
      private loadingBar: LoadingBarService
    ){
  }

  register(){
    this.loadingBar.start
    if(this.registerForm.invalid){
      this.validationMessage = 'Preencha todos os campos!'
      this.errorRequest = true
      this.loadingBar.complete()
      return;
    }
    localStorage.clear()
    this.registerSvc.resgister(this.registerForm.value).subscribe({
      next: (data: any) => {
        if(data.status != undefined){
          this.loadingBar.complete
          this.router.navigate(['home']);
        }
      },
      error: (error: any) => {
        this.errorRequest = true;

        console.log(error);

        const mapped = Object.entries(error.error.message).map(([type, value]) => ({type, value}));

        this.loadingBar.complete
        this.errorRequestMessage = mapped
      }
      
    });
  }
}
