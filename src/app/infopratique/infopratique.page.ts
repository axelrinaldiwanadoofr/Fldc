import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-infopratique',
  templateUrl: './infopratique.page.html',
  styleUrls: ['./infopratique.page.scss'],
})
export class InfopratiquePage implements OnInit {

  constructor(private route: Router) { }
  accueilpage()
  {
    this.route.navigate(['']);
  }
  ngOnInit() {
  }

}
