import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

constructor(private route: Router) { }
  standpage()
  {
    this.route.navigate(['/stands']);
  }
  themepage()
  {
      this.route.navigate(['/themes']);
  }
  rdvpage()
  {
         this.route.navigate(['/rdv']);
  }
  exposantpage()
  {
      this.route.navigate(['/exposants']);
  }
  livrepage()
  {
      this.route.navigate(['/livres']);
  }
  auteurpage()
  {
      this.route.navigate(['/auteurs']);
  }
  favorispage()
  {
      this.route.navigate(['/favoris']);
  }
}
