import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LocalStorageServiceProvider } from '../local-storage-service/local-storage-service';
import urlDashboard from '../../common/comon';
import 'rxjs/add/operator/map';


@Injectable()
export class ClientsProvider {
  data: any = null;
  visitedMade: any = null;
  usersActivity: any =  null;
  filters_users : any = {date:{type:"week",start:"",end:""},filters:""}

  constructor(
    public http: Http, 
    public localStorage: LocalStorageServiceProvider) {
    this.http = http

  }

  getVisitedClient(filters) {

    if (this.data)
      return Promise.resolve(this.data);

    return new Promise((resolve, reject) => {
      this.localStorage.getSession(value => {
        this.http.post(urlDashboard.urlCoreNode + 'dashboard/clients/visit/resume?page=0&range=10', filters, { headers: value })
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

  getVisitedMade(filters_checkins) {
    if (this.visitedMade)
      return Promise.resolve(this.visitedMade);

    return new Promise((resolve, reject) => {
      this.localStorage.getSession(value => {
        this.http.post(urlDashboard.urlCoreNode + 'dashboard/checkins/details?page=0&range=10', filters_checkins, { headers: value })
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

  activityUser(filters){    
    if (this.usersActivity)
      return Promise.resolve(this.usersActivity);

    return new Promise((resolve, reject) => {
      this.localStorage.getSession(value => {
        this.http.post(urlDashboard.urlCoreNode + 'dashboard/users/lastActivity?page=0&range=10', filters, { headers: value })
          .map(res => res.json())
          .subscribe(
          data => {            
            this.usersActivity = data;
            resolve(this.usersActivity);
          }, err => {
            reject(err)
          });
      })

    })

  }

}
