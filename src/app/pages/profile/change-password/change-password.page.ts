import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user/user.service';
import {Location} from '@angular/common';
import {UtilityService} from '../../../services/utility';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  constructor(private location: Location, private userService: UserService,
              private util: UtilityService) { }

  ngOnInit() {
  }
  onChangePassword(f) {
    this.userService.updateUser({password: f.value.password1}, () => {})
        .subscribe((data) => {
          this.util.presentToast('Password changed successfully');
          this.location.back();
        });
  }
}
