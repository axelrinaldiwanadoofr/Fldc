import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router' ;

//import { StandListExposantPage } from '../../pages/stand-list-exposant/stand-list-exposant' ;
import { PlanComponent, Plan, Marqueur } from '../../components/plan/plan.component' ;

@Component({
  selector: 'app-plans',
  templateUrl: './plans.page.html',
  styleUrls: ['./plans.page.scss'],
})

export class PlansPage implements OnInit 
{

  @ViewChild( PlanComponent, {static: true} ) private plan: PlanComponent ;
  
  constructor( private router: Router, private route:ActivatedRoute ) 
  {
  }

  ngOnInit()
  {
    this.plan.addPlan( new Plan("parcExpo", "Expo", "assets/plans/parcExpo.png") ) ;
    this.plan.addPlan( new Plan("hall1", "N° 1", "assets/plans/hall1.png") ) ;
    this.plan.addPlan( new Plan("hall2", "N° 2", "assets/plans/hall2.png") ) ;
    this.plan.addPlan( new Plan("hall3", "N° 3", "assets/plans/hall3.png") ) ;      
    this.plan.addPlan( new Plan("hall4", "N° 4", "assets/plans/hall4.png") ) ;      
    this.plan.addPlan( new Plan("hall5", "N° 5", "assets/plans/hall5.png") ) ;      

    let marqueurs: Array<Marqueur> ;

    this.route.queryParams.subscribe(params => 
    {
      if( this.router.getCurrentNavigation().extras.state) 
      {
        marqueurs = this.router.getCurrentNavigation().extras.state.marqueurs ;

        if( marqueurs )
        {
          this.plan.supprimeMarqueurs() ;
          marqueurs.forEach( (m)=>
          {
            this.plan.ajouteMarqueur( m.idZone, m.idZone + ": " + m.titre ) ;
          }) ;
        }
      }
    });    
  }

  onSelectStand( event )
  {
    this.router.navigate( ['/stand/' + event.idZone] ) ;
  }  
}

