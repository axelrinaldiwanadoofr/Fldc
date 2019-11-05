import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-lycee',
  templateUrl: './lycee.page.html',
  styleUrls: ['./lycee.page.scss'],
})
export class LyceePage implements OnInit {

  constructor(private route: Router) { }
  accueilpage()
  {
    this.route.navigate(['']);
  }
  ngOnInit() {
  }

}
