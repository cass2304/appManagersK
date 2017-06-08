import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the ProfileServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
let urlServices = 'https://ws.kipobusiness.com/api/profile';
let token = 'Mjc1NzIwN2JiMTU1YTAwYjU3ZjUyZDRmNzUyYjU4MWFkOGEwYjUzOGVhODk2OGRkNDc1MzkxNmYwZDY2NTA2ZXw2YTQ5ZDk1OTZlNjZhMzgxYjM0MDk0OTkyNzA4MTA1NnxuaW5qYUBraXBvLmNv';

@Injectable()
export class ProfileServiceProvider {

  profile: any = null;

  constructor(public http: Http) {
    this.http = http
  }

  loadProfile() {
    if (this.profile)
      return Promise.resolve(this.profile)

    return new Promise((resolve, reject) => {

      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', token);

      this.http.get(urlServices, { headers: headers })
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

