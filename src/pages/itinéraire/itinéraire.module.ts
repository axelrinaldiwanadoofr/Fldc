import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItinérairePage } from './itinéraire';

@NgModule({
  declarations: [
    ItinérairePage,
  ],
  imports: [
    IonicPageModule.forChild(ItinérairePage),
  ],
})
export class ItinérairePageModule {}
