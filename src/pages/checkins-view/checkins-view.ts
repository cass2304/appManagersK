import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClientsProvider } from '../../providers/clients/clients';
import { CheckinServicesProvider } from '../../providers/checkin-services/checkin-services';
import { SearchUsersPage } from '../../pages/search-users/search-users';
import { SharedServiceProvider } from '../../providers/shared-service/shared-service';

/**
 * Generated class for the CheckinsViewPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-checkins-view',
  templateUrl: 'checkins-view.html',
  providers: [ClientsProvider, CheckinServicesProvider,SharedServiceProvider]
})


export class CheckinsViewPage {

  checkinsDone: any = [];
  checkinsPending: any = [];
  dates: any = 'day'
  filters: any = { filters: [{ filter: "status", type: "in", value: ["PENDING"] }], date: { date: this.dates } };
  filters_checkins: any = { date: { type: "week", start: "", end: "" }, order: "time_zone desc", filters: [] }
  shared : any = {}
  devices : any = []

   constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public chekins: ClientsProvider,
    public pending: CheckinServicesProvider,
    public SharedServiceProvider : SharedServiceProvider

   ) {
     this.shared = this.SharedServiceProvider;
     //console.log(this.navBar.backButtonClick(null))
   }
  ionViewDidLoad() {
    this.loadVisitedMades();
    this.loadPending();
  }

  ionViewDidEnter(){
    if(this.shared.getDevices().length > 0){
      this.devices = this.shared.getDevices();
      this.loadVisitedMades();
      this.loadPending();
    }
  }

  loadVisitedMades() {
    if(this.devices && this.devices.length > 0){
      this.filters_checkins.filters.push({name:'device_id', values:this.devices});
    }

    this.filters_checkins.date.type = this.dates;
    console.log(this.filters_checkins,'filters');

    this.chekins.getVisitedMade(this.filters_checkins)
      .then(data => {
        this.checkinsDone = data
      }).catch(error => {
        console.log(error);
      })
  }

  loadPending() {

    this.dates === 'day' ? this.filters.date.date = 'today':this.filters.date.date = this.dates;
      
    this.pending.getCheckinPlanned(this.filters)
      .then(data => {
        this.checkinsPending = data;
      }).catch(error => {
        console.log(error);

      })
  }

  goToUSersPage(){
    this.navCtrl.push(SearchUsersPage, {
          shared : this.shared
        });
  }

  reload() {
    this.loadPending();
    this.loadVisitedMades()
  }

}
