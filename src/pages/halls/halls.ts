import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { StandPage } from '../stand/stand';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';

/**
 * Generated class for the HallsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
	selector: 'page-halls',
	templateUrl: 'halls.html',
})
export class HallsPage {

	public halls:Array<{nom:string,numMin:number, numMax:number}>
  
	constructor(public navCtrl: NavController, public navParams: NavParams) {
		this.init();
	}
  
	ionViewDidLoad() {
		console.log('ionViewDidLoad HallsPage');
	}

	cherche(hall){
		this.navCtrl.push(StandPage,{item:hall});
	}

	init(){
		this.halls=[
			{nom:"Hall 1",numMin:0,numMax:200},
			{nom:"Hall 2",numMin:200,numMax:300},
			{nom:"Hall 3",numMin:300,numMax:400},
			{nom:"Hall 4",numMin:400,numMax:500},
			{nom:"Hall 5",numMin:500,numMax:600}
		];
	}

	Accueil(){
		this.navCtrl.setRoot(HelloIonicPage);
	}

}
