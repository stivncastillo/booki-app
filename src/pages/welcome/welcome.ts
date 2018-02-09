import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { Facebook } from '@ionic-native/facebook';

import { UserProvider } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(
    public navCtrl: NavController,
    private facebook: Facebook,
    public userProvider: UserProvider
  ) { }

  login() {
    this.navCtrl.push('LoginPage');
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }

  loginFacebook(){
    this.facebook.login(['public_profile', 'email'])
      .then(rta => {
        console.log(rta.status);
        if(rta.status == 'connected'){
          this.getInfo();
        };
      })
      .catch(error =>{
        console.error( error );
      });
  }

  getInfo(){
    this.facebook.api('/me?fields=id,name,email,first_name,picture,last_name,gender',['public_profile','email'])
    .then(data=>{
      console.log(data);
    })
    .catch(error =>{
      console.error( error );
    });
  }
}
