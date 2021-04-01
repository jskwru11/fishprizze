import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddFishComponent } from './add-fish/add-fish.component';
import { DetailFishComponent } from './detail-fish/detail-fish.component';
import { DisplayFishComponent } from './display-fish/display-fish.component';

const routes: Routes = [
  {
    path: '', component: DisplayFishComponent
  },
  {
    path: 'new', component: AddFishComponent
  },
  {
    path: ':id', component: DetailFishComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FishRoutingModule { }
