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

  employeeId?: number;
  user: User = {} as User;
  errorRequest?: any;
  errorRequestMessage?: any;

  ngOnInit(){
    this.employeeId = this.route.snapshot.params['id']
    this.getProfile()
    this.loadingBar.complete()
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
}
