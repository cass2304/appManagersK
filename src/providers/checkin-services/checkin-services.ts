import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LocalStorageServiceProvider } from '../local-storage-service/local-storage-service';
import urlReports from '../../common/comon';
import 'rxjs/add/operator/map';


@Injectable()
export class CheckinServicesProvider {

  //filters: any = { filters: [{ filter: "status", type: "in", value: ["PENDING"] }], date: { date: "today" } }
  planned: any = null;

  constructor(public http: Http, public localStorage: LocalStorageServiceProvider) {
    this.http = http;
  }

  getCheckinPlanned(filters) {

    if (this.planned)
      return Promise.resolve(this.planned);

    return new Promise((resolve, reject) => {
      this.localStorage.getSession(value => {
        this.http.post(urlReports.reports + '/checkin/planned/?limit=10&page=1&report=planned', filters, { headers: value })
          .map(res => res.json())
          .subscribe(
          data => {
            this.planned = data.data;
            resolve(this.planned);
          }, err => {
            reject(err)
          });
      })

    })


  }


}
