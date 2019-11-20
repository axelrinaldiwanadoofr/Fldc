import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-jeupirate',
  templateUrl: './jeupirate.page.html',
  styleUrls: ['./jeupirate.page.scss'],
})
export class JeupiratePage implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }
    onClickDebutJeu()
  {
    this.route.navigate(['/presentation']);
  }
}
