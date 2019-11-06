import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql';
import { PlansPage, PlanMarqueur } from '../../pages/plans/plans' ;
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import { FavorisProvider } from '../../providers/favoris/favoris' ;
import { ToastController } from '@ionic/angular';
import { UnRendezVousPage } from '../../pages/un-rendez-vous/un-rendez-vous' ;

/**
 * Generated class for the UnepersonnePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-unepersonne',
  templateUrl: 'unepersonne.html',
})
export class UnePersonnePage implements OnInit
{
  private unePersonne:  {id:number,nom:string,prenom:string};
  private dedicaces: Array<{id:number, idStand: number, libelle: string, jour: string}> ;
  private rdv: Array<{idStand: number, nom: string, date: string, heure: string, duree: string, titre: string, resume: string, age: string, type: string }>

	/**
	 * Constructeur de la classe UnePersonnePage.
	 * @param navCtrl 
	 * @param navParams 
	 * @param sqlPrd 
	 * @param favorisPrd 
	 * @param toastCtrl 
	 */
	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public sqlPrd: RemoteSqlProvider,
		public favorisPrd: FavorisProvider,
		public toastCtrl: ToastController ) 
	{
		this.unePersonne = this.navParams.get("personne");
		this.dedicaces = [] ;
		this.rdv = [] ;
	}

	/**
	 * Method charger au moment de l'initialisation.
	 */
	ngOnInit()
	{
		// Liste des dédicaces
		//SELECT rdv_18.nom,description,jour,duree,heure,idStand, trancheage_18.libelle 
		let sql = "SELECT DISTINCT jour,heure,idStand "
		sql += "FROM rdv_18 "
		sql += "JOIN participer_18 ON participer_18.idRdv = rdv_18.id "
		sql += "JOIN personne_18 ON participer_18.idPersonne = personne_18.id "
		sql += "WHERE personne_18.id = " + this.unePersonne.id;
		this.sqlPrd.select( sql, [ ], this.dedicaces ) ;

		// Liste des rdv
		sql = "SELECT rdv_18.nom, description, duree, trancheage_18.libelle as age, jour, heure, idStand ";
		sql += "FROM rdv_18 ";
		sql += "JOIN participer_18 ON rdv_18.id = participer_18.idRDV  ";
		sql += "JOIN personne_18 ON participer_18.idPersonne = personne_18.id ";
		sql += "JOIN trancheage_18 ON rdv_18.idTrancheAge = trancheage_18.id ";
		sql += "WHERE personne_18.id = " + this.unePersonne.id;
		this.sqlPrd.select( sql, [ ], this.rdv ) ;
	}

	/**
	 * Renvoi la page vers la page d'accueil.
	 */
	Accueil(){
		this.navCtrl.setRoot(HelloIonicPage);
	}

	/**
	 * ...
	 */
	onDedicacesPlan()
	{
		let m = [] ;
		this.dedicaces.forEach( (d)=> {
			m.push( new PlanMarqueur( d.idStand, d.libelle ));
		});
		this.navCtrl.push( PlansPage, {marqueurs: m} )
	}

	/**
	 * Method qui permet d'allez sur la carte (plan).
	 */
	onRdvPlan()
	{
		let $this = this ;
		let m = [] ;
		this.rdv.forEach((r)=> {
			m.push( new PlanMarqueur( r.idStand, $this.unePersonne.nom + " " + $this.unePersonne.prenom )) ;
		});
		this.navCtrl.push( PlansPage, {marqueurs: m} )
	}
  
	/**
	 * Method qui permet d'ajouter une personne en favorie.
	 */
	onFavoris()
	{
		let r = this.rdv[0] ;
		if(r)
		{
			this.favorisPrd.ajoute( r.idStand, 999, 
			"RDV avec " + this.unePersonne.nom + " " + this.unePersonne.prenom + " pour " + r.nom ) ;
		}

		let toast = this.toastCtrl.create({
			message: 'Rdv avec ' + this.unePersonne.nom + " " + this.unePersonne.prenom + ' ajouté aux favoris',
			duration: 1000 
		});
		toast.present();
	}

	/**
	 * Method qui permet d'ajouter en favorie un rendez-vous.
	 * @param r 
	 */
	onFavorisRDV(r)
	{
		let str = "RDV  " + r.nom + " " + r.jour;
		if( r.duree == "en continu") str += " en continu";
		else str += " à " + r.heure;

		this.favorisPrd.ajoute(r.idStand, 999, str);

		let toast = this.toastCtrl.create({
			message: 'Rendez-vous ajouté aux favoris',
			duration: 1000 
		});
		toast.present();
	}

	/**
	 * Method qui permet d'allez ver un render-vous.
	 * @param r 
	 */
	onRdv(r)
	{
		this.navCtrl.push( UnRendezVousPage, {rdv: r}) ;
	}

}
