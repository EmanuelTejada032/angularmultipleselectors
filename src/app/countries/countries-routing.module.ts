import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectorPageComponent } from './pages/selector-page/selector-page.component';
import { RandomComponentComponent } from './pages/random-component/random-component.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {
        path: 'selector',
        component: SelectorPageComponent
      },
      {
        path: 'random',
        component: RandomComponentComponent
      },
      {
        path:'**',
        redirectTo:'selector'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountriesRoutingModule { }
