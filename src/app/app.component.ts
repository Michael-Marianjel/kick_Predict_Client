import {Component, NgZone} from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {EventStatus, HTTPStatus} from './interceptors';
import {UserService} from './services/user/user.service';
import {UtilityService} from './services/utility';
import {Router} from '@angular/router';
import {debounceTime} from 'rxjs/operators';
declare var window: any;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public HTTPActivity: boolean;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private httpStatus: HTTPStatus,
    private ngZone: NgZone,
    private router: Router,
    private event: EventStatus,
    private userService: UserService,
    private util: UtilityService
  ) {
    this.initializeApp();
    this.settingUpToast();
    this.settingUpLoaderForEveryRequest();
  }
  settingUpLoaderForEveryRequest() {
    this.httpStatus.getHttpStatus().pipe(debounceTime(600))
        .subscribe(async (status: boolean) => {
          console.log(status);
          this.HTTPActivity = status;
          this.ngZone.run(() => {
            this.HTTPActivity = status;
          });
        });
  }
  settingUpToast() {
    this.event.getEvent().subscribe((event: any) => {
      console.log(event);
      if (event.status === 401 || event.status === 403) {
        this.userService.clearAll();
        this.util.presentToast('Your session expired, please login again!', 5000);
        this.router.navigate(['/login']);
        return false;
      } else if (event.status >= 400) {
        console.log(event);
        this.util.presentToast(event.error.message, 5000);
      }
    });
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    window.addEventListener('load',function() {
      setTimeout(() => {
        // This hides the address bar:
        window.scrollTo(0, 1);
      }, 0);
    });
  }
}
