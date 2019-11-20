import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EnigmecinqPage } from './enigmecinq.page';

const routes: Routes = [
  {
    path: '',
    component: EnigmecinqPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EnigmecinqPage]
})
export class EnigmecinqPageModule {}
