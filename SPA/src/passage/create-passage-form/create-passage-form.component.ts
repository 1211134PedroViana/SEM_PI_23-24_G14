import { Component } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import Passage from 'src/passageService/passage';
import { PassageService } from 'src/passageService/passage-service';

@Component({
  selector: 'app-create-passage-form',
  templateUrl: './create-passage-form.component.html',
  styleUrls: ['./create-passage-form.component.css']
})

export class CreatePassageFormComponent {

  fromFloorId: string = " "; 
  toFloorId: string = " ";
  positionX: number = 0;
  positionY: number = 0;
  direction: string = " ";

  constructor(private passageService: PassageService) { }

  onSubmit() {
    const passageData = ({
      fromFloorId: this.fromFloorId,
      toFloorId: this.toFloorId,
      location: {
        positionX: this.positionX,
        positionY: this.positionY,
        direction: this.direction
      }
    }) as Passage;

    this.passageService.createPassage(passageData)
      .pipe(
        tap((response) => {
          console.log('Passage created successfully', response);
        }),
        catchError((error) => {
          console.error('Error occurred while creating the Passage', error);
          throw error;
        })
      )
      .subscribe();
  }

}
