import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpModule } from '@angular/http';
import { OneSignal } from '@ionic-native/onesignal';

import { HelloIonicPage } from '../pages/hello-ionic/hello-ionic';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { ListPage } from '../pages/list/list';
import { Dashboard } from '../pages/dashboard/dashboard';
import { ClientSectionPage } from '../pages/client-section/client-section';
import { CheckinSectionPage } from '../pages/checkin-section/checkin-section';
import { UserSectionPage } from '../pages/user-section/user-section'
import { CheckinsViewPage } from '../pages/checkins-view/checkins-view';
import { NotificationsViewPage } from '../pages/notifications-view/notifications-view';
import { PendingViewPage } from '../pages/pending-view/pending-view';
import { SearchUsersPage } from '../pages/search-users/search-users';

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
import { CheckinServicesProvider } from '../providers/checkin-services/checkin-services';
import { SharedServiceProvider } from '../providers/shared-service/shared-service';




@NgModule({
  declarations: [
    MyApp,
    HelloIonicPage,
    ItemDetailsPage,
    ListPage,
    Dashboard,
    ClientSectionPage,
    CheckinSectionPage,
    UserSectionPage,
    CheckinsViewPage,
    NotificationsViewPage,
    PendingViewPage,
    SearchUsersPage
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
    ClientSectionPage,
    CheckinSectionPage,
    UserSectionPage,
    CheckinsViewPage,
    NotificationsViewPage,
    PendingViewPage,
    SearchUsersPage
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
    ClientsProvider,
    CheckinServicesProvider,
    OneSignal,
    SharedServiceProvider
  ]
})
export class AppModule {}
