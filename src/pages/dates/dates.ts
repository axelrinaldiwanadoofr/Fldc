import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';

/**
 * Generated class for the DatesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-dates',
  templateUrl: 'dates.html',
})
export class DatesPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DatesPage');
  }
  Accueil(){
    this.navCtrl.setRoot(HelloIonicPage);
  }
}
