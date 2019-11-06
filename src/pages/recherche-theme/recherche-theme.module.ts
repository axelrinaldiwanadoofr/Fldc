import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RechercheThemePage } from './recherche-theme';

@NgModule({
  declarations: [
    RechercheThemePage,
  ],
  imports: [
    IonicPageModule.forChild(RechercheThemePage),
  ],
})
export class RechercheThemePageModule {}
