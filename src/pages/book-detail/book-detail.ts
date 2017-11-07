import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';

import { StoryProvider } from '../../providers/providers';
import { Story } from '../../models/story';
import { APIResponse } from '../../models/api-response';

@IonicPage()
@Component({
	selector: 'page-book-detail',
	templateUrl: 'book-detail.html',
})
export class BookDetailPage {
	book: any;
	stories: Array<Story>;
	view: string = "detail";
	isAndroid: boolean = false;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public storyProvider: StoryProvider,
		platform: Platform
	) {
		this.isAndroid = platform.is('android');
		if (!navParams.get('book')) {
			this.navCtrl.setRoot('BookListPage');
		}
		this.book = navParams.get('book');
	}

	ionViewDidLoad() {
		// console.log(this.book);
		this.fillList();
	}

	fillList() {
		this.stories = [];
		this.storyProvider.getStoriesBookList(this.book.id).subscribe((response) => {
			let _response: APIResponse;
			_response = <APIResponse>response;
			this.stories = _response.data;
		}, (err) => {
			// this.storage.remove('token');
			// localStorage.removeItem('token');
			// this.navCtrl.setRoot('LoginPage', {opt:{dismiss:false}});
		});
	}

}
