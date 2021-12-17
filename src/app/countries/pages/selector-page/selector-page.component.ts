import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountriesServiceService } from '../../services/countries-service.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  selectorsForm: FormGroup = this.formBuilder.group({
      region: ['', Validators.required ]
  })

  regions: string[] = [];

  constructor(private formBuilder: FormBuilder, private countriesService: CountriesServiceService) { }

  ngOnInit(): void {
    this.regions = this.countriesService.regions;
  }


  save(){
    console.log(this.selectorsForm.value)
  }

}
