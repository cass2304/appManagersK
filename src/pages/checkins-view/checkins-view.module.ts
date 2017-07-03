import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CheckinsViewPage } from './checkins-view';

@NgModule({
  declarations: [
    CheckinsViewPage,
  ],
  imports: [
    IonicPageModule.forChild(CheckinsViewPage),
  ],
  exports: [
    CheckinsViewPage
  ]
})
export class CheckinsViewPageModule {}
