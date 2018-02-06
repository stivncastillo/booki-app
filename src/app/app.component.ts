import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { TranslateService } from '@ngx-translate/core';
import { Config, Nav, Platform } from 'ionic-angular';

import { FirstRunPage, MainPage } from '../pages/pages';
import { Settings } from '../providers/providers';
import { UserProvider } from '../providers/providers';

@Component({
  templateUrl: '../pages/menu/menu.html'
})
export class MyApp {
  rootPage = FirstRunPage;

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [
    { title: 'My Books', component: 'BookListPage' },
    { title: 'Profile', component: 'ProfilePage' },
    { title: 'Logout', component: 'Logout' },
  ]

  constructor(
    private translate: TranslateService,
    platform: Platform,
    settings: Settings,
    private config: Config,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    public userProvider: UserProvider
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    this.initTranslate();

      if (localStorage.getItem('token')) {
        this.rootPage = MainPage;
      }else{
        this.rootPage = FirstRunPage;
      }
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    this.translate.setDefaultLang('en');

    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use('en'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    console.log(page.component);

    if (page.component === "Logout") {
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
