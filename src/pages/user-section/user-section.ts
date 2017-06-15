import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ClientsProvider } from '../../providers/clients/clients';

/**
 * Generated class for the UserSectionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-user-section',
  templateUrl: 'user-section.html',
  providers:[ClientsProvider]
})
export class UserSectionPage {

  last: any=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public users: ClientsProvider) {
    this.loadUsersActivity();
  }


  loadUsersActivity(){
    this.users.activityUser()
    .then(values =>{
      console.log(values);   
      this.last = values.data
    }).catch(error => {
      console.log(error);
      
    })

  }

}
