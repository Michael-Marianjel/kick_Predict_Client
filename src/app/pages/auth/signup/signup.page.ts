import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {NgForm} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.page.html',
    styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
    private isLoading = false;
    private queryParams;
    constructor(private router: Router, private acRoute: ActivatedRoute, private auth: AuthService) {
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.acRoute.queryParams.subscribe((data) => {
            this.queryParams = data;
        });
    }

    onSignup(f: NgForm) {
        console.log(f);
        this.isLoading = true;
        this.auth.signUp({...f.value, username: f.value.email})
            .subscribe((data: any) => {
                this.isLoading = false;
                console.log(data);
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
