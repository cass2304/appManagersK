import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import urlServices from '../../common/comon';
import { LocalStorageServiceProvider } from '../local-storage-service/local-storage-service';
import 'rxjs/add/operator/map';

/*
  Generated class for the DevicesServiceProvider provider.

  See https://angulair.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DevicesServiceProvider {

  private data: any;

  constructor(
    public http: Http,
    public localStorage: LocalStorageServiceProvider) {
    this.http = http;
  }

  getDevices(){
    if(this.data)
      return Promise.resolve(this.data)

    return new Promise((resolve, reject) => {
      this.localStorage.getSession(value =>{
        this.http.get(urlServices.urlAppCore+ 'devices?billing=true', { headers: value })
        .map(res => res.json())
        .subscribe(
        data => {          
          this.data = data;
          resolve(this.data);
        }, err => {
          reject(err)
        }, () => {});
      })
      
    })      

}

}
