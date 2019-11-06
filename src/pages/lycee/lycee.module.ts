import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { lyceePage } from './lycee';

@NgModule({
  declarations: [
    lyceePage,
  ],
  imports: [
    IonicPageModule.forChild(lyceePage),
  ],
})
export class lyceePageModule {}
