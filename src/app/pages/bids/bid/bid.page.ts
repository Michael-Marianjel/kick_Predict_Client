import {Component, OnInit} from '@angular/core';
import {BidService} from '../../../services/bid/bid.service';
import {ActivatedRoute} from '@angular/router';
import {SneakerService} from '../../../services/sneaker/sneaker.service';
import {environment} from '../../../../environments/environment';
import {Location} from '@angular/common';

@Component({
    selector: 'app-bid',
    templateUrl: './bid.page.html',
    styleUrls: ['./bid.page.scss'],
})
export class BidPage implements OnInit {
    bidId;
    bid;
    size;
    imageHost = environment.server;
    constructor(private acRoute: ActivatedRoute,
                private bidService: BidService,
                private location: Location,
                private sneakerService: SneakerService) {
    }

    ngOnInit() {
        this.size = this.sneakerService.getSize();
    }

    getBid(id) {
        this.bidService.getBid(this.bidId).subscribe((data) => {
            console.log(data);
            this.bid = data;
        });
    }

    ionViewWillEnter() {
        this.acRoute.params.subscribe((data: any) => {
            this.bidId = data.id;
            this.getBid(this.bidId);
        });
    }
    cancelBid(id) {
        this.bidService.cancelBid(id).subscribe((data: any) => {
            console.log(data);
            this.location.back();
        }, (err) => {
            console.log(err);
        });
    }


}
