import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
/**
 * Generated class for the ExposerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-exposer',
  templateUrl: 'exposer.html',
})
export class ExposerPage {

selectedItem :any;
public Stand: Array<{num: number}> ;


  /**
   * Constructeur de la class ExposerPage.
   * @param navCtrl 
   * @param navParams 
   * @param sqlPrd 
   */
  constructor(public navCtrl: NavController, public navParams: NavParams,public sqlPrd: RemoteSqlProvider) {
    this.selectedItem = navParams.get('item');
    this.Stand=[]
    this.sqlPrd.select( "SELECT numStand FROM EXPOSER WHERE idExposant="+this.selectedItem.id, null, this.Stand ) ;

  }

  /**
   * Method charger au chargement de la vue.
   */
  ionViewDidLoad() {
    console.log('ionViewDidLoad ExposerPage');
  }

  /**
   * Renvoi la page vers la page d'accueil.
   */
  Accueil(){
    this.navCtrl.setRoot(HelloIonicPage);
  }

}
