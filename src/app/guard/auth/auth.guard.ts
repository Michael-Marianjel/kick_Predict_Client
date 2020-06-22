import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {UserService} from '../../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private user: UserService) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.user.isAuthenticated().then((authenticated: boolean) => {
      switch (state.url) {
        case String(state.url.match(/^\/login.*/)):
          if (authenticated) {
            this.router.navigate(['/tabs/tabs/home']);
            return false;
          } else {
            return true;
          }
        case '/landing-page':
          if (authenticated) {
            this.router.navigate(['/tabs/tabs/home']);
            return false;
          } else {
            return true;
          }
        case String(state.url.match(/^\/signup.*/)):
          if (authenticated) {
            this.router.navigate(['/tabs/tabs/home']);
            return false;
          } else {
            return true;
          }
        case '/forgot-password':
          if (authenticated) {
            this.router.navigate(['/tabs/tabs/home']);
            return false;
          } else {
            return true;
          }
        default:
          if (authenticated) {
            return true;
          } else {
            this.router.navigate(['/landing-page']);
            return false;
          }
      }
    });

  }
}
