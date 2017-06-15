import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
//import { ListPage } from '../list/list';
import { Dashboard } from '../dashboard/dashboard';
import { AuthProvider } from '../../providers/auth/auth';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';


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

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, public AuthProvider: AuthProvider,
    public alerCtrl: AlertController, 
    public loadingCtrl: LoadingController) {
  }

  doAlert() {
    let alert = this.alerCtrl.create({
      title: 'wrong access',
      message: 'incorrect email or password',
      buttons: ['Ok']
    });
    alert.present()
  }

  doAlertDelegate() {
    this.account.password='';
    this.account.username='';
    let alert = this.alerCtrl.create({
      title: 'wrong access',
      message: 'this app is for Managers',
      buttons: ['Ok']
    });
    alert.present()
  }

  doLogin(event) {

    let loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 2000
    });

    loader.present();
    //push - pop - setRoot
      /*this.navCtrl.setRoot(Dashboard, {
            data: 'sales'
          });*/

    this.AuthProvider.login(this.account)
      .then(data => { 
        if(data.isDelegate){
          this.doAlertDelegate();
          return false
        }      
        setTimeout(() => {
          this.navCtrl.setRoot(Dashboard, {
            data: data
          });
        }, 2000);

      }).catch(Error => {
        this.doAlert();
      });
  }
}
