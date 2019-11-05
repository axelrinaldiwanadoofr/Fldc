import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-rdv',
  templateUrl: './rdv.page.html',
  styleUrls: ['./rdv.page.scss'],
})
export class RdvPage implements OnInit {

  constructor(private route: Router) { }
  accueilpage()
  {
    this.route.navigate(['']);
  }
  ngOnInit() {
  }

}
