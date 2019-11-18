import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router' ;
import { RemoteSqlProvider } from '../../../providers/remotesql/remotesql';
import { FavorisProvider } from '../../../providers/favoris/favoris';
import { ToastController } from '@ionic/angular' ;
import { Marqueur } from '../../components/plan/plan.component' ;
import { ListeLivreComponent } from '../../components/liste-livre/liste-livre.component' ;
import { ListeRdvComponent } from '../../components/liste-rdv/liste-rdv.component' ;

@Component({
  selector: 'app-exposant',
  templateUrl: './exposant.page.html',
  styleUrls: ['./exposant.page.scss'],
})

export class ExposantPage implements OnInit 
{
	private id: number ;
	private libelle: string ;
	private image: string ;
	private description: string ;

	private stands: Array<{id: number, hall: string}> ;
	private intervenants: Array<{nom: string, prenom: string, jour: string}> ;
  
  @ViewChild( ListeLivreComponent, {static: true} ) private listeLivre: ListeLivreComponent ;
  @ViewChild( ListeRdvComponent, {static: true} ) private listeRdv: ListeRdvComponent ;

  constructor(private route:ActivatedRoute,  
    private router: Router,   
    private sqlPrd: RemoteSqlProvider,
    private favorisPrd: FavorisProvider,
    private toastCtrl: ToastController ) 
    { 
      this.stands = [];
      this.intervenants = [] ;
    }

  ngOnInit()
  {
    let id = this.route.snapshot.paramMap.get( "id" ) ;

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

        this.sqlPrd.select(sqlCommand, [], this.stands ) ;

        this.listeLivre.loadListe( this.id ) ;
        this.listeRdv.loadListe( this.id ) ;
      }) ;
    }
  }
	  
  	/**
	 * Permet d'afficher l'exposant sur le plan.
	 */
	onPlan()
	{
    let marqueurs = [] ;

		this.stands.forEach((es) => {
			marqueurs.push( new Marqueur( es.id, this.libelle )) ;
    });
    
    let navigationExtras: NavigationExtras = {
      state: {
        marqueurs: marqueurs 
      }
    };
    this.router.navigate(['/tabs/plans'], navigationExtras);
	}

	/**
	 * method qui permet d'ajouter au favorie un exposant.
	 */
	onFavoris()
	{
		this.stands.forEach((s) =>
		{
			this.favorisPrd.ajoute( s.id, this.id, null, "Exposant: " + this.libelle + " stand n° " + s.id ) ;      
		});

		/**
		 * Permet de créer un message (toast).
		 */
		let toast = this.toastCtrl.create({
			message: 'Exposant ' + this.libelle + ' ajouté aux favoris',
			duration: 1000 
    }).then( (toastData)=>
    {
      toastData.present();
    }) ;
	}

	onFavorisRdv(r)
	{
		this.favorisPrd.ajoute( r.idStand, null, r.id, "Rdv: " + r.nom + " " + r.jour + " " + r.heure + " stand n° " + r.idStand ) ;      

		/**
		 * Permet de créer un message (toast).
		 */
		let toast = this.toastCtrl.create({
			message: 'Rendez vous ' + r.nom + ' ajouté aux favoris',
			duration: 1000 
    }).then( (toastData)=>
    {
      toastData.present();
    }) ;
	}

}