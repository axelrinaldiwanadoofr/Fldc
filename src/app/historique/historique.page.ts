import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-historique',
  templateUrl: './historique.page.html',
  styleUrls: ['./historique.page.scss'],
})
export class HistoriquePage implements OnInit {

  constructor(private route: Router) { }
  presentationpage()
  {
    this.route.navigate(['/presentation']);
  }
  ngOnInit() {
  }

}
