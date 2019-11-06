import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IntervenantPage } from './intervenant';

@NgModule({
  declarations: [
    IntervenantPage,
  ],
  imports: [
    IonicPageModule.forChild(IntervenantPage),
  ],
})
export class IntervenantPageModule {}
