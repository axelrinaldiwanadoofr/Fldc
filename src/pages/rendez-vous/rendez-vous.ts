import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { RendezVousDetailPage } from '../rendez-vous/rendez-vous-detail';
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
/**
 * Generated class for the RendezVousPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-rendez-vous',
  templateUrl: 'rendez-vous.html',
})
export class RendezVousPage {
  selectedItem: any;
  public rdvs:Array<{
    id:number,
    date:string,
    heure:string,
    duree:string,
    jeunesseON:boolean,
    titre:string,
    inscriptionON:boolean,
    nbPlaceMax:number,
    numStand:number,
    idTrancheAge:number,
    resume:string,
    typeRDV:number
  }>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlPrd:RemoteSqlProvider) {
this.rdvs=[];
    this.selectedItem = navParams.get('item');  
    this.sqlPrd.select("SELECT id,date,heure,duree,jeunesseON,titre,inscriptionON,nbPLaceMax,numStand,idTrancheAge,resume,typeRDV FROM `RDV` WHERE numStand="+this.selectedItem.num+"",null,this.rdvs);
    
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad RendezVousPage');
  }

detail(rdv){
  this.navCtrl.push(RendezVousDetailPage,{item:rdv});
}
Accueil(){
  this.navCtrl.setRoot(HelloIonicPage);
}
}
