import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss']
})
export class EmployeeProfileComponent {

  constructor(
              private userSvc: UserService,
              private loadingBar: LoadingBarService, 
              private route: ActivatedRoute
            ){}

  employeeId!: number;
  user: User = {} as User;
  errorRequest?: any;
  errorRequestMessage?: any;
  ratingValue: number = 0;
  ratingComment!: string;
  validationMessage: string = '';
  successAlert?: boolean;
  idExistedRating!: number;

  ngOnInit(){
    this.employeeId = this.route.snapshot.params['id']
    this.getProfile()
    this.loadingBar.complete()
    this.verifyExistedRating()
  }

  async getProfile()
  {
    try {
      const data: any = await this.userSvc.getEmployeeProfile(this.employeeId).toPromise();
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

  async onRatingChange(value: any){
    this.ratingValue = value
  }

  ratingSubmit(){
    this.loadingBar.start();

    const rating = {
      "employee_id": this.employeeId.toString(),
      "value": this.ratingValue,
      "comment": this.ratingComment
    }

    this.userSvc.createRating(rating).subscribe({
      next: (data: any)=>{
        if(data.status != undefined){
          this.errorRequest = false;
          this.successAlert = true;
          this.loadingBar.complete();
          window.location.reload()
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

  clearAlerts(){
    this.errorRequest = false;
    this.successAlert = false;
    this.validationMessage = ''
  }

  async verifyExistedRating() {
    try {
      const data: any = await this.userSvc.verifyExistedRating(this.employeeId).toPromise();
      if (data !== undefined) {
        if (data.rating) {
          this.ratingValue = data.rating.value
          this.ratingComment = data.rating.comment;
          this.idExistedRating = data.rating.id
        }
      }
    } catch (error: any) {
      this.errorRequest = true;
      this.errorRequestMessage = error.error.message;
      this.loadingBar.complete();
    }
  }

  ratingUpdate(){
    this.loadingBar.start();

    const rating = {
      "employee_id": this.employeeId.toString(),
      "value": this.ratingValue,
      "comment": this.ratingComment
    }

    this.userSvc.updateRating(rating, this.idExistedRating).subscribe({
      next: (data: any)=>{
        if(data.status != undefined){
          this.errorRequest = false;
          this.successAlert = true;
          this.loadingBar.complete();
          /* window.location.reload() */
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
  formatPhoneNumber(phoneNumber: string): string {
    // Verifica se o número de telefone tem o formato correto
    if (phoneNumber && phoneNumber.length === 11) {
      return `(${phoneNumber.substring(0, 2)}) ${phoneNumber[2]} ${phoneNumber.substring(3, 7)}-${phoneNumber.substring(7)}`;
    } else {
      // Retorna o número de telefone sem formatação se não estiver no formato esperado
      return phoneNumber;
    }
  }
}
