import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { Enigme1 } from '../jeuPiste/enigmes/enigme1/enigme1';

/**
 * Generated class for the RestaurantsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
    selector: 'page-jeuPiste',
    templateUrl: 'jeuPiste.html',
})
export class jeuPistePage {


    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }
 
    
    ionViewDidLoad() {
        console.log('ionViewDidLoad jeuPistePage');
    }

    // Début de l'énigme lorsqu'on clique sur le bouton 
    // de début de jeu (passage à la pages des énigmes)
    onClickDebutJeu()
  {
    this.navCtrl.push(Enigme1);
  }

}