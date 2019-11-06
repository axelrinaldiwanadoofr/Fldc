import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HallsPage } from './halls';

@NgModule({
  declarations: [
    HallsPage,
  ],
  imports: [
    IonicPageModule.forChild(HallsPage),
  ],
})
export class HallsPageModule {}
