import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LivrePage } from './livre';

@NgModule({
  declarations: [
    LivrePage,
  ],
  imports: [
    IonicPageModule.forChild(LivrePage),
  ],
})
export class LivrePageModule {}
