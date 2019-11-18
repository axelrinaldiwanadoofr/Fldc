import { Component, OnInit, Input } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router' ;
import { RemoteSqlProvider } from '../../../providers/remotesql/remotesql';
import { Marqueur } from '../plan/plan.component' ;
import { FavorisProvider } from '../../../providers/favoris/favoris';
import { ToastController } from '@ionic/angular' ;


@Component({
  selector: 'app-liste-rdv',
  templateUrl: './liste-rdv.component.html',
  styleUrls: ['./liste-rdv.component.scss'],
})

export class ListeRdvComponent implements OnInit 
{
  private rdvs: Array<any>;
  private hideExposant: boolean ;
  private hideStand: boolean ;
  private exposantId: number ;
  private standId: number ;

  @Input( 'jour') private jour: string ;
  @Input( 'apresHeure') private heure: string ;
  @Input( 'typeRdvId') private typeRdvId: string ;
  @Input( 'themeId') private themeId: string ;
  @Input( 'trancheAgeId') private trancheAgeId: string ;

  constructor(
    private router: Router,
    private sqlPrd: RemoteSqlProvider,
    private toastCtrl: ToastController,
    private favorisPrd: FavorisProvider)
  {
    this.rdvs = [] ;
    this.hideExposant = false ;
    this.hideStand = false ;
    this.exposantId = null ;
    this.standId = null ;

    this.jour = "" ;
    this.heure = "" ;
    this.typeRdvId = "0" ;
    this.themeId = "0" ;
    this.trancheAgeId = "0" ;
  }

  ngOnInit() 
  {
  }

  loadListe( exposantId: number=null, standId: number=null )
  {
    if( exposantId )
    {
      this.exposantId = exposantId ;
      this.hideExposant = true ;
    } 

    if( standId )
    {
      this.standId = standId ;
      this.hideStand = true ;
    } 

    this.rdvs = [] ;

    let sql = "SELECT DISTINCT rdv_18.id, rdv_18.idStand, jour, heure, duree, rdv_18.nom, nbMaxPlace, rdv_18.description as description, trancheage_18.libelle as age, typerdv_18.nom as type, e.nom as nomExposant, idExposant";
    sql +=" FROM trancheage_18";
    sql +=" LEFT JOIN rdv_18 ON trancheage_18.id = rdv_18.idTrancheAge";
    sql +=" LEFT JOIN typerdv_18 ON rdv_18.idTypeRDV = typerdv_18.id";
    sql +=" LEFT JOIN parlerde_18 ON rdv_18.id = parlerde_18.idRDV";
    sql +=" LEFT JOIN theme_18 ON parlerde_18.idTheme = theme_18.id";
    sql +=" LEFT JOIN exposant_18 as e ON rdv_18.idExposant = e.id";
    sql +=" WHERE 1=1" ; 

    if( this.jour != "" )
    {
      sql += " AND jour = '" + this.jour + "'"
    }

    if( this.exposantId )
    {
      sql += " AND rdv_18.idExposant = " + this.exposantId ; 
    }

    if( this.themeId != "0" )
    {
      sql += " AND theme_18.id = " + this.themeId ; 
    }

    if(this.typeRdvId != "0" )
    {
      sql += " AND typerdv_18.id = " + this.typeRdvId ;
    }

    if( this.trancheAgeId != "0" )
    {
      sql += " AND trancheage_18.id = " + this.trancheAgeId ;
    }

    if( this.standId )
    {
      sql += " AND rdv_18.idStand = " + this.standId ;
    }

    if(this.typeRdvId == "11" )
    {
      sql += " AND HOUR(heure) <= HOUR('19:00:00')"; 
    }  
    else if( this.heure != "" )
    {
      sql +=" AND HOUR(heure) >= HOUR('" + this.heure + "')";
    }

    sql += " order by jour desc, heure"; 

    this.sqlPrd.select( sql, [], this.rdvs);
  }

  onFavorisRdv( r )
  {
    let str = "RDV  " + r.nom + " " + r.date ;
    if( r.duree == "en continu") str += " en continu" ;
    else str += " à " + r.heure ;

    this.favorisPrd.ajoute( r.idStand, null, r.id, "Rdv: " + r.nom + " " + r.jour + " " + r.heure + " stand n° " + r.idStand ) ;

    let toast = this.toastCtrl.create({
      message: 'Rdv ajouté aux favoris',
      duration: 1000 
    }).then( (td)=>
    {
      td.present() ;
    })
  }

  onPlanRdv( r )
  {
    let marqueurs = [] ;
    marqueurs.push( new Marqueur( r.idStand, "Rdv: " + r.nom ) ) ;

    let navigationExtras: NavigationExtras = {
      state: {
        marqueurs: marqueurs 
      }
    };
    this.router.navigate(['tabs/plans'], navigationExtras);
  }

  onRdv( id )
  {
    this.router.navigate( ["/rdv/" + id]) ;
  }
}
