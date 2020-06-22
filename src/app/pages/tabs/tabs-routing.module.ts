import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import {AuthGuard} from '../../guard/auth/auth.guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: '',
        redirectTo: '/tabs/tabs/home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () => import('../home/home.module').then(m => m.HomePageModule),
            canActivate: [AuthGuard]
          },
          {
            path: 'paypal',
            loadChildren: () => import('../paypal/paypal.module').then(m => m.PaypalPageModule)
          },
          {
            path: ':id',
            loadChildren: () => import('../home/home.module').then(m => m.HomePageModule),
            canActivate: [AuthGuard]
          }
        ]
      },
      {
        path: 'bids',
        children: [
          {
            path: '',
            loadChildren: () => import('../bids/bids.module').then(m => m.BidsPageModule)
          },
          {
            path: 'bid/:id',
            loadChildren: () => import('../bids/bid/bid.module').then(m => m.BidPageModule)
          }
        ]
      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
          },
          {
            path: 'edit-profile',
            loadChildren: () => import('../profile/edit-profile/edit-profile.module').then(m => m.EditProfilePageModule)
          },
          {
            path: 'change-password',
            loadChildren: () => import('../profile/change-password/change-password.module').then(m => m.ChangePasswordPageModule)
          }

        ]
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
