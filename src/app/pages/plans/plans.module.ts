import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PlansPage } from './plans.page';
import { PlanComponentModule } from '../../components/plan/plan.module' ;


const routes: Routes = [
  {
    path: '',
    component: PlansPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanComponentModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    PlansPage
  ],
  entryComponents: [
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]  
})
export class PlansPageModule {}
