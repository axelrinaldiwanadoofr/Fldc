import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ExposantPage } from './exposant.page';
import { ListeLivreComponentModule } from '../../components/liste-livre/liste-livre.module'


const routes: Routes = [
  {
    path: '',
    component: ExposantPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListeLivreComponentModule,
    RouterModule.forChild(routes)
  ],
  declarations: 
  [
    ExposantPage
  ],
  entryComponents: [
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]  
})
export class ExposantPageModule {}
