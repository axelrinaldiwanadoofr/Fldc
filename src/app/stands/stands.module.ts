import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StandsPage } from './stands.page';

const routes: Routes = [
  {
    path: '',
    component: StandsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: 
  [
    StandsPage
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]  
})
export class StandsPageModule {}
