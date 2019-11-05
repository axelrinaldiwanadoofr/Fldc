import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
   public appPages = [
    {
        title: 'Accueil',
        url: '',
        icon: 'home'
    },
    {
        title: 'Présentation',
        url: '/presentation',
        icon: 'desktop'
    },
    {
        title: 'Infos Pratiques',
        url: '/infopratique',
        icon: 'information-circle'
    },
    {
        title: 'Restauration',
        url: 'tabs/tab1',
        icon: 'restaurant'
    },
    {
        title: 'Recherches',
        url: 'tabs/tab3',
        icon: 'search'
    },
    {
        title: 'Carte',
        url: 'tabs/map',
        icon: 'map'
    },
    {
        title: 'Contact',
        url: '/contact',
        icon: 'call'
    },
    {
        title: 'Favoris',
        url: '/favoris',
        icon: 'star'
    },
    {
        title: 'Téléchargement',
        url: '/telechargement',
        icon: 'download'
    },
    {
        title: 'Lycée',
        url: '/lycee',
        icon: 'school'
    }
   ];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
