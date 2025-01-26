import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.apiUrl;

  constructor(
              private http: HttpClient,
              private router: Router
            ) { }

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

  isEmailVerified(): boolean {
    let verified = localStorage.getItem('emailVerified')
    if(verified !== 'null') {
      return true;
    }
    return false;
  }

  isEmployee(): boolean {
    let userType = localStorage.getItem('userType')
    if(userType == '1') {
      return true;
    }
    return false;
  }

  isContractor(): boolean {
    let userType = localStorage.getItem('userType')
    if(userType == '2') {
      return true;
    }
    return false;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}
