import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dateimportante',
  templateUrl: './dateimportante.page.html',
  styleUrls: ['./dateimportante.page.scss'],
})
export class DateimportantePage implements OnInit {

 constructor(private route: Router) { }
  presentationpage()
  {
    this.route.navigate(['/presentation']);
  }
  ngOnInit() {
  }

}
