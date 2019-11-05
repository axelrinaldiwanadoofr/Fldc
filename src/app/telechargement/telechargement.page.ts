import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-telechargement',
  templateUrl: './telechargement.page.html',
  styleUrls: ['./telechargement.page.scss'],
})
export class TelechargementPage implements OnInit {

  constructor(private route: Router) { }
  accueilpage()
  {
    this.route.navigate(['']);
  }
  ngOnInit() {
  }

}
