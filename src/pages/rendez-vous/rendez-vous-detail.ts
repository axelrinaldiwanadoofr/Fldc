import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql';

/**
 * Generated class for the RendezVousPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-rendez-vous-detail',
  templateUrl: 'rendez-vous-detail.html',
})
export class RendezVousDetailPage {
  detail: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlPrd:RemoteSqlProvider) {
this.detail=[];
    this.detail = navParams.get('item');  
    //this.sqlPrd.select("SELECT id,date,duree,jeunesseON,titre,inscriptionON,nbPLaceMax,numStand,idTrancheAge,resume,typeRDV FROM `RDV` WHERE id="+this.selectedItem.id+"",null,this.detail);
    
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad RendezVousDetailPage');
  }

  Accueil(){
    this.navCtrl.setRoot(HelloIonicPage);
  }
}
