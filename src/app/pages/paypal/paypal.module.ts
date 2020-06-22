import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {PaypalPageRoutingModule} from './paypal-routing.module';

import {PaypalPage} from './paypal.page';
import {NgxPayPalModule} from '../../ngx-paypal';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PaypalPageRoutingModule,
        NgxPayPalModule
    ],
    declarations: [PaypalPage]
})
export class PaypalPageModule {
}
