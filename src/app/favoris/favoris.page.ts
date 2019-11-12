import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.page.html',
  styleUrls: ['./favoris.page.scss'],
})
export class FavorisPage implements OnInit {

  constructor(private route: Router) { }
  tab3page()
  {
    this.route.navigate(['/tab3']);
  }
  ngOnInit() {
  }

}
