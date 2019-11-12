import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router' ;
import { RemoteSqlProvider } from '../../../providers/remotesql/remotesql';
import { FavorisProvider } from '../../../providers/favoris/favoris';
import { ToastController } from '@ionic/angular' ;
import { Marqueur } from '../../components/plan/plan.component' ;


@Component({
  selector: 'app-rdv',
  templateUrl: './rdv.page.html',
  styleUrls: ['./rdv.page.scss'],
})
export class RdvPage implements OnInit 
{
  private rdvId: string ;
	private r: {id:number, idStand:number, titre:string, jour:string, heure:string, duree: string, description: string, age: string, type: string, nomExposant: string} ;
	private personnes: Array<{nom: string, pernom: string}> ;


  constructor(
    private route: ActivatedRoute,
    private sqlPrd: RemoteSqlProvider,
		private favorisPrd: FavorisProvider,
    private toastCtrl: ToastController,
    private router: Router ) 
	{
    this.r = { 
      id:null, 
      idStand:null, 
      titre:"", 
      jour:"", 
      heure:"", 
      duree: "", 
      description: "", 
      age: "", 
      type: "", 
      nomExposant: ""
    } ;

		this.personnes = [] ;
	}

	/**
	 * Method charger pendant l'initialisation de la page. 
	 */
	ngOnInit()
	{
    this.rdvId = this.route.snapshot.paramMap.get( "id" ) ; 
    
    let sql = "SELECT rdv_18.id as id, idStand, rdv_18.nom as titre, jour, heure, duree, rdv_18.description as description, libelle as age, typerdv_18.nom as type, exposant_18.nom as nom" ; 
    sql += " FROM rdv_18" ;
    sql += " JOIN exposant_18 ON exposant_18.id=idExposant" ;
    sql += " JOIN trancheage_18 ON trancheage_18.id=idTrancheAge" ;
    sql += " JOIN typerdv_18 ON typerdv_18.id=idTypeRdv" ;
    sql += " WHERE rdv_18.id=" + this.rdvId ;  

    this.sqlPrd.select(sql, null, null ).then((data)=>
    {
      this.r = data.rows[0] ;
    });

		sql = "SELECT nom, prenom FROM personne_18";  
		sql += " JOIN participer_18 ON personne_18.id = participer_18.idPersonne";   
		sql += " WHERE participer_18.idRDV = " + this.rdvId ;      

		this.sqlPrd.select(sql, null, this.personnes );
	}

	/**
	 * Method qui permet d'allez voir le rendez-vous sur le plan.
	 * @param r 
	 */
	onRdvPlan(r)
	{
    let navigationExtras: NavigationExtras = {
      state: {
        marqueurs: [new Marqueur( this.r.idStand, this.r.nomExposant )] 
      }
    };
    this.router.navigate(['plans'], navigationExtras);

	}

	/**
	 * Permet d'ajouter au favorie un rendez-vous.
	 * @param r 
	 */
	onFavoris()
	{
		let str = "RDV  " + this.r.titre + " " + this.r.jour ;
		if( this.r.duree == "en continu") str += " en continu" ;
		else str += " à " + this.r.heure ;

		this.favorisPrd.ajoute( this.r.idStand, 999, str ) ;

		let toast = this.toastCtrl.create({
			message: 'Rdv ajouté aux favoris',
			duration: 1000 
    }).then( (toastData)=>
    {
      toastData.present() ;
    })
	}
}
