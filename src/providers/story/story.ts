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

  storeStory(story: any) {
    let seq = this.api.post(`books/${story.book_id}/stories`, story).share();

    seq.subscribe((res: any) => {
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

}
