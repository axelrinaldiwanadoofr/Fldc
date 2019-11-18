import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';
import { ListeRdvComponentModule } from '../components/liste-rdv/liste-rdv.module' ;

import { RdvPage } from './rdv.page';

const routes: Routes = [
  {
    path: '',
    component: RdvPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListeRdvComponentModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RdvPage],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]  
})
export class RdvPageModule {}
