import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LocalStorageServiceProvider } from '../local-storage-service/local-storage-service'
import urlDashboard from '../../common/comon';
import 'rxjs/add/operator/map';

/*
  Generated class for the ClientsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/




@Injectable()
export class ClientsProvider {  
  data: any = null;
  filters: any = { date: { type: "week", start: "", end: "" }, order: "visits desc", filters: "" }

  constructor(public http: Http, public localStorage: LocalStorageServiceProvider) {
    this.http = http
    
  }

  getVisitedClient() {

    if (this.data)
      return Promise.resolve(this.data);

    return new Promise((resolve, reject) => {
      this.localStorage.getSession(value =>{
          this.http.post(urlDashboard.urlCoreNode + 'dashboard/clients/visit/resume?page=1&range=10', this.filters, { headers: value })
          .map(res => res.json())
          .subscribe(
          data => {
            this.data = data;
            console.log(this.data);
                      
            resolve(this.data);
          }, err => {
            reject(err)
          });
      })
      
                
        


      })    

  }

}
