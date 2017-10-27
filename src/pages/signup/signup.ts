import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { UserProvider } from '../../providers/providers';
import { MainPage } from '../pages';
import { User } from '../../models/user';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {

  private formSignup: FormGroup

  user: User;

  // Our translated text strings
  private signupErrorString: string;

  constructor(
    public navCtrl: NavController,
    public userProvider: UserProvider,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    private formBuilder: FormBuilder) {

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    });

    this.formSignup = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.required]
    });
  }

  doSignup() {
    this.user = this.formSignup.value;
    this.user.confirm_password = this.user.password;
    // Attempt to login in through our User service
    this.userProvider.signup(this.user).subscribe((resp) => {
      this.navCtrl.push(MainPage);
    }, (err) => {
      // Unable to sign up
      let toast = this.toastCtrl.create({
        message: this.signupErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}
