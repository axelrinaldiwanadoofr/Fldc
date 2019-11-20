import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router' ;
import { RemoteSqlProvider } from '../../../providers/remotesql/remotesql';
import { FavorisProvider } from '../../../providers/favoris/favoris';
import { ToastController } from '@ionic/angular' ;
import { Marqueur } from '../../components/plan/plan.component' ;
import { ListeRdvComponent } from '../../components/liste-rdv/liste-rdv.component' ;
import { ListeExposantComponent } from '../../components/liste-exposant/liste-exposant.component' ;

@Component({
  selector: 'app-stand',
  templateUrl: './stand.page.html',
  styleUrls: ['./stand.page.scss'],
})
export class StandPage implements OnInit 
{
  private idStand: string ;

  @ViewChild( ListeRdvComponent, {static: true} ) private listeRdv: ListeRdvComponent ;
  @ViewChild( ListeExposantComponent, {static: true} ) private listeExposant: ListeExposantComponent ;

  constructor( private route:ActivatedRoute,  
    private router: Router,   
    private sqlPrd: RemoteSqlProvider,
    private favorisPrd: FavorisProvider,
    private toastCtrl: ToastController)
  {
  }
 
  ngOnInit() 
  {
    this.idStand = this.route.snapshot.paramMap.get( "id" ) ;

    if( this.idStand )
    {
      this.listeRdv.loadListe( null, parseInt(this.idStand) ) ;
      this.listeExposant.loadListe( parseInt(this.idStand) ) ;
    }     
  }

  onPlan()
  {
    let navigationExtras: NavigationExtras = {
      state: {
        marqueurs: [new Marqueur( parseInt(this.idStand), "" )] 
      }
    };
    this.router.navigate(['/plans'], navigationExtras);
  }

  onFavoris()
  {
    this.favorisPrd.ajoute( parseInt(this.idStand), null, null, "Stand n° " + this.idStand ) ;

    let toast = this.toastCtrl.create({
      message: 'Stand n° ' + this.idStand + ' ajouté aux favoris',
      duration: 1000 
    }).then( (toastData)=>
    {
      toastData.present();
    });
  }
}
