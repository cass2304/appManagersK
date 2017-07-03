import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificationsViewPage } from './notifications-view';

@NgModule({
  declarations: [
    NotificationsViewPage,
  ],
  imports: [
    IonicPageModule.forChild(NotificationsViewPage),
  ],
  exports: [
    NotificationsViewPage
  ]
})
export class NotificationsViewPageModule {}
