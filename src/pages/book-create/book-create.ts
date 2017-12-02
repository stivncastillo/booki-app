import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

import { Book } from '../../models/book';
import { BooksProvider } from '../../providers/books/books';

@IonicPage()
@Component({
	selector: 'page-book-create',
	templateUrl: 'book-create.html',
})
export class BookCreatePage {

	isReadyToSave: boolean;
	book: Book;
	form: FormGroup;
	loginLoading: string;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		formBuilder: FormBuilder,
		public viewCtrl: ViewController,
		public loadingCtrl: LoadingController,
		public translateService: TranslateService,
		public bookProvider: BooksProvider
	) {

		this.form = formBuilder.group({
			name: ['', Validators.required],
			author: ['', Validators.required],
			pages: ['', Validators.required],
			year: [''],
			started_in: [''],
			description: [''],
			editorial: ['']
		});

		// Watch the form for changes, and
		this.form.valueChanges.subscribe((v) => {
			this.isReadyToSave = this.form.valid;
		});

		this.translateService.get('LOADING').subscribe((value) => {
			this.loginLoading = value;
		});
	}

	cancel() {
		this.viewCtrl.dismiss();
	}

	done() {

		console.log('guardando');

		if (!this.form.valid) { return; }
		let loader = this.loadingCtrl.create({
			content: this.loginLoading,
			spinner: 'dots'
		});
		loader.present();

		this.book = this.form.value;

		this.bookProvider.storeBook(this.book).subscribe((resp) => {
			loader.dismiss();
			this.viewCtrl.dismiss(this.form.value);
		}, (err) => {
			loader.dismiss();
		});
	}

}
