import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router' ;
import { RemoteSqlProvider } from '../../../providers/remotesql/remotesql';
import { Marqueur } from '../plan/plan.component' ;
import { FavorisProvider } from '../../../providers/favoris/favoris';
import { ToastController } from '@ionic/angular' ;


@Component({
  selector: 'app-liste-livre',
  templateUrl: './liste-livre.component.html',
  styleUrls: ['./liste-livre.component.scss'],
})
export class ListeLivreComponent implements OnInit 
{
  private livres: Array<any>;
  private hideExposant: boolean ;

  @Input( 'auteurId') private auteurId: string ;
  @Input( 'exposantId') private exposantId: number ;
  @Input( 'editeur') private editeur: string ;
  @Input( 'titre') private titre: string ;
  @Input( 'themeId') private themeId: string ;
  @Input( 'trancheAgeId') private trancheAgeId: string ;

  constructor(
    private route: Router,
    private sqlPrd: RemoteSqlProvider,
    private toastCtrl: ToastController,
    private favorisPrd: FavorisProvider)
  {
    this.hideExposant = false ;

    this.livres = []; // Tableau qui contiendra les livres
  }


  ngOnInit() 
  {    
    //this.onUpdateListe() ;
  }


  // Au clic, affiche la liste en fonction des informations renseignées par l'utilisateur en
  onUpdateListe( exposantId: number=null ) 
  {
    if( exposantId )
    {
      this.exposantId = exposantId ;
      this.hideExposant = true ;
    } 

    this.livres = [];
    
    let sql = "SELECT l.id AS id, titre, editeur, auteur, libelle, l.image AS image, l.idExposant, e.nom, idTrancheAge, idStand AS numStand, p.nom as auteurNom, p.prenom as auteurPrenom ";
    sql += " FROM livre_18 AS l" ;
    sql += " LEFT JOIN theme_18 AS t ON l.idTheme = t.id" ;
    sql += " LEFT JOIN exposant_18 AS e ON  l.idExposant = e.id" ;
    sql += " LEFT JOIN etresur_18 AS et ON et.idExposant = l.idExposant";
    sql += " LEFT JOIN personne_18 AS p ON l.auteur = p.id";
    sql += " WHERE 1=1";

    // Si titre rempli, prendre en compte ce qui est entré
    if (this.titre ) 
    {
      sql += " AND titre LIKE '" + '%' + this.titre + '%' + "' " ;
    }

  // Si auteur rempli et que "tous les auteurs" n'est pas sélectionné, prendre en compte l'auteur
    if (this.auteurId ) 
    {
      sql += " AND auteur=" + this.auteurId ;
    }

    if (this.exposantId ) 
    {
      sql += " AND l.idExposant=" + this.exposantId ;
    }

    // Si editeur rempli et que "tous les editeurs" n'est pas sélectionné, prendre en compte l'editeur
    if (this.editeur && this.editeur != "0" ) 
    {
      sql += " AND editeur LIKE '" + '%' + this.editeur + '%' + "' " ;
    }

    // Si thème rempli et que "aucun" n'est pas sélectionné, prendre en compte le thème
    if( this.themeId && this.themeId != "0" ) 
    {
      sql += " AND idTheme=" + this.themeId ;
    }

    // Si tranche d'âge remplie et que "toutes les tranches d'âge" n'est pas sélectionné, prendre en compte la tranche d'âge
    if( this.trancheAgeId && this.trancheAgeId != "0" ) 
    {
      sql += " AND idTrancheAge=" + this.trancheAgeId ;
    }

    // classer par titre
    sql += " ORDER BY titre" ;
    this.sqlPrd.select(sql, null, this.livres);
  }

	onFavorisLivre(l)
	{
		this.favorisPrd.ajoute( l.numStand, l.idExposant, null, "Livre: " + l.titre + " " + l.auteurNom + " chez " + l.editeur + " exposant: " + l.nom + " stand n°: " + l.numStand ) ;      

		/**
		 * Permet de créer un message (toast).
		 */
		let toast = this.toastCtrl.create({
			message: 'Livre ' + l.titre + ' ajouté aux favoris',
			duration: 1000 
    }).then( (toastData)=>
    {
      toastData.present();
    }) ;
	}


  // si clic sur un livre de la liste affichée par la requête, dirige vers LivrePage du livre cliqué
  onLivreClick(livre) 
  {
    //this.navCtrl.push(LivrePage, { idLivre: livre.id });
  }

}
