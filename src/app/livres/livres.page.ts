import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router' ;
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql';
import { ListeLivreComponent } from '../components/liste-livre/liste-livre.component' ;

@Component({
  selector: 'app-livres',
  templateUrl: './livres.page.html',
  styleUrls: ['./livres.page.scss'],
})

export class LivresPage implements OnInit 
{
  private titre: string;
  private themeId: string;
  private exposantId: number ;
  private trancheAgeId: string ;
  private auteurId: number ;
  private editeur: string ;

  private themes: Array<{ id: string, libelle: string }>;
  private trancheAges: Array<{ id: string, libelle: string }>;
  private auteurs: Array<{id: number, nom:string, prenom: string}> ;
  private editeurs: Array<string> ;

  @ViewChild( ListeLivreComponent, {static: true} ) private listeLivre: ListeLivreComponent ;

  constructor(
    private route: Router,
    private sqlPrd: RemoteSqlProvider )
  {
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
  }


  // Au clic, affiche la liste en fonction des informations renseignées par l'utilisateur en
  onRechercheClick() 
  {
    this.listeLivre.onUpdateListe() ;
  }
}

