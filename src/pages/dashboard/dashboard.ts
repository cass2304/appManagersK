import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { ProfileServiceProvider } from "../../providers/profile-service/profile-service";
import { DashboardProvider } from "../../providers/dashboard/dashboard";

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',

  providers: [ProfileServiceProvider, DashboardProvider]
})

export class Dashboard {

  public people: any = {};
  public counter: any = {};
  dataUser: '';
  filters : any = { date :{type:"week",start:"",end:""},filters:""}

  constructor(public navCtrl: NavController, public navParams: NavParams, 
  public peopleService: ProfileServiceProvider, public dashboardService: DashboardProvider) {
    this.dataUser = navParams.get('data'); //pasign paraments
    this.loadProfile()
    this.loadCounterActive()
    this.loadCouterVisiti();
    this.loadCounterCheckins();
  }

  loadProfile() { //get from providers
    this.peopleService.loadProfile()
      .then(data => {
        this.people = data;
        console.log(this.people)
      }).catch( error => {
        console.log(error);
      });
  }

 loadCouterVisiti(){
    this.dashboardService.loadCounterVisit(this.filters)
    .then(visit => {      
      this.counter.visit = visit.VISIT_CLIENTS;
    }).catch(error => {
      console.log(error)
    })
  }

  loadCounterCheckins(){
    console.log(this.filters);
    this.dashboardService.loadCounterCheckins(this.filters)
    .then(checkins => {      
      this.counter.checkins = checkins.total;      
    }).catch(error => {
      console.log(error);
    })
  }

  loadCounterActive(){
    this.dashboardService.loadCounterActive(this.filters)
    .then(users => {      
      this.counter.users = users.active_users;      
    }).catch(error => {
      console.log(error);
    })
  }

}
