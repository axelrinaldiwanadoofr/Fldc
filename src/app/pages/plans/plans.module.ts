import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { PlansPage } from './plans.page';
import { PlanComponent } from '../../components/plan/plan.component' ;

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
    RouterModule.forChild(routes)
  ],
  declarations: [
    PlansPage,
    PlanComponent
  ],
  entryComponents: [
    PlanComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]  
})
export class PlansPageModule {}
