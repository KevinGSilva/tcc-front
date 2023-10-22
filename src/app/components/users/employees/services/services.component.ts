import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent {
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
    this.loadingBar.start();
    await this.getProfile();
    this.updateForm = this.formBuilder.group({
      description: [this.user.description],
      services: [this.user.services],
      service_flag: 1,
    });
    this.loadingBar.complete();
  }

  async getProfile()
  {
    try {
      const data: any = await this.userSvc.getUser().toPromise();
      if (data !== undefined) {
        this.user = data.employee;
        if(data.employee.media.length > 0) {
          this.user.thumb = data.employee.media[0].original_url;
        }
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
        }
      },
      error: (error: any) => {
        this.errorRequest = true;
        this.successAlert = false;
        this.loadingBar.complete()
        
        try{
          const mapped = Object.entries(error.error.message).map(([type, value]) => ({type, value}));
          this.errorRequestMessage = mapped
        } catch{
          this.validationMessage = 'Erro inesperado. Tente novamente mais tarde!'
        }

      }
    })
  }

  ngOnDestroy(){

  }

  clearAlerts(){
    this.errorRequest = false;
    this.successAlert = false;
    this.validationMessage = ''
  }
}
