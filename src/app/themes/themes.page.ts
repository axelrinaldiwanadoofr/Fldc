import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router' ;
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.page.html',
  styleUrls: ['./themes.page.scss'],
})

export class ThemesPage implements OnInit 
{
  private themes: Array<any> ;

  constructor(
    private router: Router,
    private sqlPrd: RemoteSqlProvider )
  {
    this.themes = [] ;
  }

  ngOnInit() 
  {
    this.themes = [] ;
    
    let sql = "SELECT * FROM theme_18 WHERE 1=1" ;
    sql +=" ORDER BY libelle";

    this.sqlPrd.select(sql, null, this.themes ) ;
  }

  
}
