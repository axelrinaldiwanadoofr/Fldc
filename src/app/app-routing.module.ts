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
  { path: 'rdv', loadChildren: './rdv/rdv.module#RdvPageModule' },
  { path: 'themes', loadChildren: './themes/themes.module#ThemesPageModule' },
  { path: 'stands', loadChildren: './stands/stands.module#StandsPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
