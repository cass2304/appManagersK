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
  filters_checkins: any = '';

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public chekins: ClientsProvider) {    
    this.filters_checkins = navParams.get('filters');        
    this.loadVisitedMades(this.filters_checkins);
  }  

  loadVisitedMades(filters){    
    this.chekins.getVisitedMade(filters)    
    .then(data =>{       
      this.checkins = data
    }).catch(error => {
      console.log(error);
      
    })
  }

  /*loadUserViews(){
    this.navCtrl.push(CheckinSectionPage, {
          filters : this.filters
        });
  }*/

}
