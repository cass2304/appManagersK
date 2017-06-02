import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { PeopleServiceProvider } from "../../providers/people-service/people-service";


@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',

  providers: [PeopleServiceProvider]
})

export class Dashboard {

  public people: any;
  dataUser: '';

  constructor(public navCtrl: NavController, public navParams: NavParams, public peopleService: PeopleServiceProvider) {
    this.dataUser = navParams.get('data'); //pasign paraments
    this.loadPeople();
  }

  loadPeople() { //get from providers
    this.peopleService.load()
      .then(data => {
        this.people = data;
      });
  }

}
