import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router' ;
import { RemoteSqlProvider } from '../../../providers/remotesql/remotesql';
import { Marqueur } from '../plan/plan.component' ;
import { FavorisProvider } from '../../../providers/favoris/favoris';
import { ToastController } from '@ionic/angular' ;

@Component({
  selector: 'app-liste-exposant',
  templateUrl: './liste-exposant.component.html',
  styleUrls: ['./liste-exposant.component.scss'],
})

export class ListeExposantComponent implements OnInit 
{
  @Input( 'libelle') private libelle: string ;
  @Input( 'themeId') private themeId: string ;
  @Input( 'maxNbLigne') private maxNbLigne: string ;

  private exposants: Array<any> ;

  private standId: number ;
  private hideStand: boolean ;
  private hideTheme: boolean ;
  private hideListe: boolean ;

  constructor(
    private router: Router,
    private sqlPrd: RemoteSqlProvider,
    private toastCtrl: ToastController,
    private favorisPrd: FavorisProvider)
  {
    this.libelle = "" ;
    this.themeId = "0" ;
    this.standId = null ;
    this.hideStand = false ;
    this.hideTheme = false ;
    this.hideListe = false ;
    this.exposants = [] ;
    this.maxNbLigne = "4" ;
  }

  ngOnInit() 
  {

  }

  showOrHideListe()
  {
    this.hideListe = !this.hideListe ;
  }

  loadListeByTheme( themeId: string )
  {
    this.themeId = themeId ;
    this.hideTheme = true ;
    this.loadListe() ;
  }

  loadListe( standId: number=null )
  {
    if( standId )
    {
      this.standId = standId ;
      this.hideStand = true ;
    }

    this.exposants = [] ;

    let sql = "SELECT distinct stand_18.id as idStand, exposant_18.id, exposant_18.nom, exposant_18.image "
    sql += "FROM exposant_18 "
    sql += "LEFT JOIN presenter_18 ON exposant_18.id = presenter_18.idExposant "
    sql += "LEFT JOIN theme_18 ON presenter_18.idTheme = theme_18.id "
    sql += "LEFT JOIN etresur_18 ON exposant_18.id = etresur_18.idExposant "
    sql += "LEFT JOIN stand_18 ON etresur_18.idStand = stand_18.id "
    sql += "WHERE 1=1 " ;

    if( this.libelle != "" )
    {
      sql += " AND exposant_18.nom LIKE '%" + this.libelle.toLocaleUpperCase() + "%'" ;
    }

    if( this.standId )
    {
      sql += " AND idStand = " + this.standId ;
    }

    if( this.themeId && this.themeId != "0" )
    {
      sql += " AND theme_18.id = " + this.themeId ;
    }

    sql += " ORDER BY exposant_18.nom" ;

    this.sqlPrd.select(sql, null, this.exposants).then( (data)=>
    {
      if( this.exposants.length > parseInt(this.maxNbLigne) ) this.hideListe = true ;
    });
  }

  onExposant( id )
  {
    this.router.navigate( ["/exposant/" + id] ) ;
  }

  onFavoris( e )
  {
    let str = "Exposant  " + e.nom ;

    this.favorisPrd.ajoute( e.idStand, e.id, null, "Exposant: " + e.nom + " stand n° " + e.idStand ) ;

    let toast = this.toastCtrl.create({
      message: 'Exposant ajouté aux favoris',
      duration: 1000 
    }).then( (td)=>
    {
      td.present() ;
    })
  }

  onPlan( e )
  {
    let marqueurs = [] ;
    marqueurs.push( new Marqueur( e.idStand, "Exposant: " + e.nom ) ) ;

    let navigationExtras: NavigationExtras = {
      state: {
        marqueurs: marqueurs 
      }
    };
    this.router.navigate(['/plans'], navigationExtras);
  }

}
