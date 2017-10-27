import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { UserProvider } from '../../providers/providers';
import { MainPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  private formSignin: FormGroup

  account: { email: string, password: string };

  // Our translated text strings
  private loginErrorString: string;

  constructor(
    public navCtrl: NavController,
    public userProvider: UserProvider,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private formBuilder: FormBuilder) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    });

    this.formSignin = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['', Validators.required]
    });
  }

  // Attempt to login in through our User service
  doLogin() {
    this.account = this.formSignin.value;
    this.userProvider.login(this.account).subscribe((resp) => {
      this.navCtrl.push(MainPage);
    }, (err) => {
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}
