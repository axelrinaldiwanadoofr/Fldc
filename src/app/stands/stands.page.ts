import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-stands',
  templateUrl: './stands.page.html',
  styleUrls: ['./stands.page.scss'],
})
export class StandsPage implements OnInit {

  constructor(private route: Router) { }
  accueilpage()
  {
    this.route.navigate(['']);
  }
  ngOnInit() {
  }

}
