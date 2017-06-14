import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LocalStorageServiceProvider } from '../local-storage-service/local-storage-service';
import urlApp from '../../common/comon';

import 'rxjs/add/operator/map';


/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/


@Injectable()
export class AuthProvider {

  data: any = null;
  user: any = {};

  providers: [LocalStorageServiceProvider]

  constructor(public http: Http, public localStorage:LocalStorageServiceProvider) {
    this.http = http
    this.localStorage = localStorage
     
  }
  
  login(credentials) {

    this.user.username = credentials.username;
    this.user.password = credentials.password;
    this.user.key = urlApp.key;
    this.user.source = urlApp.source;
    

    if (this.data)
      return Promise.resolve(this.data);

    return new Promise((resolve,reject) => {      
      this.http.post(urlApp.urlAppCore + 'auth', this.user)
        .map(res => res.json())
        .subscribe(
        data => {          
          this.data = data;
          this.localStorage.setSession(this.data);
          resolve(this.data);
        }, err => {  
          console.log(err);
                  
          reject(err)
        });
    })
  }

}


