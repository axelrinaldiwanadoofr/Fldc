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
  

  constructor(private route: Router, private sqlPrd:RemoteSqlProvider) 
  { 
    this.stands=[];
    this.numMin = 0 ;
    this.numMax = 9999 ;
  }

  accueilpage()
  {
    this.route.navigate(['']);
  }

  ngOnInit() 
  {
    this.stands=[];
		this.sqlPrd.select(
			"SELECT * FROM stand_18 WHERE id >= " + this.numMin + " AND id < " + this.numMax,
			null,
			this.stands
		);  
  }

  onSelectStand( stand:{id:string} )
  {
    this.route.navigate(['']);
  }

  onSearchStand( event )
  {

  }

}
