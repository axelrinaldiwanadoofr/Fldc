import { Component } from '@angular/core';

import { NavController, NavParams } from '@ionic/angular';
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql';

import { AjoutPage } from '../ajout/ajout';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  public themes: Array<{num: string}> ;
  public themes2: Array<{num: string}> ;
  public sql:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public sqlPrd: RemoteSqlProvider) {
    this.themes = [] ;
    
    this.sqlPrd.select( "SELECT * FROM STAND", null, this.themes ) ;
    this.themes2 = this.themes;
  }

  
  onThemeClicked($event, theme){
    this.navCtrl.push(AjoutPage, {
      item: theme
    })
  }  
  
  getItems(ev: any) {
    // Reset items back to all of the items
    this.themes=this.themes2

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.themes = this.themes.filter((theme) => {
        return (theme.num.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }
}
