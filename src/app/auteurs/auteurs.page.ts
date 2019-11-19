import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router' ;
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql';

@Component({
  selector: 'app-auteurs',
  templateUrl: './auteurs.page.html',
  styleUrls: ['./auteurs.page.scss'],
})
export class AuteursPage implements OnInit 
{

  private auteurs: Array<any> ;
  private rNom: string ;

  constructor(
    private router: Router,
    private sqlPrd: RemoteSqlProvider )
  {
    this.auteurs = [] ;
    this.rNom = "" ;
  }

  ngOnInit() 
  {
  }

  onRecherche()
  {
    this.auteurs = [] ;
    
    let sql = "SELECT * FROM personne_18 WHERE 1=1" ;

    if( this.rNom != "" )
    {
      sql += " AND nom like '%" + this.rNom + "%'" ;
    }

    sql +=" ORDER BY nom, prenom";

    this.sqlPrd.select(sql, null, this.auteurs ) ;
  }
}
