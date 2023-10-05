import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { User } from 'src/app/interfaces/user';
import { RegisterService } from 'src/app/services/register/register.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(
    private userSvc: UserService,
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private loadingBar: LoadingBarService,

  ){}

  user: User = {} as User
  errorRequest?: any;
  errorRequestMessage?: any;
  validationMessage: string = '';
  updateForm!: FormGroup;
  successAlert?: boolean;


  async ngOnInit(){
    await this.getProfile();
    this.updateForm = this.formBuilder.group({
      name: [this.user.name, [
        Validators.required,
        Validators.minLength(4)
      ]],
      document: [this.user.document, [
        Validators.required,
        Validators.minLength(11)
      ]],
      email: [this.user.email, [
        Validators.required,
        Validators.email
      ]],
      phone: [this.user.phone],
      phone_whatsapp: [this.user.phone_whatsapp],
      link_instagram: [this.user.link_instagram],
      link_facebook: [this.user.link_facebook],
    });
    this.loadingBar.complete();
  }

  async getProfile()
  {
    try {
      const data: any = await this.userSvc.getUser().toPromise();
      if (data !== undefined) {
        this.user = data.employee;
      }
    } catch (error: any) {
      this.errorRequest = true;
      this.errorRequestMessage = error.error.message;
      this.loadingBar.complete();
    }
  }

  updateProfile() {
    this.loadingBar.start()
    if(this.updateForm.invalid){
      this.successAlert = false;
      this.loadingBar.complete()
      
      return;
    }
    this.userSvc.updateUser(this.updateForm.value).subscribe({
      next: (data: any)=>{
        if(data.status != undefined){
          this.errorRequest = false;
          this.successAlert = true;
          this.loadingBar.complete();
          this.router.navigate(['employee/profile'])
        }
      },
      error: (error: any) => {
        this.errorRequest = true;
        this.successAlert = false;
        
        const mapped = Object.entries(error.error.message).map(([type, value]) => ({type, value}));

        this.loadingBar.complete()
        this.errorRequestMessage = mapped
      }
    })
  }

  ngOnDestroy(){

  }
}
