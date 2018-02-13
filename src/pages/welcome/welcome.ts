import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, ToastController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';
import { TranslateService } from '@ngx-translate/core';

import { UserProvider } from '../../providers/providers';
import { User } from '../../models/user';
import { MainPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  private signupErrorString: string;
  private loginLoading: string;
  user: User;
  loader: any;

  constructor(
    public navCtrl: NavController,
    private facebook: Facebook,
    public translateService: TranslateService,
    public userProvider: UserProvider,
    public toastCtrl: ToastController,
    public loadingCtrl: LoadingController
  ) {
    this.translateService.get('LOADING').subscribe((value) => {
      this.loginLoading = value;
    });

    this.translateService.get('SIGNUP_ERROR').subscribe((value) => {
      this.signupErrorString = value;
    });
  }

  login() {
    this.navCtrl.push('LoginPage');
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }

  loginFacebook(){
    this.facebook.login(['public_profile', 'email'])
      .then(rta => {
        if(rta.status == 'connected'){
          this.getInfo();
        };
      })
      .catch(error => {
        console.error( error );
      });
  }

  getInfo(){
    this.facebook.api('/me?fields=id,name,email,first_name,last_name',['public_profile','email'])
    .then(data => {
      this.user = {
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        password: data.id
      };

      this.userProvider.loginSocial(this.user).subscribe((resp) => {
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
    })
    .catch(error => {
      console.error( JSON.stringify(error) );
    });
  }
}
