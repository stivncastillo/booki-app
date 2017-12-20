import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Api } from '../api/api';

@Injectable()
export class ProfileProvider {

    constructor(public api: Api) {}

    getProfile() {
        let request = this.api.get('user/profile').share();

        request.subscribe((res) => {
        }, err => {
            console.error('ERROR', err);
        });

        return request;
    }

    patchProfile(user: any) {
        let seq = this.api.patch('user/profile', user).share();

        seq.subscribe((res: any) => {
        }, err => {
            console.error('ERROR', err);
        });

        return seq;
    }

}
