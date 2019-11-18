import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AuteurPage } from './auteur.page';
import { ListeLivreComponentModule } from '../../components/liste-livre/liste-livre.module'
import { ListeRdvComponentModule } from '../../components/liste-rdv/liste-rdv.module' ;

const routes: Routes = [
  {
    path: '',
    component: AuteurPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListeLivreComponentModule,
    ListeRdvComponentModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AuteurPage],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]  
})
export class AuteurPageModule {}
