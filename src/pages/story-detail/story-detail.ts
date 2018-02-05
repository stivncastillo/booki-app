import { Component } from '@angular/core';
import { IonicPage, ModalController, NavParams, NavController, LoadingController } from 'ionic-angular';


import { Story } from '../../models/story';


@IonicPage()
@Component({
  selector: 'page-story-detail',
  templateUrl: 'story-detail.html',
})
export class StoryDetailPage {

  story: Story;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    if (!navParams.get('story')) {
			this.navCtrl.push('BookListPage');
		}

		this.story = navParams.get('story');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StoryDetailPage');
  }

}
