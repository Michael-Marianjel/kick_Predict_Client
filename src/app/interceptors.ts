// import { Events } from '@ionic/angular';
import {tap, map, catchError, finalize} from 'rxjs/operators';



import {
    HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
    HttpResponse
} from '@angular/common/http';

import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, throwError} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HTTPStatus {
    private requestInFlight$: BehaviorSubject<boolean>;
    constructor() {
        this.requestInFlight$ = new BehaviorSubject(false);
    }

    setHttpStatus(inFlight: boolean) {
        this.requestInFlight$.next(inFlight);
    }

    getHttpStatus(): Observable<boolean> {
        return this.requestInFlight$.asObservable();
    }
}

@Injectable({
    providedIn: 'root'
})
export class EventStatus {
    private event$: BehaviorSubject<object>;
    constructor() {
        this.event$ = new BehaviorSubject<object>({});
    }
    setEvent(eventObj: any) {
        this.event$.next(eventObj);
    }
    getEvent() {
        return this.event$.asObservable();
    }
}


@Injectable()
export class CustomInterceptors implements HttpInterceptor {

    constructor(private status: HTTPStatus,
                private eventS: EventStatus
                // private events: Events
    ) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // request = request.clone({
        //     headers: request.headers.set('Authorization', `Bearer JWT_TOKEN`)
        // });
        return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse) {
                }
            }, (error: any) => {
                if (error instanceof HttpErrorResponse) {
                    // this.events.publish('error:occurred', error, Date.now());
                }
            }), map(event => {
                this.eventS.setEvent(event);
                this.status.setHttpStatus(true);
                return event;
            }),
            catchError(error => {
                this.eventS.setEvent(error);
                return throwError(error);
            }),
            finalize(() => {
                this.status.setHttpStatus(false);
            }));
    }

}
