import { Component, ViewChild } from '@angular/core';
import { IonicPage, Nav, NavController } from 'ionic-angular';
import { UserProvider } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {
  // A reference to the ion-nav in our component
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'ContentPage';

  pages: Array<{ title: string, component: any }>;

  constructor(
    public navCtrl: NavController,
    public userProvider: UserProvider
  ) {
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Sign in', component: 'LoginPage' },
      { title: 'Signup', component: 'SignupPage' }
    ];
  }

  ionViewDidLoad() {
    console.log('Hello MenuPage Page');
  }

  openPage(page) {
    console.log(page);

    if (page === "Logout") {
      this.userProvider.logout().then(() => {
        this.nav.setRoot("WelcomePage");
      });
    }else{
      // Reset the content nav to have just this page
      // we wouldn't want the back button to show in this scenario
      this.nav.setRoot(page.component);
    }
  }
}
