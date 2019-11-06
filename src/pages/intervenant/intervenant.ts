import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import { PersonnePage } from '../personne/personne';

/**
 * Generated class for the IntervenantPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-intervenant',
  templateUrl: 'intervenant.html',
})
export class IntervenantPage {

public alpha;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.initList();
    
  }
  onThemeClicked($event, theme){
    
  }
  initList(){
  this.alpha=[
    'A','B','C','D','E','F','G','H','I','J','K','L','M',
    'N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
  }
  cherchePersonne(letter)
  {  
    this.navCtrl.push(PersonnePage, 
    {
      lettre: letter
    }) ;
  }

  Accueil(){
    this.navCtrl.setRoot(HelloIonicPage);
  }

}
