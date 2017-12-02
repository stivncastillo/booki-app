import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';

import { StoryProvider } from '../../providers/providers';

import { Story } from '../../models/story';
import { Book } from '../../models/book';
import { APIResponse } from '../../models/api-response';

@IonicPage()
@Component({
	selector: 'page-book-detail',
	templateUrl: 'book-detail.html',
})
export class BookDetailPage {
	book: Book;
	stories: Array<Story>;
	view: string = "detail";

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public storyProvider: StoryProvider,
		public modalCtrl: ModalController,
		platform: Platform
	) {
		if (!navParams.get('book')) {
			this.navCtrl.push('BookListPage');
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

	addStory() {
		let addModal = this.modalCtrl.create('StoryCreatePage', {book: this.book});
		addModal.onDidDismiss(book => {
			console.log('Load list');
			this.fillList();
		})
		addModal.present();
	}

}
