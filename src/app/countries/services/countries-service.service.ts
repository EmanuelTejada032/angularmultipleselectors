import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountriesServiceService {


  private _regions: string[] = ['Africa', 'America', 'Asia', 'Europe', 'Oceania']

  get regions(){
    return [...this._regions]
  }
  constructor() { }
}
