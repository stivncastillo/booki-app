import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Api } from '../api/api';

@Injectable()
export class BooksProvider {

  constructor(public api: Api,) {}

  /**
   * Send GET request to get book list of user
   */
  getUserBookList() {
    let request = this.api.get('user/books').share();

    request.subscribe((res: any) => {
    	console.log(res);
    }, err => {
      console.error('ERROR', err);
    });

    return request;
  }

}
