import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ListeLivreComponent } from './liste-livre.component' ;

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  exports:[
    ListeLivreComponent
  ],
  declarations: [
    ListeLivreComponent
    ],
  entryComponents: [
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]  
})
export class ListeLivreComponentModule {}
