import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';
import { ClientsProvider } from '../../providers/clients/clients';
/**
 * Generated class for the CheckinSectionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-checkin-section',
  templateUrl: 'checkin-section.html',
  providers:[ClientsProvider]
})
export class CheckinSectionPage {

  checkins: any=[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public chekins: ClientsProvider) {
    this.loadVisitedMades();
  }  

  loadVisitedMades(){
    this.chekins.getVisitedMade()    
    .then(data =>{       
      this.checkins = data
    }).catch(error => {
      console.log(error);
      
    })
  }

}
