import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RechercheLivrePage } from './recherche-livre';

@NgModule({
  declarations: [
    RechercheLivrePage,
  ],
  imports: [
    IonicPageModule.forChild(RechercheLivrePage),
  ],
})
export class RechercheLivrePageModule {}
