import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DevicesServiceProvider } from '../../providers/devices-service/devices-service';


/**
 * Generated class for the SearchUsersPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

var  tempItems = [];

let sharing : any = {}

@IonicPage()
@Component({
  selector: 'page-search-users',
  templateUrl: 'search-users.html',
})
export class SearchUsersPage {

 searchQuery: string = '';
 items: any = [];
 params: any = [];


 providers: [DevicesServiceProvider]


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public devicesService:DevicesServiceProvider
    ) {
      this.initializeItems();
      sharing = navParams.get('shared');
      if(sharing.getDevices().length > 0){
          this.params = sharing.getDevices();
      }
  }

  initializeItems() {
   //let devices = [];
    this.devicesService.getDevices()
    .then( data => {
      /*data.forEach(element => {
        this.items.push(element.name);
      });*/
      this.items = data

    }).catch(error => { console.log(error)});
  }

  getItems(ev) {
    // Reset items back to all of the item

    tempItems.length > 0? this.items = tempItems : tempItems= Object.assign([],this.items);

    // set val to the value of the ev target
    var val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.items = this.items.filter((item) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  itemSelected(item) {
     if (this.params.indexOf(item.device_id) === -1){
         this.params.push(item.device_id);
         sharing.setFillDevices(this.params);
     }else {
         this.params.splice(this.params.indexOf(item.device_id),1);
     }
  }

}
