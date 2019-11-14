import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Marqueur } from '../components/plan/plan.component' ;
import { WebSqlProvider } from '../../providers/websql/websql';
import { ToastController } from '@ionic/angular';
import { FavorisProvider } from '../../providers/favoris/favoris' ;


@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.page.html',
  styleUrls: ['./favoris.page.scss'],
})

export class FavorisPage implements OnInit 
{

  private favoris: Array<{idStand: number, idExposant: number, idRdv: number, libelle: string}> ;
  
  constructor(
    private router: Router,
    private localSql: WebSqlProvider,
    private toastCtrl: ToastController,
    private favorisPrd: FavorisProvider ) 
  {
      this.favoris = [] ;
  }

  ngOnInit()
  {
    this.localSql.select( "select * from favoris", null, this.favoris ) ;
  }

  onPlan()
  {
    let marqueurs = [] ;
    this.favoris.forEach( (f)=>
    {
      if( f.idExposant ) marqueurs.push( new Marqueur( f.idStand, f.libelle ) ) ;
      else if( f.idRdv ) marqueurs.push( new Marqueur( f.idStand, f.libelle ) ) ;
      else marqueurs.push( new Marqueur( f.idStand, "" ) ) ;
    });

    let navigationExtras: NavigationExtras = {
      state: {
        marqueurs: marqueurs 
      }
    };
    this.router.navigate(['plans'], navigationExtras);
  }

  onFavorisClick( f )
  {
      if( f.idExposant )
      {
        this.router.navigate( ['/exposant/' + f.idExposant] ) ;
      }
      else if( f.idRdv )
      {
        this.router.navigate( ['/rdv/' + f.idRdv] ) ;
      }
      else
      {
        this.router.navigate( ['/stand/' + f.idStand] ) ;
      }
  }

  onRemoveFavorisClick( f )
  {
    this.favorisPrd.supprime( f.idStand, f.idExposant ) ;
    let i = this.favoris.indexOf( f ) ;
    this.favoris.splice( i, 1 ) ;
  }

  tab3page()
  {
    this.router.navigate(['/tab3']);
  }


}
