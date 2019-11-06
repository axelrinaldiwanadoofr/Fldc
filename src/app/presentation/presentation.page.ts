import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.page.html',
  styleUrls: ['./presentation.page.scss'],
})
export class PresentationPage implements OnInit {

  constructor(private route: Router) { }
  accueilpage()
  {
    this.route.navigate(['']);
  }
   historiquepage()
  {
    this.route.navigate(['/historique']);
  }
  datepage()
  {
      this.route.navigate(['/themes']);
  }
  themepage()
     {
         this.route.navigate(['/rdv']);
     }
  archivepage()
  {
      this.route.navigate(['/exposants']);
  }
  premierchappage()
  {
      this.route.navigate(['/exposants']);
  }
  ngOnInit() {
  }

}
