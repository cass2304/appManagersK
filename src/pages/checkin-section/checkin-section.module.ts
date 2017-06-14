import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckinSectionPage } from './checkin-section';

@NgModule({
  declarations: [
    CheckinSectionPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckinSectionPage),
  ],
  exports: [
    CheckinSectionPage
  ]
})
export class CheckinSectionPageModule {}
