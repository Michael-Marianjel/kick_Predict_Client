import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public me;
  constructor(private router: Router,
              private user: UserService,
              private auth: AuthService) { }

  ngOnInit() {
  }
  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }
  ionViewWillEnter() {
    this.user.me().subscribe((data: any) => {
      this.me = data;
      console.log(data);
    })
  }
}
