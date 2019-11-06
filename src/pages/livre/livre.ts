import { Component, OnInit } from '@angular/core';
import { NavController, NavParams} from '@ionic/angular';
//import { FavorisProvider } from '../../providers/favoris/favoris';
import { RemoteSqlProvider } from '../../providers/remotesql/remotesql';
import { HelloIonicPage } from '../hello-ionic/hello-ionic';
import { ExposantPage } from '../../pages/exposant/exposant' ;
import { StandListExposantPage } from '../../pages/stand-list-exposant/stand-list-exposant';
/**
 * Generated class for the LivrePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-livre',
  templateUrl: 'livre.html',
})
export class LivrePage implements OnInit 
{
  public idLivre: number ;
  public titre: string ;
  public enResume: string ;
  public auteur: string ;
  public editeur: string ;
  public idExposant: number ;
  public image: string;
  public commentaire: string ;
  public nomExposant: string ;
  public numStand: number ;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public sqlPrd: RemoteSqlProvider,
    // public favorisPrd: FavorisProvider,
    // public toastCtrl: ToastController )
  )
    {
    }

  ngOnInit()
  {
    // récupère l'id du livre pushé par onLivreClick
    let idLivre = this.navParams.get("idLivre") ;
    
    // à partir de cet id on récupère tous les attributs de ce livre dans la base de données 
    if(idLivre)
    {
      let sqlCommand = "SELECT l.id AS id, titre, enResume, commentaire, auteur, editeur, l.idExposant, l.image AS image, nom AS nomExposant, idStand AS numStand ";
      sqlCommand += "FROM livre_18 AS l, exposant_18 AS e, etresur_18 AS et ";
      sqlCommand += "WHERE l.idExposant = e.id ";
      sqlCommand += "AND l.id = " + idLivre + " ";
      sqlCommand += "AND et.idExposant=l.idExposant";

      // on insère les attributs dans la variable data[0] (par défaut) parce qu'on peut pas les mettre directement dans livre
      this.sqlPrd.select( sqlCommand, []).then( (data)=>
      {
        // on créer une variable livre pour contenir toutes les données des attributs
        let livre = data.rows[0] ;

        // on affecte les données à notre instance de livre
        if(livre)
        {
          this.idLivre = livre.idLivre;
          this.titre = livre.titre;
          this.enResume =  livre.enResume;
          this.commentaire =  livre.commentaire;
          this.auteur = livre.auteur;
          this.editeur = livre.editeur;
          this.idExposant = livre.idExposant;
          this.image = livre.image;
          this.nomExposant = livre.nomExposant;
          this.numStand = livre.numStand;
        }
      }) ;
    }
    
  }


//  onFavoris()
//  {
//     this.stands.forEach(s =>
//     {
//       this.favorisPrd.ajoute( s.numStand, this.idLivre, this.titre ) ;      
//     })

//    let toast = this.toastCtrl.create({
//      message: this.titre + ' est ajouté aux favoris',
//      duration: 1000 
//    });
//    toast.present();
//  }


  // si clic sur l'exposant
  onExposantClick(idExposant)
  {
    this.navCtrl.push(ExposantPage, {id: idExposant }) ;
  }


  // si clic sur le num du stand
  onNumStandClick(numStand){
		this.navCtrl.push(StandListExposantPage,{numStand: numStand});
  }


  // bouton accueil
  Accueil()
  {
    this.navCtrl.setRoot(HelloIonicPage);
  }
}
