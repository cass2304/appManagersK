import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';

import {Inject} from '@angular/core';
import {Platform} from 'ionic-angular'


import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { Dashboard } from '../pages/dashboard/dashboard';
import { ClientSectionPage } from '../pages/client-section/client-section';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DevicesServiceProvider } from '../providers/devices-service/devices-service';
import { PeopleServiceProvider } from '../providers/people-service/people-service';
import { AuthProvider } from '../providers/auth/auth';
import { ProfileServiceProvider } from '../providers/profile-service/profile-service';
import { DashboardProvider } from '../providers/dashboard/dashboard';
import { IonicStorageModule } from '@ionic/storage';
import { LocalStorageServiceProvider } from '../providers/local-storage-service/local-storage-service';
import { ClientsProvider } from '../providers/clients/clients';


@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    Dashboard,
    ClientSectionPage  
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    Dashboard,
    ClientSectionPage  
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DevicesServiceProvider,
    PeopleServiceProvider,
    AuthProvider,
    ProfileServiceProvider,
    DashboardProvider,
    LocalStorageServiceProvider,
    ClientsProvider
    
  ]
})
export class AppModule {}
