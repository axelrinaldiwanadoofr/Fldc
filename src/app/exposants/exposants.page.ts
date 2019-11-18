import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router' ;
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql';
import { Marqueur } from '../components/plan/plan.component' ;
import { ListeExposantComponent } from '../components/liste-exposant/liste-exposant.component' ;

@Component({
  selector: 'app-exposants',
  templateUrl: './exposants.page.html',
  styleUrls: ['./exposants.page.scss'],
})
export class ExposantsPage implements OnInit 
{
  private themes: Array<{id: string, libelle: string}> ;

  private libelle: string ;
  private themeId: string ;

  @ViewChild( ListeExposantComponent, {static: true} ) private listeExposant: ListeExposantComponent ;


  constructor(
    private router: Router,
    private sqlPrd: RemoteSqlProvider )
  {
    this.themes = [] ;
    this.themeId = "0" ;
    this.libelle = "" ;
  }

  ngOnInit()
  {
    // Charge les thèmes
    let sql = "select id, libelle from theme_18 order by libelle";
    this.sqlPrd.select( sql, null, this.themes );
  }

  onRecherche()
  {
    this.listeExposant.loadListe() ;
  }

  onExposantClick( exposant ) 
  {
    let navigationExtras: NavigationExtras = {
      state: {
        exposant: exposant 
      }
    };
    this.router.navigate(['exposant'], navigationExtras);
  }
}
