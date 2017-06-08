import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

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

let urlServices = 'http://corev3.kipo.co/api/dashboard/';
let token = 'Mjc1NzIwN2JiMTU1YTAwYjU3ZjUyZDRmNzUyYjU4MWFkOGEwYjUzOGVhODk2OGRkNDc1MzkxNmYwZDY2NTA2ZXw2YTQ5ZDk1OTZlNjZhMzgxYjM0MDk0OTkyNzA4MTA1NnxuaW5qYUBraXBvLmNv';

let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', token);

@Injectable()
export class DashboardProvider {

  private dataVisit: any 
  private dataCheckin: any 
  private dataActive: any

  constructor(public http: Http) {
    this.http = http;
  }

  loadCounterVisit(Filters) {

    if (this.dataVisit)
      return Promise.resolve(this.dataVisit);

    return new Promise((resolve, reject) => {      

      this.http.post(urlServices + 'clients/visit', Filters, { headers: headers })
        .map(res => res.json())
        .subscribe(
        data => {
          this.dataVisit = data;
          resolve(this.dataVisit);
        }, err => {
          reject(err)
        });
    })
  }

  loadCounterActive(Filters) {
    if (this.dataActive)
      return Promise.resolve(this.dataActive);

    return new Promise((resolve, reject) => {

      this.http.post(urlServices + 'users/active', Filters, { headers: headers })
        .map(res => res.json())
        .subscribe(
        data => {
          this.dataActive = data;
          resolve(this.dataActive);
        }, err => {
          reject(err)
        });
    })

  }

  loadCounterCheckins(Filters) {    
    if (this.dataCheckin){
      
      return Promise.resolve(this.dataCheckin);
    }
      
    return new Promise((resolve, reject) => {
     
      this.http.post(urlServices + 'checkins ', Filters, { headers: headers })
        .map(res => res.json())
        .subscribe(
        data => {
          this.dataCheckin = data;          
          resolve(this.dataCheckin);
        }, err => {          
          reject(err)
        });
    })

  }

}
