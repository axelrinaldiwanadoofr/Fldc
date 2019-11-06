import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { RecherchePage} from '../recherche/recherche';
import { PlansPage} from '../plans/plans';
import { lyceePage} from '../lycee/lycee';
import { RestaurantsPage} from '../restaurants/restaurants';
import { PresentationPage} from '../presentation/presentation';
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql';
import { jeuPistePage } from '../jeuPiste/jeuPiste';
@Component({
  selector: 'page-hello-ionic',
  templateUrl: 'hello-ionic.html',
  
})


export class HelloIonicPage {
  public rdv : Array<{titre : string,heure : string,numStand: number, libelle : string, date : string}>
  datesamedi : Date;
  datedimanche : Date;
  public index : number;
  public vict : boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlPrd: RemoteSqlProvider) {    
  this.rdv = [];
    
    this.sqlPrd.select( "select titre,heure,idStand, libelle from rdv_18,trancheage_18 where rdv_18.idTrancheAge=trancheage_18.id AND heure > CURRENT_TIME AND datebis = CURRENT_DATE order by heure ASC limit 3", null, this.rdv );
  
    this.index = 0;
    this.vict = false;
    //Sérialisation 
    let str = JSON.stringify(this.index);
    let bool = JSON.stringify(this.vict);
    // Initialisation du localstorage
    // index pour l'énigme
    localStorage.setItem("index", str);
    // victoire du jeu de piste
    localStorage.setItem("victory",bool);

}
  recherche(){
    this.navCtrl.push(RecherchePage,null);
  }
  plan(){
    this.navCtrl.push(PlansPage,null);
  }
  restaurants(){
    this.navCtrl.push(RestaurantsPage,null);
  }
  presentation(){
    this.navCtrl.push(PresentationPage,null);
  }
  lycee(){
    this.navCtrl.push(lyceePage,null);
  }
  jeuPiste(){
    this.navCtrl.push(jeuPistePage,null);
  }

  

}


