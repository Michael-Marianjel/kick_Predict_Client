import {Component, OnInit} from '@angular/core';
import {Platform} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';
import {SneakerService} from '../../services/sneaker/sneaker.service';
import {environment} from '../../../environments/environment';
import {first} from 'rxjs/operators';
import {UserService} from '../../services/user/user.service';
import {UtilityService} from '../../services/utility';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
    public width;
    public sliderPerView;
    imageHost = environment.server;
    slideOpts;
    limit = 1;
    start = 0;
    sneakers = [];
    currentSneaker;
    currentIndex;
    size;
    currentSneakerImage;
    isHigh;
    untouched = true;
    queryParams;

    constructor(private platform: Platform,
                private router: Router,
                private sneakerService: SneakerService,
                private userService: UserService,
                private acRoute: ActivatedRoute,
                private util: UtilityService) {
    }

    ngOnInit() {
        this.platform.ready().then(() => {
            this.width = this.platform.width();
            if (this.width < 600) {
                this.slideOpts = {
                    initialSlide: 1,
                    spaceBetween: 16,
                    slidesPerView: 3,
                    speed: 400
                };
            } else {
                this.slideOpts = {
                    initialSlide: 1,
                    spaceBetween: 16,
                    slidesPerView: 5,
                    speed: 400
                };
            }
        });
    }

    async onBet(betAmount) {
        if (!this.currentSneaker.allowBidding) {
            this.util.presentToast('Oops, the betting window has closed', 5000);
            return false;
        }
        const isAuthenticated = await this.userService.isAuthenticated();
        if (isAuthenticated) {
            await this.router.navigate(['/tabs/tabs/home/paypal'], {
                relativeTo: this.acRoute,
                queryParams: {
                    name: this.currentSneaker.name,
                    id: this.currentSneaker.id,
                    bid: this.isHigh === true ? 'over' : 'under',
                    betAmount
                }
            });
        } else {
            await this.router.navigate(['/login'], {
                queryParams: {
                    name: this.currentSneaker.name,
                    id: this.currentSneaker.id,
                    bid: this.isHigh === true ? 'over' : 'under',
                    betAmount
                }
            });
        }
    }

    next() {
        this.router.navigate(['/tabs/tabs/home/' + this.sneakers[this.currentIndex + 1].id], {
            relativeTo: this.acRoute
        });
    }

    prev() {
        this.router.navigate(['/tabs/tabs/home/' + this.sneakers[this.currentIndex - 1].id], {
            relativeTo: this.acRoute
        });
    }

    async ionViewWillEnter() {
        this.queryParams = await this.acRoute.queryParams.pipe(first()).toPromise();
        const param = await this.acRoute.params.pipe(first()).toPromise();
        const id = param.id;
        this.size = this.sneakerService.getSize();
        const sneakerArr = this.sneakerService.getAllSneakers();
        if (sneakerArr && sneakerArr.length > 0) {
            this.sneakers = this.sneakerService.getAllSneakers();
            if (id) {
                this.currentSneaker = this.getCurrentSneaker(id);
                this.currentSneakerImage = this.currentSneaker.image.url;
            } else {
                this.currentSneaker = this.sneakers[0];
                this.currentIndex = 0;
                this.currentSneakerImage = this.currentSneaker.image.url;
            }
            if (this.queryParams.id && this.queryParams.betAmount) {
                // call onBet if sneeker is present at queryParam
                this.onBet(this.queryParams.betAmount);
            }
        } else {
            this.getSneaker();
        }
    }

    async getSneaker() {
        const param = await this.acRoute.params.pipe(first()).toPromise();
        const id = param.id;
        this.sneakerService.getSneaker({_start: this.start, _limit: this.limit})
            .subscribe((data: any) => {
                console.log(data);
                this.sneakers = data;
                this.sneakerService.setSneakers(data);
                if (this.sneakers.length === 0 ) { return false; }
                if (id) {
                    this.currentSneaker = this.getCurrentSneaker(id);
                    this.currentSneakerImage = this.currentSneaker.image.url;
                } else {
                    this.currentSneaker = this.sneakers[0];
                    this.currentIndex = 0;
                    this.currentSneakerImage = this.currentSneaker.image.url;
                }
                if (this.queryParams.id && this.queryParams.betAmount) {
                    // call onBet if sneeker is present at queryParam
                    this.onBet(this.queryParams.betAmount);
                }
            });
    }

    onLow() {
        this.isHigh = false;
        this.untouched = false;
    }

    onHigh() {
        this.isHigh = true;
        this.untouched = false;
    }
    getCurrentSneaker(id) {
        return this.sneakers.find((sneaker, i) => {
            this.currentIndex = i;
            return sneaker.id == id;
        });
    }
}
