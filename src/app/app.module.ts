import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { RemoteSqlProvider } from '../providers/remotesql/remotesql' ;
import { WebSqlProvider } from '../providers/websql/websql';
import { FavorisProvider } from '../providers/favoris/favoris';

import { PlanComponent } from '../app/components/plan/plan.component' ;


@NgModule({
  declarations: [
    AppComponent,
    PlanComponent
  ],
  entryComponents: [
    PlanComponent
  ],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    RemoteSqlProvider,
    WebSqlProvider,
    FavorisProvider
  ],
  bootstrap: [
    AppComponent
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]  
})

export class AppModule 
{
  constructor()
  {
    // Specifie l'URL pour l'accès à la base de donnée 
    RemoteSqlProvider.setWebSqlApiUrl( "http://fldc.fr/php" ) ;
    
    // Specifie le nom de la base de donnée à consulter
    RemoteSqlProvider.setWebDbNameAndId( "fldc_bd", 1 ) ;

    WebSqlProvider.setWebSql( "FLC", "1.0", "Festival du livre", 1000*1024, (prd)=>
    {
      prd.createTable( "favoris", {idStand: "text", idExposant: "text", nomExposant: "text"}) ;
    });
  }
}
