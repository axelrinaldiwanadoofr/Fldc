import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql' ;
import { PlansPage, PlanMarqueur } from '../../pages/plans/plans' ;
import { ExposantPage } from '../../pages/exposant/exposant' ;
import { HelloIonicPage } from '../hello-ionic/hello-ionic';

/**
 * Generated class for the RechercheExposantPlanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-recherche-exposant-plan',
  templateUrl: 'recherche-exposant-plan.html',
})

export class RechercheExposantPlanPage implements OnInit
{  
  private recherche: RechercheExposantCriteres ;
  private exposants: Array<any> ;
  private marqueurs: Array<PlanMarqueur> ;
  private themes: Array<{id: string, libelle: string}> ;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public sqlPrd: RemoteSqlProvider ) 
  {
    this.recherche = new RechercheExposantCriteres() ;
    this.exposants = [] ;
    this.marqueurs = [] ;
    this.themes = [] ;
  }

  ngOnInit()
  {
    // Charge les thèmes
    let sql = "select id, libelle from theme_18 order by libelle";
    this.sqlPrd.select( sql, null, this.themes );

  }

  onRecherche()
  {
    this.exposants = [] ;
    this.marqueurs = [] ;

    if (this.recherche.libelle && this.recherche.themeId)
    {
      let libelle = this.recherche.libelle.toLocaleUpperCase();

      let sql = "SELECT stand_18.id as idStand, exposant_18.id, exposant_18.nom, exposant_18.image "
      sql += "FROM exposant_18 "
      sql += "JOIN presenter_18 ON exposant_18.id = presenter_18.idExposant "
      sql += "JOIN theme_18 ON presenter_18.idTheme = theme_18.id "
      sql += "JOIN etresur_18 ON exposant_18.id = etresur_18.idExposant "
      sql += "JOIN stand_18 ON etresur_18.idStand = stand_18.id "
      sql += "WHERE theme_18.id = " + this.recherche.themeId + " AND exposant_18.nom LIKE '%" + libelle + "%' "
      sql += " ORDER BY exposant_18.nom"

      this.sqlPrd.select(sql, null, this.exposants).then((data) => {
        this.exposants.forEach((e) => {
          this.marqueurs.push(new PlanMarqueur(e.idStand, e.nom))
        })
      })

    }
    else if( this.recherche.libelle )
    {
      let libelle = this.recherche.libelle.toLocaleUpperCase();

      let sql = "SELECT stand_18.id as idStand, exposant_18.id, exposant_18.nom, exposant_18.image "
      sql += "FROM exposant_18 "
      sql += "JOIN etresur_18 ON exposant_18.id = etresur_18.idExposant "
      sql += "JOIN stand_18 ON etresur_18.idStand = stand_18.id "
      sql += "WHERE exposant_18.nom LIKE '%" + libelle + "%' "
      sql += "ORDER BY exposant_18.nom"
      
      this.sqlPrd.select( sql, null, this.exposants ).then((data)=>
      {
        this.exposants.forEach( (e)=>
        {
          this.marqueurs.push( new PlanMarqueur( e.idStand, e.nom) ) ;
        }) ;
      }) ;
    }
    else if( this.recherche.themeId )
    {
      let sql = "SELECT stand_18.id as idStand, exposant_18.id, exposant_18.nom, exposant_18.image "
      sql += "FROM exposant_18 "
      sql += "JOIN presenter_18 ON exposant_18.id = presenter_18.idExposant "
      sql += "JOIN theme_18 ON presenter_18.idTheme = theme_18.id "
      sql += "JOIN etresur_18 ON exposant_18.id = etresur_18.idExposant "
      sql += "JOIN stand_18 ON etresur_18.idStand = stand_18.id "
      sql += "WHERE theme_18.id = " + this.recherche.themeId
      sql += " ORDER BY exposant_18.nom"

      console.log(this.recherche.themeId)

      this.sqlPrd.select( sql , null, this.exposants ).then((data)=>
      {
        this.exposants.forEach( (e)=>
        {
          this.marqueurs.push( new PlanMarqueur( e.idStand, e.nom) ) ;
        }) ;
      }) ;      
    }
    else
    {
      let sql = "select idStand, id, nom "
      sql += "from exposant_18 "
      sql += "JOIN etresur_18 ON id = idExposant " 
      sql += "order by nom"
      this.sqlPrd.select( sql , null, this.exposants ) ;
    }
  }

  onExposantClick( exposant ) 
  {
    this.navCtrl.push( ExposantPage, {id: exposant.id} ) ;
  }

  onPlan()
  {
    this.navCtrl.push( PlansPage, {marqueurs: this.marqueurs} )
  }

 Accueil(){
  this.navCtrl.setRoot(HelloIonicPage);
}
}


export class RechercheExposantCriteres
{
  public libelle: string ;
  public themeId: string ;
}