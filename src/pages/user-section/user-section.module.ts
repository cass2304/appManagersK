import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserSectionPage } from './user-section';

@NgModule({
  declarations: [
    UserSectionPage,
  ],
  imports: [
    IonicPageModule.forChild(UserSectionPage),
  ],
  exports: [
    UserSectionPage
  ]
})
export class UserSectionPageModule {}
