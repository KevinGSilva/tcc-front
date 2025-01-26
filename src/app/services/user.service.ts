import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  });

  getEmployee(){
    const options = { headers: this.headers };

    return this.http.get(this.baseUrl + '/employee/' + localStorage.getItem('userId'), options)
    .pipe(
      map((data: any) => {
          if (data.status != "success") {
              throw new Error(data.message);
          }
          return data;
      })
    );  
  }

  getAllEmployee(search: string, selectedCity:any){
    const options = { headers: this.headers };
    console.log(selectedCity)

    return this.http.get(`${this.baseUrl}/employee?services=${search}&city=${selectedCity}`, options)
    .pipe(
      map((data: any) => {
          if (data.status != "success") {
              throw new Error(data.message);
          }
          return data;
      })
    );  
  }

  updateEmployee(user: any){
    const options = { headers: this.headers };

    return this.http.put(this.baseUrl + '/employee/' + localStorage.getItem('userId'), user, options)
    .pipe(
      map((data: any) => {
          if (data.status != "success") {
              throw new Error(data.message);
          }
          return data;
      })
    );  
  }

  getContractor(){
    const options = { headers: this.headers };

    return this.http.get(this.baseUrl + '/contractor/' + localStorage.getItem('userId'), options)
    .pipe(
      map((data: any) => {
          if (data.status != "success") {
              throw new Error(data.message);
          }
          return data;
      })
    );  
  }

  updateContractor(user: any){
    const options = { headers: this.headers };

    return this.http.put(this.baseUrl + '/contractor/' + localStorage.getItem('userId'), user, options)
    .pipe(
      map((data: any) => {
          if (data.status != "success") {
              throw new Error(data.message);
          }
          return data;
      })
    );  
  }

  getEmployeeProfile(id: any){
    const options = { headers: this.headers };

    return this.http.get(this.baseUrl + '/employee/' + id, options)
    .pipe(
      map((data: any) => {
          if (data.status != "success") {
              throw new Error(data.message);
          }
          return data;
      })
    );  
  }

  createRating(rating: any) {
    const options = { headers: this.headers };
    console.log(rating)

    return this.http.post(this.baseUrl + '/rating', JSON.stringify(rating), options)
    .pipe(
      map((data: any) => {
          if (data.status != "success") {
              throw new Error(data.message);
          }
          return data;
      })
    );  
  }

  verifyExistedRating(employeeId: any) {
    const options = { headers: this.headers };

    return this.http.get(this.baseUrl + '/rating-existed/' + employeeId, options)
    .pipe(
      map((data: any) => {
          if (data.status != "success") {
              throw new Error(data.message);
          }
          return data;
      })
    ); 
  }

  updateRating(rating: any, ratingId: any) {
    const options = { headers: this.headers };
    console.log(rating)

    return this.http.put(this.baseUrl + '/rating/' + ratingId, JSON.stringify(rating), options)
    .pipe(
      map((data: any) => {
          if (data.status != "success") {
            throw new Error(data.message);
          }
          return data;
      })
    );  
  }
}
