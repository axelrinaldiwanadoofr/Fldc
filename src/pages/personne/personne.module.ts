import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PersonnePage } from './personne';

@NgModule({
  declarations: [
    PersonnePage
  ],
  imports: [
    IonicPageModule.forChild(PersonnePage),
  ],
})
export class PersonnePageModule {}
