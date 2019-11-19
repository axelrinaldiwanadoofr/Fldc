import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PlanComponent } from './plan.component' ;

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports:[
    PlanComponent
  ],
  declarations: [
    PlanComponent
    ],
  entryComponents: [
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]  
})
export class PlanComponentModule {}
