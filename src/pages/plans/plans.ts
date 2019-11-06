import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { StandListExposantPage } from '../../pages/stand-list-exposant/stand-list-exposant' ;
import { PlanComponent, Plan } from '../../components/plan/plan' ;

/**
 * Generated class for the PlansPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-plans',
  templateUrl: 'plans.html',
})

export class PlansPage implements OnInit 
{

  @ViewChild(PlanComponent) plan: PlanComponent ;
  
  constructor( 
    public navCtrl: NavController, 
    public navParams: NavParams )
  {
  }

  ngOnInit()
  {
    this.plan.addPlan( new Plan("parcExpo", "Parc exposition", "assets/plans/parcExpo.png") ) ;
    this.plan.addPlan( new Plan("hall1", "N° 1", "assets/plans/hall1.png") ) ;
    this.plan.addPlan( new Plan("hall2", "N° 2", "assets/plans/hall2.png") ) ;
    this.plan.addPlan( new Plan("hall3", "N° 3", "assets/plans/hall3.png") ) ;      
    this.plan.addPlan( new Plan("hall4", "N° 4", "assets/plans/hall4.png") ) ;      
    this.plan.addPlan( new Plan("hall5", "N° 5", "assets/plans/hall5.png") ) ;      

    let marqueurs: Array<PlanMarqueur> ;
    marqueurs = this.navParams.get( "marqueurs") ;
    if( marqueurs )
    {
      this.plan.supprimeMarqueurs() ;
      marqueurs.forEach( (m)=>
      {
        this.plan.ajouteMarqueur( m.idZone, m.idZone + ": " + m.titre ) ;
      }) ;
    }
  }

  onSelectStand( event )
  {
    this.navCtrl.push( StandListExposantPage, {numStand: event.idZone } ) ;
  }  
}

export class PlanMarqueur
{
  public idZone: number ;
  public titre: string ;

  constructor( idZone: number, titre: string )
  {
    this.idZone = idZone ;
    this.titre = titre ;
  }
}