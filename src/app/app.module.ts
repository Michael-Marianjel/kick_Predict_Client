import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoaderComponent} from './components/ui/loader/loader.component';
import {JwtModule, JWT_OPTIONS} from '@auth0/angular-jwt';
import {CustomInterceptors} from './interceptors';
import {IonicStorageModule, Storage} from '@ionic/storage';

export function jwtOptionsFactory(storage) {
    return {
        tokenGetter: () => {
            return storage.get('jwt').then((jwt) => jwt);
        },
        whitelistedDomains: ['204.48.29.170:1337', 'api.kickpredict.co', 'localhost:1337']
    };
}

@NgModule({
    declarations: [AppComponent, LoaderComponent],
    entryComponents: [],
    imports: [BrowserModule,
        IonicModule.forRoot(),
        IonicStorageModule.forRoot(),
        HttpClientModule,
        JwtModule.forRoot({
            jwtOptionsProvider: {
                provide: JWT_OPTIONS,
                useFactory: jwtOptionsFactory,
                deps: [Storage],
            }
        }),
        AppRoutingModule
    ],
    providers: [
        StatusBar,
        SplashScreen,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: CustomInterceptors,
            multi: true
        },
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
