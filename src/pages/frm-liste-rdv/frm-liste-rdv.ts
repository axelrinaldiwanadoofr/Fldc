import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql';
import { WebSqlProvider } from '../../providers/websql/websql';

/**
 * Generated class for the FrmListeRdvPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-frm-liste-rdv',
  templateUrl: 'frm-liste-rdv.html',
})

export class FrmListeRdvPage implements OnInit 
{

  private rdv: Array<any> ;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public sqlPrd: RemoteSqlProvider,
    public localSql: WebSqlProvider ) 
  {
    this.rdv = [] ;
  }

  ngOnInit()
  {
    let sql = "select r.id as id, numStand, date, heure, duree, titre, nbPlaceMax, resume, ta.libelle as age, tr.libelle as type" ;
    sql += " from RDV as r" ;
    sql += " left join TRANCHEAGE as ta on r.idTrancheAge=ta.id" ;
    sql += " left join TYPERDV as tr on r.typeRDV=tr.id" ;
    sql += " order by numStand, date desc, heure" ;
            
    this.sqlPrd.select( sql, null, this.rdv ) ;
  }
  

}
