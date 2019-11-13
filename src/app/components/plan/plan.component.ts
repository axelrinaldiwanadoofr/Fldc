import { Component, OnInit, Input, Output, EventEmitter, ViewChildren } from '@angular/core';
import { RemoteSqlProvider } from '../../../providers/remotesql/remotesql';
import { ToastController } from '@ionic/angular' ;


@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss'],
})
export class PlanComponent implements OnInit 
{

  //@ViewChildren( "Marqueur" ) public marqueurs : Array<Marqueur>;

  @Input( 'newzone') public newZoneOk: string ;
  @Input( 'idplaceholder') public idPlaceholder: string ;

  @Output() matchZone = new EventEmitter() ;
  
  // Propriété pour l'interface de définition des zones
  private idZone: number ;
  private nbClick: number ;
  private coord: RectCoord ;

  // Propriétés des marqueurs
  private marqueurs: Array<Marqueur> ;
  private marqueurImage: string ;
  private marqueurWidth: number ;
  private marqueurHeight: number ;

  private zones: Array<Zone> ; 
  private plans: Array<Plan> ;
  private plan: Plan ;
  private planId : number ;

  private static cpt: number = 0 ; 

  constructor(    
    public toastCtrl: ToastController, 
    public sqlPrd: RemoteSqlProvider ) 
  {
    this.plans = [] ;
    this.planId = PlanComponent.cpt++ ;

    this.nbClick = 0 ;
    this.coord = null ;
    this.zones = new Array<Zone>() ;

    // Propriétés de marqueurs
    this.marqueurs = [] ;
    this.marqueurImage = "assets/img/pokeball.png" ;
    this.marqueurWidth = 20 ;
    this.marqueurHeight = 20 ;
  }

  ngOnInit()
  {
    // Charge les zones du plan
    this.loadZones() ;
    
    setInterval( ()=>
    {
      this.updateMarqueurs() ;
    },500) ;
  }

  /**
  * @ngdoc method
  * @name loadZones
  * @description
  * Charge toutes les zones du plan
  */
  loadZones()
  {
    return this.sqlPrd.select( "select * from planzones", null ).then( (data)=>
    {
      // Cree les zones
      for( let i=0 ; i<data.rows.length ; i++ )
      {
        let z = data.rows[i] ;
        this.zones.push( new Zone( z.plan, z.id, 
          new RectCoord( parseFloat(z.x1), parseFloat(z.y1), parseFloat(z.x2), parseFloat(z.y2) ) ) ) ;
      }

      // Affiche les marqueurs
      if( this.marqueurs.length )
      {
        //this.cacheTousLesTitresDePlan() ;

        this.marqueurs.forEach( (m)=>
        {
          this.marqueZone( m.idZone, m.titre ) ;
        })
      }
    }) ;    
  }

  addPlan( plan )
  {
    this.plans.push( plan ) ;
    this.plan = new Plan( this.plans[0].nom, null, null ) ;    
  }

  /**
  * @ngdoc method
  * @name onClick
  * @param {any} $event Evenement 
  * @description
  * Methode événementielle appelée quand on clique sur une zone. 
  * Si la zone existe, emet l'évenement "matchZone" avec le numéro de la zone
  */
  onClick( $event )
  {
    // Selection d'une zone
    let x = 100 * $event.offsetX/$event.target.width ;
    let y = 100 * $event.offsetY/$event.target.height ;
    let zone = this.getMatchingZone( this.plan.nom, x, y ) ;

    if( !this.coord )
    {
      if( zone ) 
      {
        this.matchZone.emit( {idZone: zone.id } ) ;
        return ;
      }
    }

    if( this.newZoneOk == "true" )
    {
      if( this.coord )
      {
        this.nbClick++ ;

        let ok = this.coord.setByClick( 
          this.nbClick, 
          100 * $event.offsetX/$event.target.width, 
          100 * $event.offsetY/$event.target.height ) ;

        if( ok )
        {
          // Efface puis insere une nouvelle zone
          if( !this.plan ) console.error( "PlanComponent: directive plan non renseignée" ) ;

          zone = this.getZoneById( this.idZone ) ;

          if( zone )
          {
            zone.setRect( this.coord ) ;
            this.sqlPrd.update( "planzones", ["plan","id"], zone.getData() ) ;          
            this.coord = null ;
            
            let toast = this.toastCtrl.create({
              message: 'Zone n° ' + this.idZone + ' enregistrée dans le plan ' + this.plan.nom,
              duration: 1000 
            }).then( (toastData)=>
            {
              toastData.present();
            });
          }
          else
          {
            zone = new Zone( this.plan.nom, this.idZone, this.coord ) ;
            this.sqlPrd.insert( "planzones", zone.getData() ) ;
            this.zones.push( zone ) ;
            this.coord = null ;

            let toast = this.toastCtrl.create({
              message: 'Zone n° ' + this.idZone + ' enregistrée dans le plan ' + this.plan.nom,
              duration: 1000 
            }).then( (toastData)=>
            {
              toastData.present();
            });
          }
        }
      }
      else
      {
        // Ajout d'une nouvelle zone
        let nz = prompt( "Entrer le " + this.idPlaceholder ) ;

        if( nz )
        {
          this.idZone = parseInt( nz ) ;

          let toast = this.toastCtrl.create({
            message: 'Cliquez dans le coin supérieur gauche puis de dans le coin inférieur droit de la zone',
            duration: 1000
          }).then( (toastData)=>
          {
            toastData.present();
          });
          
          this.nbClick = 0 ;
          this.coord = new RectCoord() ;
        }    
      }
    }
  }

  /**
  * @ngdoc method 
  * @name getZoneById
  * @param zoneId: number
  * @returns Zone une zone
  * @description
  * Recherche une zone à partir de son n° identifiant
  */
  getZoneById( idZone: number ): Zone
  {
    return this.zones.find( (zone)=>
    {
      return zone.id == idZone ;     
    }) ;
  }

  getMatchingZone( planNom: string, x: number, y: number ): Zone
  {
    return this.zones.find( (zone)=>
    {
      return zone.matchPoint( planNom, x, y ) ;     
    }) ;
  }
  
  ajouteMarqueur( idZone: number, titre: string=null )
  {
    this.marqueurs.push( new Marqueur( idZone, titre )) ;
  }

  marqueZone( idZone: number, titre: string = null, marqueurImage: string = null, marqueurWidth: number = null, marqueurHeight: number = null )
  {    
    let zone = this.getZoneById( idZone ) ;

    if( zone )
    {
      this.plan.nom = zone.plan ;
      this.afficheTitreDePlan( zone.plan ) ;

      let marqueurs = document.getElementById( "marqueurs_" + this.plan.nom + this.planId ) as HTMLImageElement ;
      let imgplan = document.getElementById( "img_" + this.plan.nom + this.planId )  as HTMLImageElement;        

      let x = (zone.x1 + zone.x2) * imgplan.clientWidth / 200 ;
      let y = (zone.y1 + zone.y2) * imgplan.clientHeight / 200 ;
      
      let marqueur = document.createElement( "div" ) ;
      marqueur.style.position = "absolute" ;
      marqueur.style.left = x + "px" ;
      marqueur.style.top = y + "px" ;
      marqueur.id = "" + idZone ;

      let img = document.createElement( "img" ) ;
      if( marqueurImage ) img.src = marqueurImage ;
      else img.src = this.marqueurImage ;
      if( marqueurWidth ) img.style.width = marqueurWidth + "px" ;
      else img.style.width = this.marqueurWidth + "px" ;
      if( marqueurHeight ) img.style.height = marqueurHeight + "px" ;
      else img.style.height = this.marqueurHeight + "px" 
      marqueur.appendChild( img ) ;    

      if( titre )
      {
        let text = document.createElement( "p" ) ;
        text.style.color = "#FF0000" ;
        text.style.fontSize = "10" ;
        text.innerHTML = titre ;
        marqueur.appendChild( text ) ;    
      }
      
      marqueurs.appendChild( marqueur ) ;    
    }
  }

  updateMarqueurs()
  {
    let marqueurs = document.getElementById( "marqueurs_" + this.plan.nom + this.planId )  as HTMLImageElement;
    let imgplan = document.getElementById( "img_" + this.plan.nom + this.planId ) as HTMLImageElement ;        

    if( marqueurs )
    {
      for( let i=0 ; i<marqueurs.children.length ; i++ )
      {
        let marqueur = marqueurs.children[i] as HTMLImageElement ;
        let idZone = parseInt(marqueur.id) ;
        let zone = this.getZoneById( idZone ) ;

        if( zone )
        {
          let x = (zone.x1 + zone.x2) * imgplan.clientWidth / 200 ;
          let y = (zone.y1 + zone.y2) * imgplan.clientHeight / 200 ;    
          marqueur.style.left = x + "px" ;
          marqueur.style.top = y + "px" ;
        }
      }
    }    
  }

  supprimeMarqueurs()
  {
    let $this = this ;
    this.marqueurs = [] ;
    this.plans.forEach( (p)=>
    {
      let e = document.getElementById( "marqueurs_" + p.nom + $this.planId ) ;
      if( e ) e.innerHTML = "" ;      
    }) ;
  }  

  afficheTitreDePlan( nomPlan: string )
  {
    this.plans.find( (p)=>
    {
      return p.nom == nomPlan ;
    }).afficheTitre = true ;

  }

  cacheTousLesTitresDePlan()
  {
    this.plans.forEach( (p)=>
    {
      p.afficheTitre = false ;
    })
  }
}

export class ZoneCoord
{
  constructor()
  {

  }

  setByClick( numClick: number, x: number, y: number ) : boolean
  {
    return true ;
  }

  matchPoint( x: number, y: number ) : boolean
  {
    return false ;
  }
}

export class RectCoord extends ZoneCoord
{
  constructor( public x1: number = 0, public y1: number = 0, public x2: number = 0, public y2: number = 0 )
  {
    super();
  }

  setByClick( numClick: number, x: number, y: number ) : boolean
  {
    if( numClick == 1 )
    {
      this.x1 = x ;
      this.y1 = y ;
      return false ;
    }
    else
    {
      this.x2 = x ;
      this.y2 = y ;
      return true ;
    }
  }
  
  matchPoint( x: number, y: number ) : boolean
  {
    if( x < this.x1 ) return false ;
    if( x > this.x2 ) return false ;
    if( y < this.y1 ) return false ;
    if( y > this.y2 ) return false ;
    return true ;
  }
}

export class Zone
{
  public plan: string ;
  public id: number ;
  public x1: number ;
  public x2: number ;
  public y1: number ;
  public y2: number ;

  constructor( plan: string, id: number, rect: RectCoord )
  {
    this.plan = plan ;
    this.id = id ;
    this.x1 = rect.x1 ;
    this.y1 = rect.y1 ;
    this.x2 = rect.x2 ;
    this.y2 = rect.y2 ;
  }

  setRect( rect: RectCoord )
  {
    this.x1 = rect.x1 ;
    this.y1 = rect.y1 ;
    this.x2 = rect.x2 ;
    this.y2 = rect.y2 ;
  }
  
  matchPoint( plan: string, x: number, y: number ) : boolean
  {
    if( plan != this.plan ) return false ;
    if( x < this.x1 ) return false ;
    if( x > this.x2 ) return false ;
    if( y < this.y1 ) return false ;
    if( y > this.y2 ) return false ;
    return true ;
  }

  getData(): any
  {
    return {
      plan: this.plan,
      id: this.id,
      x1: this.x1,
      y1: this.y1,
      x2: this.x2,
      y2: this.y2 } ;
  }
}

export class Plan
{
  public nom: string ;
  public image: string ;
  public titre: string ;
  public afficheTitre: boolean ;

  constructor( nom: string, titre: string, image: string )
  {
    this.nom = nom ;
    this.titre = titre ;
    this.image = image ;
    this.afficheTitre = true ;
  }
}

export class Marqueur
{
  public idZone: number ;
  public titre: string ;

  constructor( idZone: number, titre: string )
  {
    this.idZone = idZone ;
    this.titre = titre ;
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

