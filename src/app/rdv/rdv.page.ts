import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql';
import { Marqueur } from '../components/plan/plan.component' ;
import { FavorisProvider } from '../../providers/favoris/favoris';
import { ToastController } from '@ionic/angular' ;


@Component({
  selector: 'app-rdv',
  templateUrl: './rdv.page.html',
  styleUrls: ['./rdv.page.scss'],
})
export class RdvPage implements OnInit 
{
  public themes: Array<{id: number, libelle: string}> ;
  public ages: Array<{id: number, libelle: string}> ;

  public desTheme: Array<{id:number}>;
  public unJour: string;
  public uneHeure :string;
  public uneTranche:number;
  public unTheme:number;
  public uneDuree:string;
  public uneTrancheAge : Array<{id:number}>;

  public typesRDV: Array<{id: number, nom: string}>;
  public unTypeRDV: number;

  public mesRDV: Array<{id:number, idStand:number, nom:string, jour:string, heure:string, duree: string, description: string, age: string, type: string, nomExposant: string}>;

  constructor(
    private router: Router,
    public sqlPrd: RemoteSqlProvider,
    public favorisPrd: FavorisProvider,
    public toastCtrl: ToastController )
  {

    this.themes = [] ;    
    this.typesRDV = [];
    this.ages = [] ;
    this.desTheme=[];

    let d: Date = new Date() ;

    if( !d.getDay()  ) this.unJour="dimanche";
    else this.unJour="samedi";

    this.uneHeure = d.getHours() + ":" + d.getMinutes() ;
    this.uneTranche=0;
    this.unTheme=0;
    this.uneTrancheAge=[];
    this.unTypeRDV=0;
    this.uneDuree="";
    this.mesRDV=[];
  }

  ngOnInit () {
    this.sqlPrd.select( "SELECT * FROM theme_18 ORDER BY libelle", null, this.themes) ;

    let sql = "SELECT distinct trancheage_18.id as id, libelle";
    sql += " FROM trancheage_18";
    sql += " JOIN  rdv_18 ON  trancheage_18.id=rdv_18.idTrancheAge";
    sql += " ORDER BY trancheage_18.id" ;
    this.sqlPrd.select( sql, null, this.ages ) ;

    this.sqlPrd.select( "SELECT * FROM typerdv_18 ORDER BY nom", null, this.typesRDV) ;

    console.log(this.typesRDV);

  }

  onSearch() {

    this.mesRDV = [] ;


      //
      // Recherche si l'utilisateur ne saisi ni tranche d'age ni theme
      //
      let sql = "SELECT DISTINCT rdv_18.id, rdv_18.idStand, jour, heure, duree, rdv_18.nom, nbMaxPlace, rdv_18.description as description, trancheage_18.libelle as age, typerdv_18.nom as type, e.nom as nomExposant, idExposant";
      sql +=" FROM trancheage_18";
      sql +=" JOIN rdv_18 ON trancheage_18.id = rdv_18.idTrancheAge";
      sql +=" JOIN typerdv_18 ON rdv_18.idTypeRDV = typerdv_18.id";
      sql +=" JOIN parlerde_18 ON rdv_18.id = parlerde_18.idRDV";
      sql +=" JOIN theme_18 ON parlerde_18.idTheme = theme_18.id";
      sql +=" JOIN exposant_18 as e ON rdv_18.idExposant = e.id";
      sql +=" WHERE jour = '" + this.unJour + "'"; 

      if(this.unTheme != 0){
        sql += " AND theme_18.id = " + this.unTheme; 
      }

      if(this.unTypeRDV != 0){
        sql += " AND typerdv_18.id = " + this.unTypeRDV;
      }

      if(this.uneTranche != 0){
        sql += " AND trancheage_18.id = " + this.uneTranche;
      }

      if(this.unTypeRDV == 11){
        sql += " AND HOUR(heure) <= HOUR('19:00:00')"; 
      }  
      else{
        sql +=" AND HOUR(heure) >= HOUR('" + this.uneHeure + "')";
      }

      sql += " order by jour desc, heure";

      this.sqlPrd.select(sql, null, this.mesRDV);
  }

  onUnRendezVous( r )
  {
//    this.navCtrl.push( UnRendezVousPage, {rdv: r}) ;
  }

  onPlan()
  {
    let marqueurs = [] ;
    this.mesRDV.forEach( (r)=>
    {
      marqueurs.push( new Marqueur( r.idStand, r.nom ) ) ;
    });

    let navigationExtras: NavigationExtras = {
      state: {
        marqueurs: marqueurs 
      }
    };
    this.router.navigate(['plans'], navigationExtras);
  }

  onFavoris( r )
  {
    let str = "RDV  " + r.nom + " " + r.date ;
    if( r.duree == "en continu") str += " en continu" ;
    else str += " à " + r.heure ;

    this.favorisPrd.ajoute( r.idStand, 999, str ) ;

    let toast = this.toastCtrl.create({
      message: 'Rdv ajouté aux favoris',
      duration: 1000 
    }).then( (td)=>
    {
      td.present() ;
    })
  }

  presentationpage()
  {
    this.router.navigate(['/tab3']);
  }

}
