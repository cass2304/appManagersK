import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LocalStorageServiceProvider } from '../local-storage-service/local-storage-service';

import 'rxjs/add/operator/map';


/*
  Generated class for the AuthProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

let urlServices = 'https://ws.kipobusiness.com/api/auth';

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
    this.user.key = '6a49d9596e66a381b340949927081056';
    this.user.source = 'KipoApp';
    

    if (this.data)
      return Promise.resolve(this.data);

    return new Promise((resolve,reject) => {      
      /*let headers = new Headers();
      headers.append('Content-Type', 'application/json');*/
      
      this.http.post(urlServices, this.user)
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


