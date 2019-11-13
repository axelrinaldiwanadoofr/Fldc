import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql';

@Component({
  selector: 'app-stands',
  templateUrl: './stands.page.html',
  styleUrls: ['./stands.page.scss'],
})

export class StandsPage implements OnInit 
{

  
  private numMin:number ;
  private numMax:number ;
  public stands:Array<{id:string}>;
  public standsOriginalList:Array<{id:string}>;
  

  constructor(private route: Router, private sqlPrd:RemoteSqlProvider) 
  { 
    this.stands=[];
    this.standsOriginalList = [] ;
    this.numMin = 0 ;
    this.numMax = 9999 ;
  }

  presentationpage()
  {
    this.route.navigate(['/tab3']);
  }

  ngOnInit() 
  {
    this.stands=[];
		this.sqlPrd.select(
			"SELECT * FROM stand_18 WHERE id >= " + this.numMin + " AND id < " + this.numMax,
			null,
			this.stands
    ).then(()=>
    {
      // Enregistre une copie de la liste originale
      this.standsOriginalList = this.stands ;
    });  
  }

  onSearchStand( event )
  {
    {
      // Reset items back to all of the items
      this.stands = this.standsOriginalList
  
      // set val to the value of the searchbar
      let value = event.target.value;
  
      // if the value is an empty string don't filter the items
      if (value && value.trim() != '') 
      {
        // Regénère la liste filtrée.
        this.stands = this.stands.filter((stand) => 
        {
          return (stand.id.indexOf(value.toLowerCase()) > -1);
        }) ;
      }
    }
  }
}
