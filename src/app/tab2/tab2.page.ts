import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

constructor(private route: Router) { }

   jeupage()
  {
    this.route.navigate(['/jeupirate']);
  }
   muc()
  {
    this.route.navigate(['/muc']);
  }
}
