import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { WebSqlProvider } from '../../providers/websql/websql';
import { BrowserModule } from '@angular/platform-browser';
import 'rxjs/add/operator/map';

/*
  Generated class for the FavorisProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavorisProvider 
{

  constructor(
    public http: HttpClient,
    public localSql: WebSqlProvider ) 
    {
      console.log('Charge FavorisProvider Provider');
    }

    ajoute( idStand: number, idExposant: number=null, nomExposant: string=null )
    {
      let favoris = {idStand: idStand, idExposant: idExposant, nomExposant: nomExposant } ;

      if( idExposant )
      {
        return this.localSql.select( "select count(*) as nb from favoris where idStand=? and idExposant=?", 
        [idStand,idExposant] ).then( (data)=>
        {
          if( !data.rows[0].nb ) this.localSql.insert( "favoris", favoris ) ;
          else this.localSql.update( "favoris", ["idStand","idExposant"], favoris ) ;
        }) ;
      }
      else
      {
        return this.localSql.select( "select count(*) as nb from favoris where idStand=? and idExposant is null", 
        [idStand] ).then( (data)=>
        {
          if( !data.rows[0].nb ) this.localSql.insert( "favoris", favoris ) ;
          else this.localSql.update( "favoris", ["idStand"], favoris ) ;
        }) ;
      }      
    }

    supprime( idStand: number, idExposant: number=null )
    {
      let favoris = {idStand: idStand, idExposant: idExposant } ;

      if( idExposant )
      {
        return this.localSql.delete( "favoris", ["idStand","idExposant"], favoris ) ;
      }
      else
      {
        return this.localSql.delete( "favoris", ["idStand"], favoris ) ;
      }      
    }
}
