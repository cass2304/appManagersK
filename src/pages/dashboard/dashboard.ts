import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { ProfileServiceProvider } from "../../providers/profile-service/profile-service";
import { DashboardProvider } from '../../providers/dashboard/dashboard';
import { ClientSectionPage } from '../client-section/client-section';
import { CheckinSectionPage } from '../checkin-section/checkin-section';
import { UserSectionPage } from '../user-section/user-section';
import { LocalStorageServiceProvider } from '../../providers/local-storage-service/local-storage-service'
import { PendingViewPage } from '../pending-view/pending-view';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',

  providers: [ProfileServiceProvider, DashboardProvider, LocalStorageServiceProvider]
})

export class Dashboard {

  public people: any = {};
  public counter: any = {};
  dataUser: '';
  filters: any = { date: { type: "", start: "", end: "" }, filters: "" }
  //filters: any = { date: { type: "week", start: "", end: "" }, order: "visits desc", filters: "" }
  dates: any = 'day'

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public peopleService: ProfileServiceProvider,
    public dashboardService: DashboardProvider,
    public localStorage: LocalStorageServiceProvider,
    public alerCtrl: AlertController) {


    if (this.navParams.get('data') !== undefined) {
      this.dataUser = this.navParams.get('data').token;
    }
    this.loadProfile()
    this.loadData()
  }

  doAlert() {
    let alert = this.alerCtrl.create({
      //title: 'wrong access',
      message: 'No data',
      buttons: ['Ok']
    });
    alert.present()
  }

  loadProfile() { //get from providers  
    
    if (!this.dataUser) {
      this.localStorage.getToken(token => {
        this.dataUser = token;
      })
    }
    this.peopleService.loadProfile(this.dataUser)
      .then(data => {
        this.people = data;
      }).catch(error => {
        console.log(error);
      });
  }

  loadData() {

    this.filters.date.type = this.dates;
    //button 1    
    this.dashboardService.loadCounterVisit(this.filters)
      .then(visit => {
        this.counter.visit = visit.VISIT_CLIENTS;
      }).catch(error => {
        console.log(error)
      })
    //button 2
    this.dashboardService.loadCounterActive(this.filters)
      .then(users => {
        this.counter.users = users.active_users;
      }).catch(error => {
        console.log(error);
      })
    //button 3
    this.dashboardService.loadCounterCheckins(this.filters)
      .then(checkins => {
        this.counter.checkins = checkins.total;
      }).catch(error => {
        console.log(error);
      })
      // button 4
      this.dashboardService.loadCounterPending(this.dates)
      .then(pending => {        
        if(!pending.count){
          this.counter.pending = pending.checkin_planned_done;
        }else{
          this.counter.pending = pending.count;
        }                
      }).catch(error => {
        console.log(error);
      })

  }

  actionDashboard(expression) {    
    switch (expression) {
      case 'users':  // Active users
        if(this.counter.users === 0){
          this.doAlert()
          return false
        }
        delete this.filters.order
        this.navCtrl.push(UserSectionPage, {          
          filters : this.filters
        });
        
        break;
      case 'checkins': // visites made
        if(this.counter.checkins === 0){
          this.doAlert()
          return false
        }
        this.filters.order = "time_zone desc";
        this.navCtrl.push(CheckinSectionPage, {
          filters : this.filters
        });

        break;
      
      case 'pending': // visits pending 
      if(this.dates === 'day'){
        this.dates = 'today';
      }
      if(this.counter.pending === 0){
          this.doAlert()
          return false
        }

      this.filters = { filters: [{ filter: "status", type: "in", value: ["PENDING"] }], date: { date: this.dates} };
        this.navCtrl.push(PendingViewPage, {
          filters : this.filters
        });

        break;
      default:
        if(this.counter.visit === 0){
          this.doAlert()
          return false
        }
        this.filters.order = "visits desc"; // visited client
        this.navCtrl.push(ClientSectionPage, {
          filters : this.filters
        });
    }
    //break;
  }

}
