import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ClientsProvider } from '../../providers/clients/clients'


@Component({
  selector: 'page-client-section',
  templateUrl: 'client-section.html',
  providers: [ClientsProvider]

})


export class ClientSectionPage {
  clients: any = []
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public ClientsProvider: ClientsProvider) {   
  this.getClients();
    
  }  

  getClients(){
    this.ClientsProvider.getVisitedClient()
    .then(data =>{      
      this.clients = data
    }).catch(error => {
      console.log(error);
      
    })
  }
  
  
}
