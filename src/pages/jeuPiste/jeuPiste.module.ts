import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { jeuPistePage } from './jeuPiste';

@NgModule({
  declarations: [
    jeuPistePage,
  ],
  imports: [
    IonicPageModule.forChild(jeuPistePage),
  ],
})
export class jeuPistePageModule {}