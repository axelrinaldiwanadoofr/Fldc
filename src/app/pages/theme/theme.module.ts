import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ThemePage } from './theme.page';
import { ListeLivreComponentModule } from '../../components/liste-livre/liste-livre.module'
import { ListeRdvComponentModule } from '../../components/liste-rdv/liste-rdv.module' ;
import { ListeExposantComponentModule } from '../../components/liste-exposant/liste-exposant.module' ;

const routes: Routes = [
  {
    path: '',
    component: ThemePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListeLivreComponentModule,
    ListeRdvComponentModule,
    ListeExposantComponentModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ThemePage],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]  
})
export class ThemePageModule {}
