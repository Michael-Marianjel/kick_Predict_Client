import { Component, OnInit } from '@angular/core';
import {SneakerService} from '../../services/sneaker/sneaker.service';
import {BidService} from '../../services/bid/bid.service';
import {environment} from '../../../environments/environment';
import {ActivatedRoute, Router} from '@angular/router';
import {interval} from 'rxjs';

@Component({
  selector: 'app-bids',
  templateUrl: './bids.page.html',
  styleUrls: ['./bids.page.scss'],
})
export class BidsPage implements OnInit {
  public bids;
  subscription;
  imageHost = environment.server;
  constructor(private router: Router, private acRoute: ActivatedRoute,
              private bidsService: BidService) { }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.getBids();
    const interval$ = interval(1000 * 10);
    this.subscription = interval$.subscribe(() => {
      this.getBids();
    });
  }
  onBidSelect(bid) {
    this.router.navigate(['bid/' + bid.id], {
      relativeTo: this.acRoute
    });
  }
  getBids() {
    this.bidsService.getBids().subscribe((data: any) => {
      console.log(data);
      this.bids = data;
      this.bids.forEach((bid) => {
        if (bid.status === 'unmatched' && bid.manuallyMatched) {
          bid.status = 'matched';
        }
      });
    });
  }
  ionViewWillLeave() {
    this.subscription.unsubscribe();
  }
}
