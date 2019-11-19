import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router' ;
import { RemoteSqlProvider } from '../../../providers/remotesql/remotesql';
import { FavorisProvider } from '../../../providers/favoris/favoris';
import { ToastController } from '@ionic/angular' ;
import { Marqueur } from '../../components/plan/plan.component' ;


@Component({
  selector: 'app-livre',
  templateUrl: './livre.page.html',
  styleUrls: ['./livre.page.scss'],
})
export class LivrePage implements OnInit 
{
  private id: string ;
  private titre: string ;
  private editeur: string ;
  private libelle: string ;
  private image: string ; 
  private nomExposant: string ; 
  private standId: string ;
  private auteurNom: string ;
  private auteurPrenom: string ;
  private enResume: string ;
  private commentaire: string ;

  constructor(private route:ActivatedRoute,  
    private router: Router,   
    private sqlPrd: RemoteSqlProvider,
    private favorisPrd: FavorisProvider,
    private toastCtrl: ToastController ) 
    { 
      this.id = null ;
      this.titre = null ;
      this.editeur = null ;
      this.libelle = null ;
      this.image = null ;
      this.nomExposant = null ;
      this.standId = null ;
      this.auteurNom = null ;
      this.auteurPrenom = null ;
      this.enResume = "" ;
      this.commentaire = "" ;
    }

  ngOnInit() 
  {
    let id = this.route.snapshot.paramMap.get( "id" ) ;

    if(id)
    {
      let sql = "SELECT l.id AS id, titre, editeur, auteur, libelle, l.image AS image, l.idExposant, e.nom, idTrancheAge, idStand AS numStand, p.nom as auteurNom, p.prenom as auteurPrenom, enResume, commentaire ";
      sql += " FROM livre_18 AS l" ;
      sql += " LEFT JOIN theme_18 AS t ON l.idTheme = t.id" ;
      sql += " LEFT JOIN exposant_18 AS e ON  l.idExposant = e.id" ;
      sql += " LEFT JOIN etresur_18 AS et ON et.idExposant = l.idExposant";
      sql += " LEFT JOIN personne_18 AS p ON l.auteur = p.id";
      sql += " WHERE l.id=" + id ;

      this.sqlPrd.select(sql, []).then( (data)=>
      {
        let a = data.rows[0] ;
        if( a )
        {
          this.id = a.id ;
          this.titre = a.titre ;
          this.editeur = a.editeur ;
          this.libelle = a.libelle ;
          this.image = a.image ;
          this.nomExposant = a.nom ;
          this.auteurNom = a.auteurNom ;
          this.auteurPrenom = a.auteurPrenom ;
          this.standId = a.numStand ;
          this.enResume = a.enResume ;
          this.commentaire = a.commentaire ;
        }
      }) ;
    }
  }

	onPlan()
	{
    let marqueurs = [new Marqueur( parseInt(this.standId), this.titre )] ;
    
    let navigationExtras: NavigationExtras = {
      state: {
        marqueurs: marqueurs 
      }
    };
    this.router.navigate(['/plans'], navigationExtras);
	}

	/**
	 * method qui permet d'ajouter au favorie un exposant.
	 */
	onFavoris()
	{
		this.favorisPrd.ajoute( parseInt(this.standId), null, null, "Livre: " + this.titre + " exposant: " + this.nomExposant + " stand n° " + this.standId ) ;      

		/**
		 * Permet de créer un message (toast).
		 */
		let toast = this.toastCtrl.create({
			message: 'Livre ' + this.titre + ' ajouté aux favoris',
			duration: 1000 
    }).then( (toastData)=>
    {
      toastData.present();
    }) ;
	}

}
