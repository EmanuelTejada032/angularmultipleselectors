import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {switchMap, tap} from 'rxjs/operators'

import { Country, smallCountries } from '../../interfaces/interfaces';
import { CountriesServiceService } from '../../services/countries-service.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  selectorsForm: FormGroup = this.formBuilder.group({
      region:  ['', Validators.required ],
      country: ['', Validators.required ],
      border:  ['', Validators.required ]
  })

  regions: string[] = [];
  countries: Country[] = [];
  borderCountriesInfo: smallCountries[] = [];
  borderCountries: string[] = [];
  loading : boolean = false;

  constructor(private formBuilder: FormBuilder, private countriesService: CountriesServiceService) { }

  ngOnInit(): void {
    this.regions = this.countriesService.regions;
    this.changesOnRegion();
    this.changesOnCountry();
  }

// changesOnRegion(){
//     this.selectorsForm.get('region')?.valueChanges.subscribe( regionValue => {
//       this.getRegionCountries(regionValue)
//       this.selectorsForm.get('country')?.setValue("");
//     })
//   }

//   getRegionCountries(region:string){
//     this.countriesService.getRegionCountries(region)
//     .subscribe( countries => {
//       this.countries = countries;
//     })
//   }

  // Using RXJS operators to get on region change events and data // A little bit slow than above version
  changesOnRegion(){
    this.selectorsForm.get('region')?.valueChanges
    .pipe(
      tap( (_) => {
        this.loading = true;
        this.selectorsForm.get('country')?.reset('');
      }),
      switchMap( region => this.countriesService.getRegionCountries(region))
    ).subscribe( countries => {
      setTimeout(() => {
        this.countries = countries;
        this.loading = false;
      }, 500);
    })
  }

  
changesOnCountry(){
  this.selectorsForm.get('country')?.valueChanges
  .pipe(
    tap( (_) => {
      this.loading = true;
      this.selectorsForm.get('border')?.reset('');
      this.borderCountriesInfo = [];
    }),
    switchMap( country => { 
      return this.countriesService.getBorders(country)
    })
  ).subscribe( (borderCountries) => {
    setTimeout(() => {
      this.borderCountries = borderCountries?.borders || [];
      this.getBorderCountriesInfo()
      this.loading = false;
    }, 500);
  })
}
      
getBorderCountriesInfo(){
  const countriesCodes = this.borderCountries.join(',');
  this.countriesService.getBorderCountriesInfo(countriesCodes)
  .subscribe(countriesNames => {
    if(countriesNames?.length){
      countriesNames.forEach( country => {
        this.borderCountriesInfo.push({name: country.name.common, code: country.cca3})
      })
    }
  })
}
  

  save(){

    if(this.selectorsForm.invalid){
      console.log("Invalid form");
      return;      
    }
    console.log(this.selectorsForm.value)
  }

}
