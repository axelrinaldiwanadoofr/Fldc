import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
/**
 * Generated class for the HistoriquePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-historique',
  templateUrl: 'historique.html',
})
export class HistoriquePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoriquePage');
  }

  Accueil(){
    this.navCtrl.setRoot(HelloIonicPage);
  }
}
