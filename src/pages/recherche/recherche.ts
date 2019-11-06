import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { IntervenantPage } from '../intervenant/intervenant';
import { HallsPage } from '../halls/halls';
import { RechercheThemePage } from '../recherche-theme/recherche-theme';
import { RechercheRdvPage } from '../recherche-rdv/recherche-rdv';
import { RechercheLivrePage } from '../../pages/recherche-livre/recherche-livre';
import { RechercheExposantPlanPage } from '../../pages/recherche-exposant-plan/recherche-exposant-plan' ;
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql';
import { PlansPage, PlanMarqueur} from '../plans/plans';
import { FrmListeRdvPage } from '../frm-liste-rdv/frm-liste-rdv' ;
import { FavorisPage } from '../favoris/favoris' ;
import { JetonDeConnectionProvider } from '../../providers/jeton-de-connection/jeton-de-connection' ;

/**
 * Generated class for the RecherchePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-recherche',
  templateUrl: 'recherche.html',
})
export class RecherchePage 
{
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public sqlPrd: RemoteSqlProvider,
    public jeton: JetonDeConnectionProvider )
  {         
    //this.jeton.connect( "admin", "config@flc" ) ;
  }

  stand(){
    this.navCtrl.push(HallsPage,null)
  }

  auteurs(){
    this.navCtrl.push(IntervenantPage,null);
  }

  theme(){
    this.navCtrl.push(RechercheThemePage,null);
  }
  rdv(){
    this.navCtrl.push(RechercheRdvPage,null);
  }

  livres()
  {
    this.navCtrl.push(RechercheLivrePage,null);
  }
  
  exposants()
  {
    this.navCtrl.push(RechercheExposantPlanPage,null);
  }

  favoris()
  {
    this.navCtrl.push(FavorisPage,null);
  }
  
  configPlan()
  {
    let m = [] ;
    let $this = this ;

    this.sqlPrd.select( "select id from planzones", null ).then( (data)=>
    {
      data.rows.forEach( (r)=>
      {
        m.push( new PlanMarqueur( r.id, null ) ) ;
      }) ;
      this.navCtrl.push( PlansPage, {marqueurs: m} ) ;
    }) ;
  }

  frmListeRdv()
  {
    this.navCtrl.push(FrmListeRdvPage,null);
  }
}
