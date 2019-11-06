import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InfoPage } from './info';
import { ModeEmploiPage } from '../mode-emploi/mode-emploi';
import { ItinérairePage } from '../itinéraire/itinéraire';
import { PlanAccesPage } from '../plan-acces/plan-acces';

@NgModule({
  declarations: [
    InfoPage,
    ModeEmploiPage,
    ItinérairePage,
    PlanAccesPage,
  ],
  imports: [
    IonicPageModule.forChild(InfoPage),
  ],
})
export class InfoPageModule {}
