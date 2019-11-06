import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import {ModeEmploiPage} from '../mode-emploi/mode-emploi';
import {ItinérairePage } from '../itinéraire/itinéraire';
import { PlanAccesPage } from '../plan-acces/plan-acces';

/**
 * Generated class for the InfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-info',
  templateUrl: 'info.html',
})
export class InfoPage {

  tab1:any;
  tab2:any;
  tab3:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.tab1=ModeEmploiPage;
    this.tab2=ItinérairePage;
    this.tab3=PlanAccesPage;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InfoPage');
  }

}
