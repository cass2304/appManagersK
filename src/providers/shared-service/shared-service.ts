import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class SharedServiceProvider {

  devices: any = [];

  constructor(public http: Http) {
    this.devices = []
  }

  setFillDevices(value) {
    console.log('fill',value);
    this.devices = value;
  }

  getDevices() {
    return this.devices;
  }

}
