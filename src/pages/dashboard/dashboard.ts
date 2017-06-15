import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { ProfileServiceProvider } from "../../providers/profile-service/profile-service";
import { DashboardProvider } from "../../providers/dashboard/dashboard";
import { ClientSectionPage } from "../client-section/client-section";
import { CheckinSectionPage } from "../checkin-section/checkin-section";
import { UserSectionPage } from '../user-section/user-section';

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',

  providers: [ProfileServiceProvider, DashboardProvider]
})

export class Dashboard {

  public people: any = {};
  public counter: any = {};
  dataUser: '';
  filters: any = { date: { type: "week", start: "", end: "" }, filters: "" }
  dates: any = 'day'

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public peopleService: ProfileServiceProvider,
    public dashboardService: DashboardProvider) {

    this.dataUser = this.navParams.get('data').token
    this.loadProfile()
    this.loadData()

  }

  loadProfile() { //get from providers         
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

  }

  actionDashboard(expression) {

    switch (expression) {
      case 'users':
        this.navCtrl.push(UserSectionPage, {
          data: this.dataUser
        });

        //Statements executed when the result of expression matches value1
        break;
      case 'checkins':

        this.navCtrl.push(CheckinSectionPage, {
          data: this.dataUser
        });
        //Statements executed when the result of expression matches value2
        break;
      default:
        //Statements executed when none of the values match the value of the expression
        this.navCtrl.push(ClientSectionPage, {
          data: this.dataUser
        });
    }
    //break;
  }



}
