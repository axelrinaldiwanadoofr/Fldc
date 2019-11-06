import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import { UnePersonnePage } from '../../pages/unepersonne/unepersonne' ;

/**
 * Generated class for the PersonnePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-personne',
  templateUrl: 'personne.html',
})
export class PersonnePage {
  public Intervenants: Array<{id:number,nom:string,prenom:string}> ;
  selectedItem: any;
  
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlPrd: RemoteSqlProvider) {
    this.Intervenants=[];
    
    this.selectedItem = navParams.get('lettre');
    this.sqlPrd.select( "SELECT * from personne_18 WHERE fonction like '%auteur%' AND nom LIKE '"+this.selectedItem+"%' order by nom", null, this.Intervenants ) ;
    
    
  }

  Accueil(){
    this.navCtrl.setRoot(HelloIonicPage);
  }

  unePersonne( p )
  {
    this.navCtrl.push( UnePersonnePage, {personne: p}) ;
  }  

}
