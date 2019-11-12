import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'map', loadChildren: './map/map.module#MapPageModule' },
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
  { path: 'rdv/:id', loadChildren: './pages/rdv/rdv.module#RdvPageModule' },  { path: 'theme2019', loadChildren: './theme2019/theme2019.module#Theme2019PageModule' },
  { path: 'dateimportante', loadChildren: './dateimportante/dateimportante.module#DateimportantePageModule' }

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
