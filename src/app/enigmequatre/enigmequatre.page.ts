import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UsernameValidator } from '../validators/username.validator';

@Component({
  selector: 'app-enigmequatre',
  templateUrl: './enigmequatre.page.html',
  styleUrls: ['./enigmequatre.page.scss'],
})
export class EnigmequatrePage implements OnInit {

  validations_form: FormGroup;
  
  constructor( public formBuilder: FormBuilder,private route: Router) { }

  ngOnInit() {
  this.validations_form = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
       
        Validators.maxLength(25),
       
        Validators.pattern('teuqorrep'),
        
        Validators.required
      ])),
      });
  }

  validation_messages = {
    'username': [
      { type: 'required', message: 'Ecriver quelque chose.' },
      { type: 'minlength', message: 'Username must be at least 5 characters long.' },
      { type: 'maxlength', message: 'Le mot de passe ne dépasse les 25 caractères.' },
      { type: 'pattern', message: 'Mauvais mot de passe.' }
    ],
    };
  onSubmit(values){
    console.log(values);
    this.route.navigate(["/enigmecinq"]);
  }
     planspage()
  {
    this.route.navigate(['/plans']);
  }
}