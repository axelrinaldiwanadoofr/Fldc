import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-auteurs',
  templateUrl: './auteurs.page.html',
  styleUrls: ['./auteurs.page.scss'],
})
export class AuteursPage implements OnInit {

  constructor(private route: Router) { }
  accueilpage()
  {
    this.route.navigate(['']);
  }
  ngOnInit() {
  }

}
