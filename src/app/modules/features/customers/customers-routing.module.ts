import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersPageComponent } from './pages/customers-page/customers-page.component';

const routes: Routes = [
  {
    path: '',
    component: CustomersPageComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes),
  ]
})
export class CustomersRoutingModule { }
