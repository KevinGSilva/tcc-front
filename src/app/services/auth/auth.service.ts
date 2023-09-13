import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });

  login(email: string, password: string){

    const options = { headers: this.headers };

    return this.http.post(this.baseUrl + '/auth/login', JSON.stringify({email: email, password: password}), options)
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
