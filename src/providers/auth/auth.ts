import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
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

  constructor(public http: Http, private storage: Storage) {
    this.http = http
    this.storage = storage      
  }
  
  login(credentials) {

    this.user.username = credentials.username;
    this.user.password = credentials.password;
    this.user.key = '6a49d9596e66a381b340949927081056';
    this.user.source = 'KipoApp';

    if (this.data)
      return Promise.resolve(this.data);

    return new Promise((resolve,reject) => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post(urlServices, this.user, { headers: headers })
        .map(res => res.json())
        .subscribe(
        data => {
          this.storage.set('session', data);
          this.data = data;
          resolve(this.data);
        }, err => {          
          reject(err)
        });
    })
  }

}


