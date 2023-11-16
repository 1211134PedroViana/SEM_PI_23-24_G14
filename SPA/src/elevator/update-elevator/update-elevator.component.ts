import { Component } from '@angular/core';
import {ElevatorService} from "../../elevatorService/elevator.service";

@Component({
  selector: 'app-update-elevator',
  templateUrl: './update-elevator.component.html',
  styleUrls: ['./update-elevator.component.css']
})
export class UpdateElevatorComponent {

  isVisible: boolean = false;

  constructor(private elevatorService: ElevatorService) { }

  ngOnInit() {
    this.elevatorService.getFormVisibility().subscribe((isVisible) => {
      this.isVisible = isVisible;
    });
  }

}
