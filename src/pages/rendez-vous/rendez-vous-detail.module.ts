import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RendezVousPage } from './rendez-vous';

@NgModule({
  declarations: [
    RendezVousPage,
  ],
  imports: [
    IonicPageModule.forChild(RendezVousPage),
  ],
})
export class RendezVousPageModule {}
