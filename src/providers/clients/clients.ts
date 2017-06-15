import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LocalStorageServiceProvider } from '../local-storage-service/local-storage-service'
import urlDashboard from '../../common/comon';
import 'rxjs/add/operator/map';

/*
  Generated class for the ClientsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/




@Injectable()
export class ClientsProvider {
  data: any = null;
  visitedMade: any = null;
  usersActivity: any =  null;
  filters: any = { date: { type: "week", start: "", end: "" }, order: "visits desc", filters: "" }
  filters_checkins: any = {date:{type:"week",start:"",end:""},order:"time_zone desc",filters:""}
  filters_users : any = {date:{type:"week",start:"",end:""},filters:""}

  constructor(public http: Http, public localStorage: LocalStorageServiceProvider) {
    this.http = http

  }

  getVisitedClient() {

    if (this.data)
      return Promise.resolve(this.data);

    return new Promise((resolve, reject) => {
      this.localStorage.getSession(value => {
        this.http.post(urlDashboard.urlCoreNode + 'dashboard/clients/visit/resume?page=1&range=10', this.filters, { headers: value })
          .map(res => res.json())
          .subscribe(
          data => {
            this.data = data;
            resolve(this.data);
          }, err => {
            reject(err)
          });
      })

    })

  }

  getVisitedMade() {
    if (this.visitedMade)
      return Promise.resolve(this.visitedMade);

    return new Promise((resolve, reject) => {
      this.localStorage.getSession(value => {
        this.http.post(urlDashboard.urlCoreNode + 'dashboard/checkins/details?page=1&range=10', this.filters_checkins, { headers: value })
          .map(res => res.json())
          .subscribe(
          data => {
            this.data = data;
            resolve(this.data);
          }, err => {
            reject(err)
          });
      })

    })
  }

  activityUser(){

    if (this.usersActivity)
      return Promise.resolve(this.usersActivity);

    return new Promise((resolve, reject) => {
      this.localStorage.getSession(value => {
        this.http.post(urlDashboard.urlCoreNode + 'dashboard/users/lastActivity?page=1&range=5', this.filters_users, { headers: value })
          .map(res => res.json())
          .subscribe(
          data => {
            console.log(data)
            this.usersActivity = data;
            resolve(this.usersActivity);
          }, err => {
            reject(err)
          });
      })

    })

  }

}
