import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import urlApp from '../../common/comon';
import 'rxjs/add/operator/map';

/*
  Generated class for the ProfileServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/


@Injectable()
export class ProfileServiceProvider {

  profile: any = null;

  constructor(public http: Http) {
    this.http = http    
  }

  loadProfile(value) {    

    if (this.profile)
      return Promise.resolve(this.profile)

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', value);
      
      this.http.get(urlApp.urlAppCore + 'profile', { headers: headers })
        .map(res => res.json())
        .subscribe(data => {
          this.profile = data
          resolve(this.profile)
        }, err => {
          reject(err)
        })
    });
  }
}

