import {Injectable} from '@angular/core';
import {share} from 'rxjs/operators';
import {EndpointsService} from '../api/endpoints.service';
import {ApiService} from '../api/api.service';

@Injectable({
    providedIn: 'root'
})
export class SneakerService {
    private sneakers;
    constructor(private api: ApiService,
                private uris: EndpointsService) {
    }

    getSneaker({_start, _limit}) {
        const {sneakers} = this.uris;
        const sneakers$ = this.api.get(sneakers, {
        }).pipe(share());
        return sneakers$;
    }
    setSneakers(sneakers) {
        this.sneakers = sneakers;
    }
    getAllSneakers() {
        return this.sneakers;
    }
    getSize() {
        return {
            four: 4,
            four_and_a_half: 4.5,
            five: 5,
            five_and_a_half: 5.5,
            six: 6,
            six_and_a_half: 6.5,
            seven: 7,
            seven_and_a_half: 7.5,
            eight: 8,
            eight_and_a_half: 8.5,
            nine: 9,
            nine_and_a_half: 9.5,
            ten: 10,
            ten_and_a_half: 10.5,
            eleven: 11,
            eleven_and_a_half: 11.5,
            twelve: 12,
            twelve_and_a_half: 12.5,
            thirteen: 13,
            thirteen_and_a_half: 13.5,
            fourteen: 14,
            fourteen_and_a_half: 14.5,
            fiveteen: 15,
            sixteen: 16,
            seventeen: 17
        };
    }
}
