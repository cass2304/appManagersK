import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
//import { OneSignal } from '@ionic-native/onesignal';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
//import { ListPage } from '../pages/list/list';
import { Dashboard } from '../pages/dashboard/dashboard';
import { AuthProvider } from '../providers/auth/auth';
import { CheckinsViewPage } from '../pages/checkins-view/checkins-view';
import { NotificationsViewPage } from '../pages/notifications-view/notifications-view';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';



@Component({
  templateUrl: 'app.html',
  providers: [AuthProvider]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // make HelloIonicPage the root (or first) page
  rootPage = Dashboard;
  pages: Array<{ title: string, component: any }>;

  constructor(
    public platform: Platform,
    public menu: MenuController,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public authProvider: AuthProvider,
    public LoadingController: LoadingController,
    //public oneSignals: OneSignal
  ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
      { title: 'Dashboard', component: Dashboard },
      { title: 'Checkins', component: CheckinsViewPage },
      { title: 'Notifications', component: NotificationsViewPage },
      { title: 'Logout', component: HelloIonicPage },
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      /*var notificationOpenedCallback = function (jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      };*/

      /*if (this.platform.is('cordova')) {
        // You are on a device, cordova plugins are accessible
        this.oneSignals.startInit('dddc27a1-ae73-4621-b562-40dc39a1d305', '');
        this.oneSignals.inFocusDisplaying(this.oneSignals.OSInFocusDisplayOption.InAppAlert);

        this.oneSignals.handleNotificationReceived().subscribe(() => {
          // do something when notification is received
        });

        this.oneSignals.handleNotificationOpened().subscribe(() => {
          // do something when a notification is opened
        });
      } else {
        // Cordova not accessible, add mock data if necessary
      }*/



      /*window["plugins"].OneSignal
        .startInit("dddc27a1-ae73-4621-b562-40dc39a1d305")
        .handleNotificationOpened(notificationOpenedCallback)
        .endInit();*/

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  doAlertLoading(_page) {
    this.menu.close();
    this.nav.setRoot(_page.component);
    let loader = this.LoadingController.create({
      content: "Bye...",
      duration: 2000
    });
    loader.present();
  }

  openPage(page) {
    if (page.title === 'Logout') {
      //TODO call service logout
      this.authProvider.logout()
        .then(dt => {
          this.doAlertLoading(page);
        })
    } else {
      // close the menu when clicking a link from the menu
      this.menu.close();
      // navigate to the new page if it is not the current page
      this.nav.setRoot(page.component);
    }
  }
}
