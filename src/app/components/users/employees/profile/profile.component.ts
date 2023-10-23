import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { User } from 'src/app/interfaces/user';
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
      thumb: [],
      service_flag: 0
    });
    this.loadingBar.complete();
  }

  async getProfile()
  {
    try {
      const data: any = await this.userSvc.getEmployee().toPromise();
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
    this.userSvc.updateEmployee(this.updateForm.value).subscribe({
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
  handleImageUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e: any) => {
        this.updateForm.patchValue({ thumb: reader.result });
        this.user.thumb = e.target.result
    };
  }

  clearAlerts(){
    this.errorRequest = false;
    this.successAlert = false;
    this.validationMessage = ''
  }

  @ViewChild('thumbInput', { static: false }) thumbInput!: ElementRef;

  changePhoto() {
    this.thumbInput.nativeElement.click();
  }
}
