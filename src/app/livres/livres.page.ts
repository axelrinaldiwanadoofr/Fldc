import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-livres',
  templateUrl: './livres.page.html',
  styleUrls: ['./livres.page.scss'],
})
export class LivresPage implements OnInit {

  constructor(private route: Router) { }
  tab3page()
  {
    this.route.navigate(['/tab3']);
  }
  ngOnInit() {
  }

}
