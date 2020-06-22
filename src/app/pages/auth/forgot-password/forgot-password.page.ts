import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {UtilityService} from '../../../services/utility';
import {Location} from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  isLoading = false;
  constructor(private location: Location, private auth: AuthService, private util: UtilityService) { }

  ngOnInit() {
  }
  onForgotPassword(f) {
    this.isLoading = true;
    this.auth.forgotPassword({email: f.value.email})
        .subscribe((data) => {
          this.isLoading = false;
          console.log(data);
          this.util.presentToast('Password reset link has been sent to your email');
          this.location.back();
        }, (err) => {
          this.isLoading = false;
          console.log(err);
        });
  }

}
