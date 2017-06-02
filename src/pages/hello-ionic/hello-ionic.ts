import { Component  } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
//import { ListPage } from '../list/list';
import { Dashboard } from '../dashboard/dashboard';

@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html'
})
export class HelloIonicPage {

  account: { username: string, password: string } = {
    username: '',
    password: ''
  };

  constructor(public navCtrl: NavController,public navParams: NavParams)
  {

  }

  doLogin(event){
    //push - pop - setRoot
    this.navCtrl.setRoot(Dashboard, {
      data: this.account
    });
  }
}
