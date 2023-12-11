import { Component } from '@angular/core';

@Component({
  selector: 'app-systemUser',
  templateUrl: './systemUser.component.html',
  styleUrls: ['./systemUser.component.css']
})

export class SystemUserComponent {

  titleText = 'SystemUser Management';
  feature1ButtonText = 'Create SystemUser';
  feature1Route = '/admin/user/create';

}
