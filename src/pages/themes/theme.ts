import { Component } from '@angular/core';
import { NavController, NavParams } from '@ionic/angular';
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql'

@Component({
  selector: 'page-theme',
  templateUrl: 'theme.html'
})
export class ThemePage2 
{

  public theme: any ;
  
  constructor( 
    public navCtrl: NavController, 
    public navParams: NavParams,
    public sqlPrd: RemoteSqlProvider ) 
  {
        //this.theme = navParams.get( 'theme' ) ;
      
        this.theme = {id:null, nom_theme:""} ;

        if( navParams.get('theme') )
        {
          let id = navParams.get('theme').id ;

          this.sqlPrd.select( "select * from theme where id=?", [id] ).then( (data)=>
          {
              this.theme = data.rows[0] ;
          }) ;
        }    
  }

  save( event, unTheme )
  {
    if( unTheme.id )
    {
      this.sqlPrd.update( "theme", ["id"], unTheme ) ;
      this.navCtrl.pop() ;
    }
    else
    {
      this.sqlPrd.select( "select max(id) as maxId from theme", null ).then( (data)=>
      {
        let newId = parseInt(data.rows[0].id) + 1 ;
        unTheme.id = newId ;
        this.sqlPrd.insert( "theme", unTheme ) ;
        this.navCtrl.pop() ;
      })
    }
  }

  delete( event, unTheme )
  {
    if( unTheme.id )
    {
      this.sqlPrd.delete( "theme", ["id"], unTheme ) ;
      this.navCtrl.pop() ;
    }
  }

}
