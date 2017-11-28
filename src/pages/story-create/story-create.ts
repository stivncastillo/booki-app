import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';

@IonicPage()
@Component({
	selector: 'page-story-create',
	templateUrl: 'story-create.html',
})
export class StoryCreatePage {
	isReadyToSave: boolean;

	constructor(
		public navCtrl: NavController,
		public viewCtrl: ViewController,
		public translateService: TranslateService,
		public navParams: NavParams
		) {
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
