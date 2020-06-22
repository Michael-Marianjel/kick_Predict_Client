import {Injectable} from '@angular/core';
import {AlertController, ToastController} from '@ionic/angular';
import {ActivatedRoute, Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class UtilityService {
    constructor(private toastCtrl: ToastController,
                private alertController: AlertController,
                private activatedRoute: ActivatedRoute, private router: Router) {
    }

    async presentToast(message, duration = 5000, showCloseButton: boolean = false,
                       position = 'top', closeButtonText = '') {

        const toastOptions: any = {
            message,
            duration,
            showCloseButton,
            position,
            buttons: [
                {
                    icon: 'close',
                    role: 'cancel',
                    handler: () => {
                        console.log('Cancel clicked');
                    }
                }
            ]
        };
        const toast = await this.toastCtrl.create(toastOptions);

        toast.present();
    }

    activeRoute() {
        return this.activatedRoute;
    }

    navigate(relativePath) {
        const path = this.router.url + '/' + relativePath;
        return this.router.navigateByUrl(path);
    }

    objectToQueryParams(obj) {
        return Object.keys(obj).reduce(function (a, k) {
            a.push(k + '=' + encodeURIComponent(obj[k]));
            return a;
        }, []).join('&');
    }

    isEmpty(data) {
        return (data === undefined) || (data === null) || (data === '');
    }

    async presentAlertConfirm(message, success, cancel, {buttonCancel, buttonSuccess}) {
        const alert = await this.alertController.create({
            header: 'Confirm!',
            subHeader: 'Subtitle',
            message,
            buttons: [
                {
                    text: 'Cancel',
                    role: 'cancel',
                    cssClass: buttonCancel,
                    handler: () => {
                        cancel();
                    }
                }, {
                    cssClass: 'hbsecondary',
                    text: buttonSuccess,
                    handler: () => {
                        success();
                    }
                }
            ]
        });

        await alert.present();
    }
    hasValue(data) {
        return (data !== undefined) && (data !== null) && (data !== '');
    }
}
