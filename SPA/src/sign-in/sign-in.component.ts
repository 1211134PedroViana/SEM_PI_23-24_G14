import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  selectedRole: string = "";
  isVisible: boolean = true;

  constructor(private router: Router) {}

  onSubmit(): void {
    this.isVisible = false;
    if(this.selectedRole === "Campus") {
      this.router.navigate(["/campus"]);
    } else if(this.selectedRole === "Fleet"){
      this.router.navigate(["/fleet"]);
    } else {
      //ignore
    }
  }
}
