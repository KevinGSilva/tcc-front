import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-contractor',
  templateUrl: './profile-contractor.component.html',
  styleUrls: ['./profile-contractor.component.scss']
})
export class ProfileContractorComponent {
  constructor(
    private userSvc: UserService,
    private formBuilder: UntypedFormBuilder,
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
      thumb: [],
      service_flag: 0
    });
    this.loadingBar.complete();
  }

  async getProfile()
  {
    try {
      const data: any = await this.userSvc.getContractor().toPromise();
      if (data !== undefined) {
        this.user = data.contractor;
        if(data.contractor.media.length > 0) {
          this.user.thumb = data.contractor.media[0].original_url;
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
    this.userSvc.updateContractor(this.updateForm.value).subscribe({
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
