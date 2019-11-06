import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql';
import { RendezVousPage } from '../rendez-vous/rendez-vous';

/**
 * Generated class for the AjoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-ajout',
  templateUrl: 'ajout.html',
})
export class AjoutPage {
  selectedItem: any;
  public rdv: Array<{
    id: number,
    titre : string,
    heure:string,
    date:string,
    resume:string,
    duree:string,
    jeunesseON:boolean,
    inscriptionOn:boolean,
    nbPlaceMax:number,
    numStand:number,
    idTrancheAge:number,
  }> ;
  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlPrd: RemoteSqlProvider ) {
    this.rdv=[];
    this.selectedItem = navParams.get('item');
    this.sqlPrd.select( "SELECT * FROM `RDV` WHERE numStand="+this.selectedItem.num+"", null, this.rdv ) ;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AjoutPage');
  }
  goto(rdvs){
    this.navCtrl.push(RendezVousPage,{item:rdvs});
  }
  
}
