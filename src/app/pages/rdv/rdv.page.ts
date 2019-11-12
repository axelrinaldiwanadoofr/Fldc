import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common' ;

@Component({
  selector: 'app-rdv',
  templateUrl: './rdv.page.html',
  styleUrls: ['./rdv.page.scss'],
})
export class RdvPage implements OnInit 
{

  constructor( private nav: Location ) 
  { 

  }

  ngOnInit() 
  {
  }

  onGoBack()
  {
    this.nav.back() ;
  }
}
