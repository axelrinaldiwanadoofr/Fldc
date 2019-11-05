import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-exposants',
  templateUrl: './exposants.page.html',
  styleUrls: ['./exposants.page.scss'],
})
export class ExposantsPage implements OnInit {

  constructor(private route: Router) { }
  accueilpage()
  {
    this.route.navigate(['']);
  }
  ngOnInit() {
  }

}
