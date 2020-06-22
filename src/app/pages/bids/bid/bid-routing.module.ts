import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BidPage } from './bid.page';

const routes: Routes = [
  {
    path: '',
    component: BidPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BidPageRoutingModule {}
