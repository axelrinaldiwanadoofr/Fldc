import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ExposantsPage } from './exposants.page';
import { ListeExposantComponentModule } from '../components/liste-exposant/liste-exposant.module' ;

const routes: Routes = [
  {
    path: '',
    component: ExposantsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListeExposantComponentModule, 
    RouterModule.forChild(routes)
  ],
  declarations: [ExposantsPage],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]  
})
export class ExposantsPageModule {}
