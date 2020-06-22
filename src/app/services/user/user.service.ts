import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {map, share, switchMap} from 'rxjs/operators';
import {BehaviorSubject, from, Observable, Subject} from 'rxjs';
import {EndpointsService} from '../api/endpoints.service';
import {ApiService} from '../api/api.service';
import {UtilityService} from '../utility';
import {environment} from '../../../environments/environment';
import {HttpHeaders} from '@angular/common/http';

declare var window: any;


@Injectable({
    providedIn: 'root'
})
export class UserService {
    public user;
    public homeRoute;
    public tempUser;
    public qrData;

    constructor(private storage: Storage,
                private api: ApiService,
                private util: UtilityService,
                private uris: EndpointsService) {
    }

    setUser(user) {
        return this.storage.set('user', user);
    }

    setTempUser(user) {
        this.tempUser = user;
    }

    getTempUser(user) {
        return this.tempUser;
    }

    clearAll() {
        this.storage.clear();
    }

    getUser() {
        return this.storage.get('user');
    }

    getJwt() {
        return this.storage.get('jwt');
    }

    setJwt(jwt) {
        return this.storage.set('jwt', jwt);
    }

    isAuthenticated(): Promise<boolean> {
        return new Promise((res, rej) => {
            this.getJwt().then((jwt) => {
                this.util.hasValue(jwt) ? res(true) : res(false);
            }, (err) => {
                res(false);
            });
        });
    }
    me() {
        const { me } =  this.uris ;
        const singleUser$ = this.api.get(me, {
        }).pipe(share());
        return singleUser$;
    }
    editUser(updatedUser) {
        const user = this.tempUser;
        if (!user) {
            return;
        }
        const {singleUser} = this.uris;
        const user$ = this.api.put(singleUser(user.user.id), {
            ...updatedUser
        }, {
            headers: {
                Authorization: 'Bearer ' + this.tempUser.jwt
            }
        }).pipe(share());
        user$.subscribe((userData: any) => {
            this.tempUser.user = userData;
            this.setUser(this.tempUser);
            this.setJwt(this.tempUser.jwt);
        });
        return user$;
    }

    updateUser(updatedUser, cb) {
        const {singleUser} = this.uris;
        const user$ = from(this.getUser()).pipe(switchMap((user) => {
            return this.api.put(singleUser(user.user.id), {
                ...updatedUser
            }).pipe(map((resp) => {
                return {
                    user,
                    resp
                };
            }));
        })).pipe(share());
        user$.subscribe(({user, resp}) => {
            const tempUser = user;
            tempUser.user = resp;
            this.setUser(tempUser).then(() => { cb(); });
        });
        return user$;
    }
    uploadImage(profileImageData) {
        const {upload} = this.uris;
        const upload$ = from(this.getUser()).pipe(switchMap((user) => {
            return this.api.post(upload, profileImageData, {
                //  headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' })
            }).pipe((map((avatarData) => {
                user.user.avatar = avatarData[0];
                return user;
            })));
        })).pipe(share());

        upload$.subscribe((user) => {
            const tempUser = user;
            this.setUser(tempUser);
        });
        return upload$;
    }
}
