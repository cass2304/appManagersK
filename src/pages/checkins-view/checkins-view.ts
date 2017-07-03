import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClientsProvider } from '../../providers/clients/clients';
import { CheckinServicesProvider } from '../../providers/checkin-services/checkin-services'

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
  providers: [ClientsProvider, CheckinServicesProvider]
})
export class CheckinsViewPage {
  checkinsDone: any = [];
  checkinsPending: any = [];
  dates: any = 'day'
  filters: any = { filters: [{ filter: "status", type: "in", value: ["PENDING"] }], date: { date: "today" } };
  filters_checkins: any = { date: { type: "week", start: "", end: "" }, order: "time_zone desc", filters: "" }
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public chekins: ClientsProvider,
    public pending: CheckinServicesProvider) {
  }

  ionViewDidLoad() {
    this.loadVisitedMades();
    this.loadPending();
  }

  loadVisitedMades() {
    this.filters_checkins.date.type = this.dates;
    this.chekins.getVisitedMade(this.filters_checkins)
      .then(data => {
        this.checkinsDone = data
      }).catch(error => {
        console.log(error);
      })
  }

  loadPending() {

    this.filters.date.date = this.dates;

    this.pending.getCheckinPlanned(this.filters)
      .then(data => {
        this.checkinsPending = data;
      }).catch(error => {
        console.log(error);

      })
  }

  reload() {
    this.loadPending();
    this.loadVisitedMades()
  }

}
