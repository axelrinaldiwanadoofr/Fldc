import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import {HistoriquePage} from '../historique/historique';
import {ThemePage} from '../theme/theme';
import {DatesPage} from '../dates/dates';


/**
 * Generated class for the PresentationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-presentation',
  templateUrl: 'presentation.html',
})
export class PresentationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PresentationPage');
  }

historique(){
this.navCtrl.push(HistoriquePage,null);
}

theme(){
  this.navCtrl.push(ThemePage,null);
}
date(){
  this.navCtrl.push(DatesPage,null);
}


}
