import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UnePersonnePage } from './unepersonne';

@NgModule({
  declarations: [
    UnePersonnePage,
  ],
  imports: [
    IonicPageModule.forChild(UnePersonnePage),
  ],
})
export class UnePersonnePageModule {}
