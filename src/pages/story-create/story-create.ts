import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { StoryProvider } from '../../providers/providers';

import { Story } from '../../models/story';
import { Book } from '../../models/book';

@IonicPage()
@Component({
	selector: 'page-story-create',
	templateUrl: 'story-create.html',
})
export class StoryCreatePage {

	form: FormGroup;
	isReadyToSave: boolean;
	loginLoading: string;

	story: Story;
	book: Book;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		formBuilder: FormBuilder,
		public viewCtrl: ViewController,
		public loadingCtrl: LoadingController,
		public translateService: TranslateService,
		public storyProvider: StoryProvider,
		) {

		this.book = navParams.get('book');

		this.form = formBuilder.group({
			date: ['', Validators.required],
			page: ['', Validators.required],
			chapter: [''],
			is_end: [false],
			summary: ['']
		});

		// Watch the form for changes, and
		this.form.valueChanges.subscribe((v) => {
			this.isReadyToSave = this.form.valid;
		});

		this.translateService.get('LOADING').subscribe((value) => {
			this.loginLoading = value;
		});
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad StoryCreatePage');
	}

	cancel() {
		this.viewCtrl.dismiss();
	}

	done() {
		if (!this.form.valid) { return; }
		let loader = this.loadingCtrl.create({
			content: this.loginLoading,
			spinner: 'dots'
		});
		loader.present();

		this.story = this.form.value;
		this.story.book_id = this.book.id;

		this.storyProvider.storeStory(this.story).subscribe((resp) => {
			loader.dismiss();
			this.viewCtrl.dismiss(this.form.value);
		}, (err) => {
			loader.dismiss();
		});
	}

}
