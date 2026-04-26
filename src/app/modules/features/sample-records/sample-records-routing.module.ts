import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SampleRecordsPageComponent } from './components/sample-records-page/sample-records-page.component';

const routes: Routes = [
  {
    path: '',
    component: SampleRecordsPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule]
})
export class SampleRecordsRoutingModule { }
