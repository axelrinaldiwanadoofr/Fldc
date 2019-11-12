import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-theme2019',
  templateUrl: './theme2019.page.html',
  styleUrls: ['./theme2019.page.scss'],
})
export class Theme2019Page implements OnInit {

  constructor(private route: Router) { }
  presentationpage()
  {
    this.route.navigate(['/presentation']);
  }
  ngOnInit() {
  }

}
