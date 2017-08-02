import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import urlDashboard from '../../common/comon';
import { LocalStorageServiceProvider } from '../local-storage-service/local-storage-service';

import 'rxjs/add/operator/map';

/*
  Generated class for the DashboardProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.

  //http://corev3.kipo.co/api/dashboard/clients/visit tab 1  //{"date":{"type":"week_old"},"filters":[]}

  //http://corev3.kipo.co/api/dashboard/users/active tab 3 //{"date":{"type":"week_old"},"filters":[]}

  //http://corev3.kipo.co/api/dashboard/checkins tab 1 

  //filters {"date":{"type":"week","start":"","end":""},"filters":[]}
*/


@Injectable()
export class DashboardProvider {

  private dataVisit: any
  private dataCheckin: any
  private dataActive: any
  private temFilter: any = {}

  constructor(public http: Http,  public localStorage: LocalStorageServiceProvider) {
    this.http = http;
  }

  loadCounterVisit(Filters) {
    if (this.dataVisit && (this.temFilter !== Filters))
      return Promise.resolve(this.dataVisit);

    return new Promise((resolve, reject) => {
      this.localStorage.getSession(value =>{
        this.http.post(urlDashboard.urlCoreNode + 'dashboard/clients/visit', Filters, { headers: value })
        .map(res => res.json())
        .subscribe(
        data => {
          this.dataVisit = data;
          resolve(this.dataVisit);
        }, err => {
          reject(err)
        }, () => { this.temFilter = Filters });
      })
      
    })
  }

  loadCounterActive(Filters) {    

    if (this.dataActive && (this.temFilter !== Filters))
      return Promise.resolve(this.dataActive);

    return new Promise((resolve, reject) => {
      
      this.localStorage.getSession(value =>{
        this.http.post(urlDashboard.urlCoreNode + 'dashboard/users/active', Filters, { headers: value })
        .map(res => res.json())
        .subscribe(
        data => {
          this.dataActive = data;
          resolve(this.dataActive);
        }, err => {
          reject(err)
        }, () => {
        });
      })      
    })

  }

  loadCounterCheckins(Filters) {    

    if (this.dataCheckin && (this.temFilter !== Filters))
      return Promise.resolve(this.dataCheckin)

    return new Promise((resolve, reject) => {
      
      this.localStorage.getSession(value =>{
        this.http.post(urlDashboard.urlCoreNode + 'dashboard/checkins ', Filters, { headers: value })
        .map(res => res.json())
        .subscribe(
        data => {
          this.dataCheckin = data;
          resolve(this.dataCheckin);
        }, err => {
          reject(err)
        }, () => { });
      })
      
    })

  }

  loadCounterPending(Filters) {    

    if (this.dataCheckin && (this.temFilter !== Filters))
      return Promise.resolve(this.dataCheckin)

    return new Promise((resolve, reject) => {
      //expand[]:client
      //expand[]:category
      //expand[]:device
      //expand[]:place
      this.localStorage.getSession(value =>{
        this.http.get(urlDashboard.urlAppCore + 'checkins/planned/count?date_range='+Filters+'&expand[]=client&expand[]=category&expand[]=device&expand[]=place&status=PENDING',{ headers: value })
        .map(res => res.json())
        .subscribe(
        data => {          
            this.dataCheckin = data;                    
          resolve(this.dataCheckin);
        }, err => {
          reject(err)
        }, () => { });
      })
      
    })

  }

  //http://ws.dev.kipobusiness.com/api/checkins/planned/count?date_range=MONTH&expand%5B%5D=client&expand%5B%5D=category&expand%5B%5D=device&expand%5B%5D=place&status=PENDING
}
