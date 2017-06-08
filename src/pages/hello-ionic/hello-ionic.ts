import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
//import { ListPage } from '../list/list';
import { Dashboard } from '../dashboard/dashboard';
import { AuthProvider } from '../../providers/auth/auth';
import { AlertController } from 'ionic-angular';




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

  constructor(public navCtrl: NavController, public navParams: NavParams, public AuthProvider: AuthProvider, public alerCtrl: AlertController) {

  }

  doAlert() {
    console.log('here');
    let alert = this.alerCtrl.create({
      title: 'wrong access',
      message: 'incorrect email or password',
      buttons: ['Ok']
    });
    alert.present()
  }

  doLogin(event) {
    //push - pop - setRoot
      this.AuthProvider.login(this.account)
      .then(data => {       
        console.log('sadd');        
        this.navCtrl.setRoot(Dashboard, {          
          data: data                            
        });
      }).catch( Error => {                
        this.doAlert();
      });
  }


}
