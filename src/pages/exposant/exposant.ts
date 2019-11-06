import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql';
import { PlansPage, PlanMarqueur} from '../plans/plans';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import { FavorisProvider } from '../../providers/favoris/favoris' ;
import { ToastController } from '@ionic/angular';
import { UnRendezVousPage } from '../un-rendez-vous/un-rendez-vous' ;

/**
 * Generated class for the ExposantPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-exposant',
  templateUrl: 'exposant.html',
})
export class ExposantPage implements OnInit 
{

	public id: number ;
	public libelle: string ;
	public image: string ;
	public description: string ;

	public stands: Array<{numStand: number, numHall: number}> ;
	public intervenants: Array<{nom: string, prenom: string, jour: string}> ;
	public rdvs: Array<any> ;

	/**
	 * Constructeur de la classe ExposantPage.
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
		public toastCtrl: ToastController)
	{
		this.stands = [];
		this.rdvs = [];
	}

  /**
   * Method charger lors de l'initialisation de l'exposant.
   */
  ngOnInit()
  {
    let id = this.navParams.get("id");
    if(id)
    {
      let sqlCommand = "SELECT id, nom, image, description FROM exposant_18 where id = " + id ;
      this.sqlPrd.select(sqlCommand, []).then( (data)=>
      {
        let e = data.rows[0] ;
        if( e )
        {
          this.id = e.id ;
          this.libelle = e.nom ;
          this.image = e.image ;
          this.description = e.description ;
        }
        
        // Liste des stands
        let sqlCommand = "SELECT * FROM stand_18 "
        sqlCommand += "JOIN etresur_18 ON stand_18.id = etresur_18.idStand "
        sqlCommand += "JOIN exposant_18 ON etresur_18.idExposant = exposant_18.id "
        sqlCommand += "WHERE exposant_18.id = " + id

        this.sqlPrd.select(sqlCommand, []).then((data)=>
        {
          data.rows.forEach( (s)=>
          {
            this.stands.push( {numStand: s.idStand, numHall: s.hall.substr(0,1)} ) ;
          })
        }) ;

        // Liste des RDV
        sqlCommand = "SELECT DISTINCT  exposant_18.nom as nomExposant, rdv_18.id, rdv_18.idExposant, stand_18.id as idStand, rdv_18.duree, rdv_18.jour, rdv_18.heure, rdv_18.nom, rdv_18.nbMaxPlace, rdv_18.description, trancheage_18.libelle as age, typerdv_18.nom as typeRdv "
        sqlCommand += "FROM rdv_18 "
        sqlCommand += "LEFT JOIN stand_18 ON rdv_18.idStand = stand_18.id "
        sqlCommand += "LEFT JOIN trancheage_18 ON rdv_18.idTrancheAge = trancheage_18.id "
        sqlCommand += "JOIN typerdv_18 ON rdv_18.idTypeRDV = typerdv_18.id "
        sqlCommand += "JOIN exposant_18 ON rdv_18.idExposant = exposant_18.id "
        sqlCommand += "WHERE rdv_18.idExposant = ? "
        sqlCommand += "ORDER BY rdv_18.jour DESC, rdv_18.heure ASC"

        this.sqlPrd.select(sqlCommand, [this.id], this.rdvs);
      }) ;
    }
  }
	  
  	/**
	 * Permet d'afficher l'exposant sur le plan.
	 */
	onPlan()
	{
		let m = [];
		this.stands.forEach((es) => {
			m.push( new PlanMarqueur( es.numStand, this.libelle )) ;
		});
		this.navCtrl.push( PlansPage, {marqueurs: m} )
	}

 	/**
	  * Method qui permet d'allez ver un rendez-vous.
	  * @param r 
	  */
	onRdv(r: any)
	{
		this.navCtrl.push(UnRendezVousPage, {rdv: r});
	}

	/**
	 * method qui permet d'ajouter au favorie un exposant.
	 */
	onFavoris()
	{
		this.stands.forEach((s) =>
		{
			this.favorisPrd.ajoute( s.numStand, this.id, this.libelle ) ;      
		});

		/**
		 * Permet de créer un message (toast).
		 */
		let toast = this.toastCtrl.create({
			message: 'Exposant ' + this.libelle + ' ajouté aux favoris',
			duration: 1000 
		});
		toast.present();
	}

	/**
	 * Renvoi la page vers la page d'accueil.
	 */
	Accueil()
	{
		this.navCtrl.setRoot(HelloIonicPage);
	}
}
