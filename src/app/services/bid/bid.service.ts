import {Injectable} from '@angular/core';
import {ApiService} from '../api/api.service';
import {EndpointsService} from '../api/endpoints.service';
import {share} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class BidService {

    constructor(private api: ApiService,
                private uris: EndpointsService) {
    }

    getBids() {
        const {bids} = this.uris;
        const bids$ = this.api.get(bids, {}).pipe(share());
        return bids$;
    }
    getBid(id) {
        const {singleBid} = this.uris;
        const bid$ = this.api.get(singleBid(id), {}).pipe(share());
        return bid$;
    }
    postPayment(paymentObj) {
        const {payments} = this.uris;
        const payments$ = this.api.post(payments, paymentObj).pipe(share());
        return payments$;
    }
    postBid(bid) {
        const {bids} = this.uris;
        const bids$ = this.api.post(bids, bid).pipe(share());
        return bids$;
    }
    cancelBid(id) {
        const {bidCancel} = this.uris;
        const cancelBid$ =  this.api.delete(bidCancel(id)).pipe(share());
        return cancelBid$;
    }
}
