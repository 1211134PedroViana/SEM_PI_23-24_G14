import { Component } from '@angular/core';
import { PassageService } from 'src/passageService/passage.service';

@Component({
  selector: 'app-update-passage',
  templateUrl: './update-passage.component.html',
  styleUrls: ['./update-passage.component.css']
})
export class UpdatePassageComponent {

  isVisible: boolean = false;

  constructor(private passageService: PassageService) { }

  ngOnInit() {
    this.passageService.getFormVisibility().subscribe((isVisible) => {
      this.isVisible = isVisible;
    });
  }

}
