import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql';
import { ThemeExposantsPage } from '../theme-exposants/theme-exposants';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
/**
 * Generated class for the RechercheThemePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-recherche-theme',
  templateUrl: 'recherche-theme.html',
})
export class RechercheThemePage {

public themes:Array<{id: number, libelle: string}>

	/**
	 * Constructeur de la class RechercheThemePage.
	 * @param navCtrl 
	 * @param navParams 
	 * @param sqlPrd 
	 */
	constructor(public navCtrl: NavController, public navParams: NavParams,public sqlPrd:RemoteSqlProvider) {
		this.themes=[];

		this.sqlPrd.select("SELECT * FROM theme_18 ORDER BY libelle", null, this.themes);
	}

	/**
	 * Method qui permet d'allez vers un exposants.
	 * @param theme 
	 */
	exposants(theme){
		this.navCtrl.push(ThemeExposantsPage,{item:theme});
	}

	/**
	 * Renvoi la page vers la page d'accueil.
	 */
	Accueil(){
		this.navCtrl.setRoot(HelloIonicPage);
	}
}
