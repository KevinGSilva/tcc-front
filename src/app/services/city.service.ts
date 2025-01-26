import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private http: HttpClient) { }

  getCities() {
    return this.http.get('https://servicodados.ibge.gov.br/api/v1/localidades/microrregioes/31056/distritos?orderBy=nome');
  }
}
