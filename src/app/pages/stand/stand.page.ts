import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router' ;
import { RemoteSqlProvider } from '../../../providers/remotesql/remotesql';
import { FavorisProvider } from '../../../providers/favoris/favoris';
import { ToastController } from '@ionic/angular' ;
import { Marqueur } from '../../components/plan/plan.component' ;


@Component({
  selector: 'app-stand',
  templateUrl: './stand.page.html',
  styleUrls: ['./stand.page.scss'],
})
export class StandPage implements OnInit 
{
  private idStand: string ;
  private exposants: Array<any> ;
  private rdvs: Array<{
    idStand: number, 
    date: string, 
    heure: string, 
    duree: string, 
    titre: string, 
    nbPlaceMax: number, 
    resume: string, 
    age: string, 
    type: string}> ;


  constructor( private route:ActivatedRoute,     
    private sqlPrd: RemoteSqlProvider,
    private favorisPrd: FavorisProvider,
    private toastCtrl: ToastController ) 
  {
    this.exposants = [] ;
    this.rdvs = [] ;
  }
 
  ngOnInit() 
  {
    this.idStand = this.route.snapshot.paramMap.get( "id" ) ;

    if( this.idStand )
    {
      // Liste des exposants
      let sqlCommand = "SELECT DISTINCT etresur_18.idStand as idStand, exposant_18.id as idExposant, exposant_18.nom ";
      sqlCommand += "FROM exposant_18 ";
      sqlCommand += "JOIN etresur_18 ON exposant_18.id = etresur_18.idExposant "
      sqlCommand += "WHERE etresur_18.idStand = " + this.idStand

      this.sqlPrd.select(sqlCommand, [], this.exposants ) ;
      
      // Liste des RDV
      sqlCommand = "SELECT DISTINCT rdv_18.id, exposant_18.nom as nomExposant, stand_18.id as idStand, rdv_18.duree, rdv_18.jour, rdv_18.heure, rdv_18.nom, rdv_18.nbMaxPlace, rdv_18.description, trancheage_18.libelle as age, typerdv_18.nom as typeRdv "
      sqlCommand += "FROM rdv_18 "
      sqlCommand += "LEFT JOIN stand_18 ON rdv_18.idStand = stand_18.id "
      sqlCommand += "LEFT JOIN trancheage_18 ON rdv_18.idTrancheAge = trancheage_18.id "
      sqlCommand += "JOIN typerdv_18 ON rdv_18.idTypeRDV = typerdv_18.id "
      sqlCommand += "JOIN exposant_18 ON rdv_18.idExposant = exposant_18.id "
      sqlCommand += "WHERE rdv_18.idStand = ? "
      sqlCommand += "ORDER BY rdv_18.jour DESC, rdv_18.heure ASC"

      this.sqlPrd.select(sqlCommand, [this.idStand], this.rdvs);
    }     
  }

  onPlan()
  {
    let m = [new Marqueur( parseInt(this.idStand), "" )] ;
    //this.navCtrl.push( PlansPage, {marqueurs: m} )
  }

  onFavoris()
  {
    this.favorisPrd.ajoute( parseInt(this.idStand) ) ;

    let toast = this.toastCtrl.create({
      message: 'Stand n° ' + this.idStand + ' ajouté aux favoris',
      duration: 1000 
    }).then( (toastData)=>
    {
      toastData.present();
    });
  }


}
