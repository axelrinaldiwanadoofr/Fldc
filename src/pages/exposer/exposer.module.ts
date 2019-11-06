import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExposerPage } from './exposer';

@NgModule({
  declarations: [
    ExposerPage,
  ],
  imports: [
    IonicPageModule.forChild(ExposerPage),
  ],
})
export class ExposerPageModule {}
