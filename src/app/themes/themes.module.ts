import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ThemesPage } from './themes.page';

const routes: Routes = [
  {
    path: '',
    component: ThemesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ThemesPage
  ],
  entryComponents: [
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]  
})
export class ThemesPageModule {}
