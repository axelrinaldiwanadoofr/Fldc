import { Injectable } from '@angular/core';
import { WebSqlProvider } from '../../providers/websql/websql';
//import 'rxjs/add/operator/map';

/*
  Generated class for the FavorisProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FavorisProvider 
{

  constructor(
    public localSql: WebSqlProvider ) 
    {
      console.log('Charge FavorisProvider Provider');
    }

    ajoute( idStand: number, idExposant: number=null, idRdv: number=null, libelle: string=null )
    {
      let favoris = {idStand: idStand, idExposant: idExposant, idRdv: idRdv, libelle: libelle } ;

      if( idExposant )
      {
        return this.localSql.select( "select count(*) as nb from favoris where idStand=? and idExposant=?", 
        [idStand,idExposant] ).then( (data)=>
        {
          if( !data.rows[0].nb ) this.localSql.insert( "favoris", favoris ) ;
          else this.localSql.update( "favoris", ["idStand","idExposant"], favoris ) ;
        }) ;
      }
      else if( idRdv )
      {
        return this.localSql.select( "select count(*) as nb from favoris where idStand=? and idRdv=?", 
        [idStand,idRdv] ).then( (data)=>
        {
          if( !data.rows[0].nb ) this.localSql.insert( "favoris", favoris ) ;
          else this.localSql.update( "favoris", ["idStand","idRdv"], favoris ) ;
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

    supprime( idStand: number, idExposant: number=null, idRdv: number=null )
    {
      let favoris = {idStand: idStand, idExposant: idExposant, idRdv: idRdv } ;

      if( idExposant )
      {
        return this.localSql.delete( "favoris", ["idStand","idExposant"], favoris ) ;
      }
      else if( idRdv )
      {
        return this.localSql.delete( "favoris", ["idStand","idRdv"], favoris ) ;
      }
      else
      {
        return this.localSql.delete( "favoris", ["idStand"], favoris ) ;
      }      
    }
}
