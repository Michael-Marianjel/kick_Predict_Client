import {Injectable} from '@angular/core';
import {ApiService} from '../api/api.service';
import {EndpointsService} from '../api/endpoints.service';
import {delay, share, switchMap} from 'rxjs/operators';
import {UserService} from '../user/user.service';
import {from, Observable, of, throwError} from 'rxjs';
import {Storage} from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private api: ApiService,
                private uris: EndpointsService,
                private storage: Storage,
                private user: UserService,
    ) {
    }

    logout() {
        this.user.clearAll();
    }

    getLoginObj() {
        return this.user.getUser();
    }

    signUp(userObj) {
        const {register} = this.uris;
        console.log(userObj);
        const signUp$ = this.api.post(register, {...userObj}, {
            headers: {}
        }).pipe(share());
        signUp$.subscribe((user: any) => {
            this.user.setUser(user);
            this.user.setJwt(user.jwt);
        });
        return signUp$;
    }

    login(loginObj) {
        const {login} = this.uris;
        const login$ = this.api.post(login, {...loginObj}, {
            headers: {}
        }).pipe(share());
        login$.subscribe((user: any) => {
            this.user.setUser(user);
            this.user.setJwt(user.jwt);
        });
        return login$;
    }

    resetPasssword(userObj) {
        const {resetPwd} = this.uris;
        const resetPwd$ = this.api.post(resetPwd, {...userObj}, {
            headers: {}
        }).pipe(share());
        resetPwd$.subscribe((user: any) => {
            console.log(userObj);
            this.user.setUser({
                user: {...user, username: userObj.username, changePassword: true}
            });
        });
        return resetPwd$;
    }
    forgotPassword(email) {
        const {forgotPassword} = this.uris;
        const forgotPassword$ = this.api.post(forgotPassword, {...email}, {
            headers: {}
        }).pipe(share());
        forgotPassword$.subscribe((user: any) => {
        });
        return forgotPassword$;
    }
}
