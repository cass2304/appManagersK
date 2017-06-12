import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the PeopleServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

let urlServices = 'https://ws.kipobusiness.com/api/devices?billing=true';
let token = '';

@Injectable()
export class PeopleServiceProvider {

  data: any = null;

  constructor(public http: Http) {
    this.http = http;
    

  }

  load() {
    if (this.data) {
      // already loaded data
      return Promise.resolve(this.data);
    }
      

    // don't have the data yet
    return new Promise(resolve => {
      
      let headers = new Headers();
          headers.append('Content-Type', 'application/json');
          headers.append('Authorization', token);
      
      this.http.get(urlServices,{ headers: headers })
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          console.log(this.data);
          resolve(this.data);
        });
    });
  }

}
