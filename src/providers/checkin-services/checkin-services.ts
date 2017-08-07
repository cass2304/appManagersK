import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { LocalStorageServiceProvider } from '../local-storage-service/local-storage-service';
import { urlAppCore }  from '../../common/comon';
import 'rxjs/add/operator/map';


@Injectable()
export class CheckinServicesProvider {

  //filters: any = { filters: [{ filter: "status", type: "in", value: ["PENDING"] }], date: { date: "today" } }
  planned: any = null;

  constructor(public http: Http, public localStorage: LocalStorageServiceProvider) {
    this.http = http;
  }

  getCheckinPlanned(filters) {
    let devices = '';
    if (this.planned)
      return Promise.resolve(this.planned);

    if(filters.devices)
      devices = filters.devices;

    return new Promise((resolve, reject) => {
      this.localStorage.getSession(value => {
        this.http.get(urlAppCore + 'checkins/planned?date_range='+filters.date.date+'&expand[]=client&expand[]=category&expand[]=device&expand[]=place&status=PENDING'+devices,
            { headers: value })
          .map(res => res.json())
          .subscribe(
          data => {            
            this.planned = data;
            resolve(this.planned);
          }, err => {
            reject(err)
          }, () => { this.planned =null });
      })

    })
  }

}
