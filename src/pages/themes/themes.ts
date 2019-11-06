import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql';
import { ThemePage2 } from '../themes/theme' ;

@Component({
  selector: 'page-themes',
  templateUrl: 'themes.html'
})
export class ThemesPage 
{

  public themes: Array<{id: number, nom_theme: string}> ;
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlPrd: RemoteSqlProvider ) 
  {
      this.themes = [] ;

      this.sqlPrd.select( "SELECT * FROM theme_18 ORDER BY libelle", null, this.themes ) ;
  }

  onThemeClicked( event, unTheme )
  {
    this.navCtrl.push( ThemePage2, {theme: unTheme} ) ;
  }

  onNouveauTheme()
  {
    this.navCtrl.push( ThemePage2, null ) ;
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ThemesPage');
  }
}
