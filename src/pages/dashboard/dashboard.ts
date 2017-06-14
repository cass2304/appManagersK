import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { ProfileServiceProvider } from "../../providers/profile-service/profile-service";
import { DashboardProvider } from "../../providers/dashboard/dashboard";
import { ClientSectionPage } from "../client-section/client-section";

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
  dates : any = 'week'

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public peopleService: ProfileServiceProvider, 
    public dashboardService: DashboardProvider){ 

    this.dataUser = this.navParams.get('data').token        
    this.loadProfile()
    this.loadData()              
    
}
   
   loadProfile() { //get from providers
     console.log(this.dataUser);
     
    this.peopleService.loadProfile(this.dataUser)
      .then(data => {
        this.people = data;        
      }).catch( error => {
        console.log(error);
      });
  }

  loadData(){  

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

  actionClient(){

    this.navCtrl.push(ClientSectionPage, {          
          data: this.dataUser                            
        });
  }
  
}
