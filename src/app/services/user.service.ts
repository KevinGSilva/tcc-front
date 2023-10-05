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

  getUser(){
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

  updateUser(user: User){
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
}
