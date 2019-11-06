import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { PlansPage, PlanMarqueur } from '../../pages/plans/plans' ;
import { WebSqlProvider } from '../../providers/websql/websql';
import { ToastController } from '@ionic/angular';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import { ExposantPage } from '../exposant/exposant' ;
import { StandListExposantPage } from '../stand-list-exposant/stand-list-exposant' ;
import { FavorisProvider } from '../../providers/favoris/favoris' ;

/**
 * Generated class for the FavorisPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-favoris',
  templateUrl: 'favoris.html',
})

export class FavorisPage implements OnInit
{
  private favoris: Array<{idStand: number, idExposant: number, nomExposant: string}> ;
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public localSql: WebSqlProvider,
    public toastCtrl: ToastController,
    public favorisPrd: FavorisProvider ) 
    {
      this.favoris = [] ;
    }

    ngOnInit()
    {
      this.localSql.select( "select * from favoris order by nomExposant", null, this.favoris ) ;
    }

    onPlan()
    {
      let m = [] ;
      this.favoris.forEach( (f)=>
      {
        if( f.nomExposant ) m.push( new PlanMarqueur( f.idStand, f.nomExposant ) ) ;
        else m.push( new PlanMarqueur( f.idStand, "" ) ) ;
      });
      this.navCtrl.push( PlansPage, {marqueurs: m} ) ;
    }

    onFavorisClick( f )
    {
       if( f.idExposant )
       {
         this.navCtrl.push( ExposantPage, {id: f.idExposant} ) ;
       }
       else 
       {
         this.navCtrl.push( StandListExposantPage, {numStand: f.idStand } ) ;
       }
    }

    onRemoveFavorisClick( f )
    {
      this.favorisPrd.supprime( f.idStand, f.idExposant ) ;
      let i = this.favoris.indexOf( f ) ;
      this.favoris.splice( i, 1 ) ;
    }

    Accueil()
    {
      this.navCtrl.setRoot(HelloIonicPage);
    }
  
}
