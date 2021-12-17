import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RandomComponentComponent } from './countries/pages/random-component/random-component.component';

const routes:Routes = [
    {
      path:'selector',
      loadChildren: () => import('./countries/countries.module').then( module => module.CountriesModule)
    },
    {
      path:'**',
      redirectTo:'selector'
    }
]



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }
