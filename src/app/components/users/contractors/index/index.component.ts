import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { City } from 'src/app/interfaces/city';
import { User } from 'src/app/interfaces/user';
import { CityService } from 'src/app/services/city.service';
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
              private router: Router,
              private citySvc: CityService
            ){}

  employees: User[] = [];
  errorRequest?: any;
  errorRequestMessage?: any;
  search: string = '';
  cities!: Array<City>;
  city: any = '';

  ngOnInit(){
    this.loadingBar.start();
    this.returnCities()
    this.getAllEmployees();
  }

  async getAllEmployees(){
    this.loadingBar.start()
    this.userSvc.getAllEmployee(this.search, this.city).subscribe(
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
    this.loadingBar.complete()
  }

  filter() {
    this.loadingBar.start()
    this.getAllEmployees()
  }

  toEmployeeProfile(id: number) {
    this.loadingBar.start()
    this.router.navigate(['contractor/employee/' + id]);
  }

  async returnCities() {
    
    try {
      const data: any = this.citySvc.getCities().subscribe(
        (result) => {
          this.cities = result as Array<City>;
        }
      );
    } catch (error: any) {
      this.errorRequest = true;
      this.errorRequestMessage = error.error.message;
    }
  }
}
