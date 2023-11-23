import { Component, OnInit } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import Elevator from "src/elevatorService/elevator";
import Passage from "../../passageService/passage";
import {PassageService} from "../../passageService/passage.service";


@Component({
  selector: 'app-list-passage',
  templateUrl: './list-passage.component.html',
  styleUrls: ['./list-passage.component.css']
})
export class ListPassageComponent implements OnInit {

  passages: Passage[] = [];

  selectedPassage: any;

  constructor(private passageService: PassageService) { }

  ngOnInit(): void {
    this.loadPassages();
  }

  loadPassages() {
    this.passageService.getAllPassages()
      .pipe(
        tap((response) => {
          this.passages = response;
          console.log('Passages listed successfully', response);
        }),
        catchError((error) => {
          console.error('Error occurred while listing the passages', error);
          throw error;
        })
      )
      .subscribe()
  }

  isFormOpen = false;
  openForm(passage: Passage) {
    // Pass building data to the form component (e.g., using a service)
    this.passageService.openForm(passage);
    this.isFormOpen = true;
  }
}
