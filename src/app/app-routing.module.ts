import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'tabs/plans', redirectTo: '/plans', pathMatch: 'full' },
  { path: 'tab1', loadChildren: './tab1/tab1.module#Tab1PageModule' },
  { path: 'tab3', loadChildren: './tab3/tab3.module#Tab3PageModule' },
  { path: 'contact', loadChildren: './contact/contact.module#ContactPageModule' },
  { path: 'presentation', loadChildren: './presentation/presentation.module#PresentationPageModule' },
  { path: 'infopratique', loadChildren: './infopratique/infopratique.module#InfopratiquePageModule' },
  { path: 'favoris', loadChildren: './favoris/favoris.module#FavorisPageModule' },
  { path: 'telechargement', loadChildren: './telechargement/telechargement.module#TelechargementPageModule' },
  { path: 'lycee', loadChildren: './lycee/lycee.module#LyceePageModule' },
  { path: 'auteurs', loadChildren: './auteurs/auteurs.module#AuteursPageModule' },
  { path: 'livres', loadChildren: './livres/livres.module#LivresPageModule' },
  { path: 'exposants', loadChildren: './exposants/exposants.module#ExposantsPageModule' },
  { path: 'rdvs', loadChildren: './rdv/rdv.module#RdvPageModule' },
  { path: 'themes', loadChildren: './themes/themes.module#ThemesPageModule' },
  { path: 'stands', loadChildren: './stands/stands.module#StandsPageModule' },
  { path: 'stand/:id', loadChildren: './pages/stand/stand.module#StandPageModule' },
  { path: 'historique', loadChildren: './historique/historique.module#HistoriquePageModule' },
  { path: 'plans', loadChildren: './pages/plans/plans.module#PlansPageModule' },
  { path: 'exposant/:id', loadChildren: './pages/exposant/exposant.module#ExposantPageModule' },
  { path: 'rdv/:id', loadChildren: './pages/rdv/rdv.module#RdvPageModule' },
  { path: 'theme2019', loadChildren: './theme2019/theme2019.module#Theme2019PageModule' },
  { path: 'dateimportante', loadChildren: './dateimportante/dateimportante.module#DateimportantePageModule' },
  { path: 'auteur/:id', loadChildren: './pages/auteur/auteur.module#AuteurPageModule' },
  { path: 'theme/:id', loadChildren: './pages/theme/theme.module#ThemePageModule' },
  { path: 'jeupirate', loadChildren: './jeupirate/jeupirate.module#JeupiratePageModule' },
  { path: 'livre/:id', loadChildren: './pages/livre/livre.module#LivrePageModule' },  { path: 'enigmeun', loadChildren: './enigmeun/enigmeun.module#EnigmeunPageModule' },
  { path: 'enigmedeux', loadChildren: './enigmedeux/enigmedeux.module#EnigmedeuxPageModule' },
  { path: 'enigmetrois', loadChildren: './enigmetrois/enigmetrois.module#EnigmetroisPageModule' },
  { path: 'enigmequatre', loadChildren: './enigmequatre/enigmequatre.module#EnigmequatrePageModule' },
  { path: 'enigmecinq', loadChildren: './enigmecinq/enigmecinq.module#EnigmecinqPageModule' },
  { path: 'felicitation', loadChildren: './felicitation/felicitation.module#FelicitationPageModule' },
  { path: 'piege', loadChildren: './piege/piege.module#PiegePageModule' },
  { path: 'muc', loadChildren: './muc/muc.module#MucPageModule' }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
