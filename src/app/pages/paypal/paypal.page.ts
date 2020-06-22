import {Component, NgZone, OnInit} from '@angular/core';
import { IPayPalConfig, ICreateOrderRequest } from '../../ngx-paypal';
import {ActivatedRoute, Router} from '@angular/router';
import {BidService} from '../../services/bid/bid.service';
import {LoadingController} from '@ionic/angular';
import {UtilityService} from '../../services/utility';
import {Location} from '@angular/common';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-paypal',
  templateUrl: './paypal.page.html',
  styleUrls: ['./paypal.page.scss'],
})
export class PaypalPage implements OnInit {
  public payPalConfig?: IPayPalConfig;
  private showSuccess;
  productName;
  productId;
  sneaker;
  bidType;
  loading;
  betAmount;
  constructor(private acRoute: ActivatedRoute,
              private router: Router,
              private ngZone: NgZone,
              private loadCtrl: LoadingController,
              private location: Location,
              private util: UtilityService,
              private bidService: BidService) { }

  ngOnInit() {
  }
  async ionViewWillEnter() {
    this.acRoute.queryParams.subscribe((data: any) => {
      this.productId = data.id;
      this.productName = data.name;
      this.bidType = data.bid;
      this.betAmount = data.betAmount;
      if (!this.productId) {
        this.router.navigate(['/tabs/tabs/home']);
      }
    });
    this.initConfig();
    this.loading = await this.loadCtrl.create({
      message: 'Please wait...',
    });
  }

  private initConfig(): void {
    this.payPalConfig = {
      currency: 'USD',
      clientId: environment.paypalLiveKey,
      createOrderOnClient: (data) => <ICreateOrderRequest> {
        intent: 'CAPTURE',
        purchase_units: [
          {
            amount: {
              currency_code: 'USD',
              value: this.betAmount,
              breakdown: {
                item_total: {
                  currency_code: 'USD',
                  value: this.betAmount
                }
              }
            },
            items: [
              {
                name: 'KickPredict ',
                quantity: '1',
                category: 'DIGITAL_GOODS',
                unit_amount: {
                  currency_code: 'USD',
                  value: this.betAmount,
                },
              }
            ]
          }
        ]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details' +
              ' inside onApprove: ', details);
        });
      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably ' +
            'inform your server about completed transaction at this point', data);
        this.showSuccess = true;
        this.savePayment(data);
        console.log(JSON.stringify(data));
      },
      onCancel: (data, actions) => {
        this.loadCtrl.dismiss();
        console.log('OnCancel', data, actions);
      },
      onError: err => {
        console.log('OnError', err);
        this.loadCtrl.dismiss();
      },
      onClick: async (data, actions) => {
        await this.loading.present();
        console.log('onClick', data, actions);
      },
    };
  }

  savePayment(paymentObj) {
    this.bidService.postPayment({
      amount: this.betAmount - 0,
      details: paymentObj,
      sneaker: this.productId,
      meta: {
        productId: this.productId,
        productName: this.productName,
        bidType: this.bidType,
        betAmount: this.betAmount
      }
    }).subscribe((data: any) => {
      this.sneaker = data.sneaker;
      this.postBid(data);
    }, (err) => {
      console.log(err);
      this.loadCtrl.dismiss();
    });
  }
  postBid(payment) {
    this.bidService.postBid({
      settlement_price: this.sneaker.settlement_price,
      settlement_date: this.sneaker.settlement_date,
      bid: this.bidType,
      amount: this.betAmount - 0,
      sneaker: this.sneaker.id,
      payment: payment.id
    }).subscribe((data) => {
      console.log(data);
      this.util.presentToast('Bid placed successfully!');
      this.loadCtrl.dismiss();
      this.router.navigate(['/tabs/tabs/home']);
      setTimeout(() => {
        this.ngZone.run(() => {
          this.router.navigate(['/tabs/tabs/bids']);
        });
      }, 100);
    }, (err) => {
      console.log(err);
      this.loadCtrl.dismiss();
    });
  }
}
