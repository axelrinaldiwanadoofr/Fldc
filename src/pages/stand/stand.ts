import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql';
import { StandListExposantPage} from '../stand-list-exposant/stand-list-exposant' ;
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
/**
 * Generated class for the StandPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
	selector: 'page-stand',
	templateUrl: 'stand.html',
})
export class StandPage {

	selectedItem:any;
	public stands:Array<{id:string}>;
	public stands2:Array<{id:string}>;

	/**
	 * Constructeur de la class StandPage.
	 * @param navCtrl 
	 * @param navParams 
	 * @param sqlPrd 
	 */
	constructor(public navCtrl: NavController, public navParams: NavParams, public sqlPrd:RemoteSqlProvider) {
		this.stands=[];
		this.selectedItem=navParams.get('item');
		this.sqlPrd.select(
			"SELECT * FROM stand_18 WHERE id >= " + this.selectedItem.numMin + " AND id < " + this.selectedItem.numMax,
			null,
			this.stands
		);
		this.stands2=this.stands;
	}

	/**
	 * Method charger au moment du chargement de la vue.
	 */
	ionViewDidLoad() {
		console.log('ionViewDidLoad StandPage');
	}
	
	/**
	 * Method qui renvoi vers la liste des exposant.
	 * @param stand 
	 */
	event(stand){
		this.navCtrl.push(StandListExposantPage,{numStand:stand.id});
	}

	/**
	 * Method qui permet d'effectuer une recherche.
	 * @param ev 
	 */
	getItems(ev: any) {
		// Reset items back to all of the items
		this.stands=this.stands2

		// set val to the value of the searchbar
		let val = ev.target.value;

		// if the value is an empty string don't filter the items
		if (val && val.trim() != '') {
			this.stands = this.stands.filter((stand) => {
				return (stand.id.indexOf(val.toLowerCase()) > -1);
			})
		}
	}

	/**
	 * Renvoi la page vers la page d'accueil.
	 */
	Accueil(){
		this.navCtrl.setRoot(HelloIonicPage);
	}
}
