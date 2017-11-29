import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@IonicPage()
@Component({
	selector: 'page-story-create',
	templateUrl: 'story-create.html',
})
export class StoryCreatePage {
	isReadyToSave: boolean;
	loginLoading: string;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		formBuilder: FormBuilder,
		public viewCtrl: ViewController,
		public loadingCtrl: LoadingController,
		public translateService: TranslateService,
		) {

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
		console.log('Holita');
	}

}
