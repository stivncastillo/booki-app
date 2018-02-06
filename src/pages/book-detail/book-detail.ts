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
	page = 1;
	lastPage = 0;
	loadScroll = true;

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
		this.stories = [];
		this.fillStoriesList();
	}

	fillStoriesList() {
		return new Promise(resolve => {
			this.storyProvider.getStoriesBookList(this.book.id).subscribe((response) => {
				let _response: APIResponse;
				_response = <APIResponse>response;

				this.lastPage = _response.meta.last_page;

				if (this.lastPage > 1) {
					if (this.lastPage === this.page) {
						this.loadScroll = false;
					}
					this.page = this.page + 1;
				}

				_response.data.forEach((value, index) => {
					this.stories.push(value);
				});

				this.lastStory = this.stories.shift();

				resolve(true);

			}, (err) => {
				resolve(false);
				// this.storage.remove('token');
			});
		});
	}

	addStory() {
		let addModal = this.modalCtrl.create('StoryCreatePage', {book: this.book});
		addModal.onDidDismiss(book => {
			this.fillStoriesList();
		})
		addModal.present();
	}

	openStory(story: Story) {

		this.navCtrl.push('StoryDetailPage', {
			story: story,
			opt: {
				dismiss: false
			}
		});

	}

	/**
	* Infinite Scroll
	*/
	doInfinite(infiniteScroll) {
		this.fillStoriesList().then(() => {
			infiniteScroll.complete();
			infiniteScroll.enable(this.loadScroll);
		});
	}

}
