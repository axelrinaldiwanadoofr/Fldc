import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql'

@Component({
  selector: 'page-theme',
  templateUrl: 'theme.html'
})
export class ThemePage 
{

  public themes: Array<{id: number, libelle: string}> ;
  
  constructor( 
    public navCtrl: NavController, 
    public navParams: NavParams,
    public sqlPrd: RemoteSqlProvider ) 
  {
    this.themes = [];
  }

  ngOnInit () {
    this.sqlPrd.select( "SELECT * FROM theme_18 ORDER BY libelle", null, this.themes );
  }
}