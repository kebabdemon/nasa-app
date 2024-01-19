import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NASAPage } from './NASA.page';

const routes: Routes = [
  {
    path: '',
    component: NASAPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
