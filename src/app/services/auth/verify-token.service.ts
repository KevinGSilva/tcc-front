import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class VerifyTokenService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) { }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getHeaders(){
    const headersWithToken = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });

    return headersWithToken;
  }

  isLoggedIn() {
    const token = this.getToken();
    // Verifique se o token está presente e não está expirado
    if (token) {
      const options = { headers: this.getHeaders() };
      return this.http.get(this.baseUrl + '/auth/verify-token', options)
      .subscribe(
        (result) => {
          map((data: any) => {
            if (data.status != "success") {
              /* throw new Error(data.message); */
              return false;
            }
            return true;
          })
        },
        (error) => {
          console.log(error.error.message)
          this.router.navigate(['auth/login']);
        }
      );
    }
    return false;
  }
}
