import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Country, BorderCountries } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CountriesServiceService {


  private _regions: string[] = ['Africa', 'America', 'Asia', 'Europe', 'Oceania'];
  private baseUrl: string = 'https://restcountries.com/v3.1'

  get regions(){
    return [...this._regions]
  }

  constructor(private http: HttpClient) { }

  getRegionCountries(region: string): Observable<Country[]>{
    return this.http.get<Country[]>(`${this.baseUrl}/region/${region}?fields=capital,region,subregion,name,cca3`)
  }
  getBorders(countryCode: string): Observable<BorderCountries | null>{
    if(!countryCode){
      return of(null);
    }
    return this.http.get<BorderCountries>(`${this.baseUrl}/alpha/${countryCode}?fields=borders`)
  }
}
