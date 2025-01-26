import { Component } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
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
  password?: string;
  passwordCheck?: string;
  errorRequest: boolean = false;
  errorRequestMessage?: any;
  validationMessage: string = '';
  user_type: any = null;
  passwordMismatch?: boolean;
  successAlert?: string;
  timeoutId: any;


  ngOnInit(){
    this.loadingBar.complete()
  }

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
    ]],
    passwordCheck: ['', [
      Validators.required,
    ]],
    user_type: [undefined, [
      Validators.required
    ]]
  });

  passwordMatchValidator() {
    const password = this.password;
    const passwordCheck = this.passwordCheck;

    if (password !== passwordCheck) {
      return this.passwordMismatch = true;
    }

    return this.passwordMismatch= false ;
  }

  constructor(
      private registerSvc: RegisterService,
      private formBuilder: UntypedFormBuilder,
      private router: Router,
      private loadingBar: LoadingBarService
    ){
  }

  register(){
    this.loadingBar.start()
    if(this.registerForm.invalid){
      this.validationMessage = 'Preencha todos os campos!'
      this.errorRequest = true
      this.loadingBar.complete()
      return;
    }
    if(this.passwordMismatch){
      this.loadingBar.complete()
      return;
    }
    localStorage.clear()
    this.registerSvc.resgister(this.registerForm.value).subscribe({
      next: (data: any) => {
        if(data.status != undefined){
          this.errorRequest = false
          this.successAlert = 'Cadastro realizado com sucesso!';

          this.timeoutId = setTimeout(() => {
            this.router.navigate(['auth/login']);
            this.loadingBar.complete()
          }, 3 * 1000);

        }
      },
      error: (error: any) => {
        this.errorRequest = true;
        this.validationMessage = ''

        console.log(error);

        const mapped = Object.entries(error.error.message).map(([type, value]) => ({type, value}));

        this.loadingBar.complete()
        this.errorRequestMessage = mapped
      }
      
    });
  }

  toLogin(){
    this.loadingBar.start()
    this.router.navigate(['auth/login'])
  }

  toHome(){
    this.loadingBar.start()
    this.router.navigate(['/'])
  }

  ngOnDestroy(){
    clearTimeout(this.timeoutId);
  }
}
