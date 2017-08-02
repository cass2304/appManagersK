import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PendingViewPage } from './pending-view';

@NgModule({
  declarations: [
    PendingViewPage,
  ],
  imports: [
    IonicPageModule.forChild(PendingViewPage),
  ],
  exports: [
    PendingViewPage
  ]
})
export class PendingViewPageModule {}
