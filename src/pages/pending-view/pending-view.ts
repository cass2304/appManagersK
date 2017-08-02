import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CheckinServicesProvider } from '../../providers/checkin-services/checkin-services'

/**
 * Generated class for the PendingViewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pending-view',
  templateUrl: 'pending-view.html',
  providers: [CheckinServicesProvider]
})
export class PendingViewPage {

checkinsPending: any = [];
filters : any = '';
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public pending: CheckinServicesProvider) {
      this.filters = navParams.get('filters');

      this.loadPending();
  }  

  loadPending() {    
    this.pending.getCheckinPlanned(this.filters)
      .then(data => {        
        this.checkinsPending = data;
      }).catch(error => {
        console.log(error);

      })
  }
  
}
