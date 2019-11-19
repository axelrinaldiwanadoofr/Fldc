import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router' ;
import { RemoteSqlProvider } from '../../../providers/remotesql/remotesql';
import { FavorisProvider } from '../../../providers/favoris/favoris';
import { ToastController } from '@ionic/angular' ;
import { Marqueur } from '../../components/plan/plan.component' ;
import { ListeLivreComponent } from '../../components/liste-livre/liste-livre.component' ;
import { ListeRdvComponent } from '../../components/liste-rdv/liste-rdv.component' ;
import { ListeExposantComponent } from '../../components/liste-exposant/liste-exposant.component' ;

@Component({
  selector: 'app-theme',
  templateUrl: './theme.page.html',
  styleUrls: ['./theme.page.scss'],
})
export class ThemePage implements OnInit 
{
  private id: string ;
  private libelle: string ;

  @ViewChild( ListeLivreComponent, {static: true} ) private listeLivre: ListeLivreComponent ;
  @ViewChild( ListeRdvComponent, {static: true} ) private listeRdv: ListeRdvComponent ;
  @ViewChild( ListeExposantComponent, {static: true} ) private listeExposant: ListeExposantComponent ;

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
      let sql = "SELECT id, libelle FROM theme_18 where id = " + id ;
      this.sqlPrd.select(sql, []).then( (data)=>
      {
        let a = data.rows[0] ;
        if( a )
        {
          this.id = a.id ;
          this.libelle = a.libelle ;
        }
        
        this.listeLivre.loadListeByTheme( this.id ) ;
        this.listeRdv.loadListeByTheme( this.id ) ;
        this.listeExposant.loadListeByTheme( this.id ) ;
      }) ;
    }
  }
}
