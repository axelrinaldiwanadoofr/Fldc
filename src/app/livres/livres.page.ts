import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router' ;
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql';
import { Marqueur } from '../components/plan/plan.component' ;
import { FavorisProvider } from '../../providers/favoris/favoris';
import { ToastController } from '@ionic/angular' ;


@Component({
  selector: 'app-livres',
  templateUrl: './livres.page.html',
  styleUrls: ['./livres.page.scss'],
})

export class LivresPage implements OnInit 
{
  private recherche: RechercheLivreCriteres;
  private livres: Array<any>;
  private themes: Array<{ id: string, libelle: string }>;
  private trancheAges: Array<{ id: string, libelle: string }>;
  private auteurs: Array<{id: number, nom:string, prenom: string}> ;
  private editeurs: Array<string> ;
  //Input() idExposant: number ;

  constructor(
    private route: Router,
    private sqlPrd: RemoteSqlProvider,
    private toastCtrl: ToastController,
    private favorisPrd: FavorisProvider)
    {
    this.recherche = new RechercheLivreCriteres();
    this.livres = []; // Tableau qui contiendra les livres
    this.themes = []; // Tableau qui contiendra les thèmes
    this.trancheAges = []; // Tableau qui contiendra les tranches d'âge
    this.auteurs = []; // Tableau qui contiendra les auteurs
    this.editeurs = []; // Tableau qui contiendra les éditeurs
  }


  ngOnInit() 
  {
    
    // Charge les thèmes
    let sql = "SELECT * FROM theme_18 ORDER BY libelle";
    this.sqlPrd.select(sql, null, this.themes);

    // Charge les tranches d'âges
    sql = "SELECT * FROM trancheage_18 ORDER BY id";
    this.sqlPrd.select(sql, null, this.trancheAges);

    // Charge les auteurs
    sql = "SELECT distinct p.id, nom, prenom" ;
    sql += " FROM personne_18 as p" ;
    sql += " INNER JOIN livre_18 as l ON p.id=l.auteur" ;
    sql += " ORDER BY nom, prenom";
    this.sqlPrd.select(sql, null, this.auteurs);

    // Charge les editeurs
    sql = "SELECT distinct editeur FROM livre_18 ORDER BY editeur";
    this.sqlPrd.select(sql, null, this.editeurs);
    
    // Afficher la liste dès l'arrivée sur la page
    sql = "SELECT l.id AS id, titre, editeur, auteur, libelle, l.image AS image, l.idExposant, e.nom, idTrancheAge, idStand AS numStand, p.nom as auteurNom, p.prenom as auteurPrenom ";
    sql += " FROM livre_18 AS l" ;
    sql += " LEFT JOIN theme_18 AS t ON l.idTheme = t.id" ;
    sql += " LEFT JOIN exposant_18 AS e ON  l.idExposant = e.id" ;
    sql += " LEFT JOIN etresur_18 AS et ON et.idExposant = l.idExposant";
    sql += " LEFT JOIN personne_18 AS p ON l.auteur = p.id";
    sql += " WHERE 1=1";
    sql += " ORDER BY l.titre" ;
    this.sqlPrd.select( sql, [], this.livres) ;
  }


  // Au clic, affiche la liste en fonction des informations renseignées par l'utilisateur en
  onRechercheClick() 
  {
    this.livres = [];
    
    let sql = "SELECT l.id AS id, titre, editeur, auteur, libelle, l.image AS image, l.idExposant, e.nom, idTrancheAge, idStand AS numStand, p.nom as auteurNom, p.prenom as auteurPrenom ";
    sql += " FROM livre_18 AS l" ;
    sql += " LEFT JOIN theme_18 AS t ON l.idTheme = t.id" ;
    sql += " LEFT JOIN exposant_18 AS e ON  l.idExposant = e.id" ;
    sql += " LEFT JOIN etresur_18 AS et ON et.idExposant = l.idExposant";
    sql += " LEFT JOIN personne_18 AS p ON l.auteur = p.id";
    sql += " WHERE 1=1";

    // Si titre rempli, prendre en compte ce qui est entré
    if (this.recherche.titre ) 
    {
      sql += " AND titre LIKE '" + '%' + this.recherche.titre + '%' + "' " ;
    }

  // Si auteur rempli et que "tous les auteurs" n'est pas sélectionné, prendre en compte l'auteur
    if (this.recherche.auteur && this.recherche.auteur != 0 ) 
    {
      sql += " AND auteur LIKE '" + '%' + this.recherche.auteur + '%' + "' " ;
    }

    // Si editeur rempli et que "tous les editeurs" n'est pas sélectionné, prendre en compte l'editeur
    if (this.recherche.editeur && this.recherche.editeur != "0" ) 
    {
      sql += " AND editeur LIKE '" + '%' + this.recherche.editeur + '%' + "' " ;
    }

    // Si thème rempli et que "aucun" n'est pas sélectionné, prendre en compte le thème
    if( this.recherche.themeId && this.recherche.themeId != "0" ) 
    {
      sql += " AND idTheme=" + this.recherche.themeId ;
    }

    // Si tranche d'âge remplie et que "toutes les tranches d'âge" n'est pas sélectionné, prendre en compte la tranche d'âge
    if( this.recherche.trancheAgeId && this.recherche.trancheAgeId != "0" ) 
    {
      sql += " AND idTrancheAge=" + this.recherche.trancheAgeId ;
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

export class RechercheLivreCriteres 
{
  public titre: string;
  public themeId: string;
  public exposantId: number ;
  public trancheAgeId: string ;
  public auteur: number ;
  public editeur: string ;
}