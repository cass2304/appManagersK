import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ClientsProvider } from '../../providers/clients/clients'


@Component({
  selector: 'page-client-section',
  templateUrl: 'client-section.html',
  providers: [ClientsProvider]

})


export class ClientSectionPage {
  clients: any = [];
  filters: any = '';
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public ClientsProvider: ClientsProvider) {
      this.filters = navParams.get('filters');
      this.getClients(this.filters);
    
  }  

  getClients(filters){
    this.ClientsProvider.getVisitedClient(this.filters)
    .then(data =>{      
      this.clients = data
    }).catch(error => {
      console.log(error);
      
    })
  }
  
  
}
