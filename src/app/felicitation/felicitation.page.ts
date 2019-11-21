import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-felicitation',
  templateUrl: './felicitation.page.html',
  styleUrls: ['./felicitation.page.scss'],
})
export class FelicitationPage implements OnInit {

  constructor(private route: Router) { }
  
   accueilpage()
  {
    this.route.navigate(['']);
  }
  ngOnInit() {}
}
