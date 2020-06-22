import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public isLoading = false;
  constructor(private router: Router, private acRoute: ActivatedRoute, private auth: AuthService) { }
  private queryParams;
  ngOnInit() {
  }
  ionViewWillEnter() {
    this.acRoute.queryParams.subscribe((data) => {
      this.queryParams = data;
      console.log(this.queryParams);
    });
  }
  async onLogin(f: NgForm) {
    this.isLoading = true;
    this.auth.login({...f.value}).subscribe((data: any) => {
      console.log(data);
      this.isLoading = false;
      this.router.navigate(['/tabs/tabs/home'], {
        queryParams: {
          ...this.queryParams
        }
      });
    }, () => {
      this.isLoading = false;
    });
  }
}
