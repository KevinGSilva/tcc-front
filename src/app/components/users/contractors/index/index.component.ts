import { Component } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {
  constructor(
              private userSvc: UserService,
              private loadingBar: LoadingBarService,
            ){}

  employees: User[] = [];
  errorRequest?: any;
  errorRequestMessage?: any;
  search: string = '';

  ngOnInit(){
    this.loadingBar.start();
    this.getAllEmployees();
  }

  async getAllEmployees(){
    this.userSvc.getAllEmployee(this.search).subscribe(
      {
        next: (result) => {
          this.employees = result.employees;
          this.loadingBar.complete();
        },
        error: (error) => {
          this.errorRequest = true;
          this.errorRequestMessage = error.error.message;
          this.loadingBar.complete();
        }
      }
    );
  }

  filter() {
    this.loadingBar.start()
    this.getAllEmployees()
  }
}
