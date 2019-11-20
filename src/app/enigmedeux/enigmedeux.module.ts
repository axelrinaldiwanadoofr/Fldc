import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { EnigmedeuxPage } from './enigmedeux.page';

const routes: Routes = [
  {
    path: '',
    component: EnigmedeuxPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EnigmedeuxPage]
})
export class EnigmedeuxPageModule {}
