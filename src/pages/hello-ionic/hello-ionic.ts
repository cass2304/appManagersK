import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
//import { ListPage } from '../list/list';
import { Dashboard } from '../dashboard/dashboard';
import { AuthProvider } from '../../providers/auth/auth';




@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html',
  providers: [AuthProvider]
})
export class HelloIonicPage {

  account: { username: string, password: string } = {
    username: '',
    password: '',

  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public AuthProvider: AuthProvider) {

  }

  doLogin(event) {
    //push - pop - setRoot
      this.AuthProvider.login(this.account)
      .then(data => {       
        this.navCtrl.setRoot(Dashboard, {
          data: this.account
        });
      });
  }


}
