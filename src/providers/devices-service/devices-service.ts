import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the DevicesServiceProvider provider.

  See https://angulair.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DevicesServiceProvider {

  constructor(public http: Http) {
    console.log('Hello DevicesServiceProvider Provider');
  }

}
