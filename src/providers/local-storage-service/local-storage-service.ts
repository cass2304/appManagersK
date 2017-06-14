import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

/*
  Generated class for the LocalStorageServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LocalStorageServiceProvider {  
  constructor(public http: Http, private storage: Storage) {
    this.storage = storage    
  }

  //This returns a promise but we can get away without handling it in this case.
  setSession(value) {   
    this.storage.set('session', value);
  };
  
  getSession(cb) {
    this.storage.get('session').then((name) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', name.token);
      cb (headers)
    });
  };
  
  removeName() {
    this.storage.remove('session').then(() => {
      console.log('name has been removed');
    });
  }
  
  clearKeys() {
    this.storage.clear().then(() => {
      console.log('Keys have been cleared');
    });
  }

}
