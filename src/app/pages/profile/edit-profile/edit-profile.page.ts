import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user/user.service';
import {NgForm} from '@angular/forms';
import {Location} from '@angular/common';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  public user;
  constructor(private userService: UserService, private location: Location) { }

  ngOnInit() {
  }
  async ionViewWillEnter() {
    this.user = await this.userService.getUser();
    console.log(this.user);
  }
  onEditProfile(f: NgForm) {
    console.log(f.value);
    this.userService.updateUser({...f.value}, () => {

    }).subscribe((data: any) => {
       this.user.user = data.resp ;
       this.location.back();
    });
  }

}
