import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Platform } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-book-detail',
	templateUrl: 'book-detail.html',
})
export class BookDetailPage {
	book: any;
	view: string = "detail";
	isAndroid: boolean = false;

	constructor(public navCtrl: NavController, public navParams: NavParams, platform: Platform) {
		this.isAndroid = platform.is('android');
		if (!navParams.get('book')) {
			this.navCtrl.setRoot('BookListPage');
		}
		this.book = navParams.get('book');
	}

	ionViewDidLoad() {
		// console.log(this.book);
	}

}
