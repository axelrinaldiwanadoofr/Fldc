import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-themes',
  templateUrl: './themes.page.html',
  styleUrls: ['./themes.page.scss'],
})
export class ThemesPage implements OnInit {

  constructor(private route: Router) { }
  tab3page()
  {
    this.route.navigate(['/tab3']);
  }
  ngOnInit() {
  }

}
