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
	lastStory: Story;
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
		this.fillStoriesList();
	}

	fillStoriesList() {
		this.stories = [];
		this.storyProvider.getStoriesBookList(this.book.id).subscribe((response) => {
			let _response: APIResponse;
			_response = <APIResponse>response;
			this.stories = _response.data;
			this.lastStory = this.stories.shift();
		}, (err) => {
			// this.storage.remove('token');
		});
	}

	addStory() {
		let addModal = this.modalCtrl.create('StoryCreatePage', {book: this.book});
		addModal.onDidDismiss(book => {
			this.fillStoriesList();
		})
		addModal.present();
	}

}
