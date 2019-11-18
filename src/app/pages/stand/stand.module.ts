import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { StandPage } from './stand.page';
import { ListeRdvComponentModule } from '../../components/liste-rdv/liste-rdv.module' ;
import { ListeExposantComponentModule } from '../../components/liste-exposant/liste-exposant.module' ;


const routes: Routes = [
  {
    path: '',
    component: StandPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListeRdvComponentModule,
    ListeExposantComponentModule,
    RouterModule.forChild(routes)
  ],
  declarations: [StandPage],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]  
})
export class StandPageModule {}
