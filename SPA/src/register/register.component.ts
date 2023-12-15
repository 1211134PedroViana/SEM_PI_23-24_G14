import { Component } from '@angular/core';

@Component({
  selector: 'app-systemUser',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  titleText = 'SystemUser Management';
  feature1ButtonText = 'Create Register';
  feature1Route = '/register/create';

}
