import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-auteurs',
  templateUrl: './auteurs.page.html',
  styleUrls: ['./auteurs.page.scss'],
})
export class AuteursPage implements OnInit {

  constructor(private route: Router) { }
  tab3page()
  {
    this.route.navigate(['/tab3']);
  }
  ngOnInit() {
  }

}
