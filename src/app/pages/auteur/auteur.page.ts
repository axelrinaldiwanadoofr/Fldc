import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router' ;
import { RemoteSqlProvider } from '../../../providers/remotesql/remotesql';
import { FavorisProvider } from '../../../providers/favoris/favoris';
import { ToastController } from '@ionic/angular' ;
import { ListeLivreComponent } from '../../components/liste-livre/liste-livre.component' ;
import { ListeRdvComponent } from '../../components/liste-rdv/liste-rdv.component' ;

@Component({
  selector: 'app-auteur',
  templateUrl: './auteur.page.html',
  styleUrls: ['./auteur.page.scss'],
})
export class AuteurPage implements OnInit 
{
  private id: string ;
  private nom: string ;
  private prenom: string ;

  @ViewChild( ListeLivreComponent, {static: true} ) private listeLivre: ListeLivreComponent ;
  @ViewChild( ListeRdvComponent, {static: true} ) private listeRdv: ListeRdvComponent ;

  constructor(private route:ActivatedRoute,  
    private router: Router,   
    private sqlPrd: RemoteSqlProvider,
    private favorisPrd: FavorisProvider,
    private toastCtrl: ToastController ) 
    { 
    }

  ngOnInit() 
  {
    let id = this.route.snapshot.paramMap.get( "id" ) ;

    if(id)
    {
      let sql = "SELECT id, nom, prenom FROM personne_18 where id = " + id ;
      this.sqlPrd.select(sql, []).then( (data)=>
      {
        let a = data.rows[0] ;
        if( a )
        {
          this.id = a.id ;
          this.nom = a.nom ;
          this.prenom = a.prenom ;
        }
        
        this.listeLivre.loadListe( null, parseInt(this.id) ) ;
        this.listeRdv.loadListe( null, null, parseInt(this.id) ) ;
      }) ;
    }

  }

}
