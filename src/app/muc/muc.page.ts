import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-muc',
  templateUrl: './muc.page.html',
  styleUrls: ['./muc.page.scss'],
})
export class MucPage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }
   accueilpage()
  {
    this.route.navigate(['']);
  }
}
