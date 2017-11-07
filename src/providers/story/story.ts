import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Api } from '../api/api';

@Injectable()
export class StoryProvider {

  constructor(public api: Api) {
    console.log('Hello StoryProvider Provider');
  }

  getStoriesBookList(id: number) {
    let request = this.api.get('user/book/' + id + '/stories').share();

    request.subscribe((res) => {
    }, err => {
      console.error('ERROR', err);
    });

    return request;
  }

}
