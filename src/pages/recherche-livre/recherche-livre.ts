import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql';
import { LivrePage } from '../../pages/livre/livre';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';

/**
 * Generated class for the RechercheLivrePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-recherche-livre',
  templateUrl: 'recherche-livre.html',
})

export class RechercheLivrePage implements OnInit {
  private recherche: RechercheLivreCriteres;
  private livres: Array<any>;
  private themes: Array<{ id: string, libelle: string }>;
  private trancheAges: Array<{ id: string, libelle: string }>;
  private auteurs: Array<string> ;
  private editeurs: Array<string> ;
  //Input() idExposant: number ;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public sqlPrd: RemoteSqlProvider)
    {
    this.recherche = new RechercheLivreCriteres();
    this.livres = []; // Tableau qui contiendra les livres
    this.themes = []; // Tableau qui contiendra les thèmes
    this.trancheAges = []; // Tableau qui contiendra les tranches d'âge
    this.auteurs = []; // Tableau qui contiendra les auteurs
    this.editeurs = []; // Tableau qui contiendra les éditeurs
  }


  ngOnInit() {
    
    // Charge les thèmes
    let sql = "SELECT * FROM theme_18 ORDER BY libelle";
    this.sqlPrd.select(sql, null, this.themes);

    // Charge les tranches d'âges
    sql = "SELECT * FROM trancheage_18 ORDER BY id";
    this.sqlPrd.select(sql, null, this.trancheAges);

    // Charge les auteurs
    sql = "SELECT distinct auteur FROM livre_18 ORDER BY auteur";
    this.sqlPrd.select(sql, null, this.auteurs);

    // Charge les editeurs
    sql = "SELECT distinct editeur FROM livre_18 ORDER BY editeur";
    this.sqlPrd.select(sql, null, this.editeurs);
    
    // // Charge les stands
    // sql = "SELECT * FROM stand_18";
    // this.sqlPrd.select(sql, this.stands);

    // Afficher la liste dès l'arrivée sur la page
    sql = "SELECT l.id AS id, titre, editeur, auteur, libelle, l.image AS image, nom, idStand AS numStand ";
    sql += "FROM livre_18 AS l, theme_18 AS t, exposant_18 AS e, etresur_18 AS et ";
    sql += "WHERE l.idTheme = t.id and l.idExposant = e.id "
    sql += "AND et.idExposant = l.idExposant " ;
    sql += "ORDER BY l.titre" ;
    this.sqlPrd.select( sql, [], this.livres) ;
  }


  // Au clic, affiche la liste en fonction des informations renseignées par l'utilisateur en
  onRechercheClick() {
    this.livres = [];
    
    let sql = "SELECT l.id AS id, titre, editeur, auteur, libelle, l.image AS image, nom, idTrancheAge, idStand AS numStand ";
    sql += "FROM livre_18 AS l, theme_18 AS t, exposant_18 AS e, etresur_18 AS et ";
    sql += "WHERE l.idTheme = t.id and l.idExposant = e.id ";
    sql += "AND et.idExposant = l.idExposant ";

    // Si titre rempli, prendre en compte ce qui est entré
    if (this.recherche.titre ) 
    {
      sql += " AND titre LIKE '" + '%' + this.recherche.titre + '%' + "' " ;
    }

  // Si auteur rempli et que "tous les auteurs" n'est pas sélectionné, prendre en compte l'auteur
    if (this.recherche.auteur && this.recherche.auteur != "0" ) 
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


  // si clic sur un livre de la liste affichée par la requête, dirige vers LivrePage du livre cliqué
  onLivreClick(livre) {
    this.navCtrl.push(LivrePage, { idLivre: livre.id });
  }


  // bouton accueil
  Accueil() {
    this.navCtrl.setRoot(HelloIonicPage);
  }
}


export class RechercheLivreCriteres {
  public titre: string;
  public themeId: string;
  public exposantId: number ;
  public trancheAgeId: string ;
  public auteur: string ;
  public editeur: string ;
}