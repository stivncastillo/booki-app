import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProfileProvider } from '../../providers/providers';
import { APIResponse } from '../../models/api-response';
import { User } from '../../models/user';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  form: FormGroup;
  user: User;
  loginLoading: string;

  constructor(
    public navCtrl: NavController,
    formBuilder: FormBuilder,
    public translateService: TranslateService,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public profileProvider: ProfileProvider
  ) {
    this.form = formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      password: [''],
      confirm_password: [''],
    });

    this.translateService.get('LOADING').subscribe((value) => {
			this.loginLoading = value;
		});
  }

  ionViewDidLoad() {
    this.profileProvider.getProfile().subscribe((response) => {
      let _response: APIResponse;
      _response = <APIResponse>response;
      this.user = _response.data;

      this.form.setValue({
        last_name: this.user.last_name,
        first_name: this.user.first_name,
        password: '',
        confirm_password: '',
      });
    }, (err) => {
      // this.storage.remove('token');
    });
  }

  update() {

		if (!this.form.valid) { return; }
		let loader = this.loadingCtrl.create({
			content: this.loginLoading,
			spinner: 'dots'
		});
		loader.present();

		this.profileProvider.patchProfile(this.form.value).subscribe((resp) => {
			loader.dismiss();
		}, (err) => {
			loader.dismiss();
		});
  }

}
