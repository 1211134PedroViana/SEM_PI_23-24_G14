import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig  } from '@angular/material/snack-bar';
import { FloorService } from '../../../src/floorService/floor-service';
import { catchError, tap } from 'rxjs/operators';
import Floor from 'src/floorService/floor';

@Component({
    selector: 'app-update-floor-form',
    templateUrl: './update-floor-form.component.html',
    styleUrls: ['./update-floor-form.component.css']
})

export class UpdateFloorFormComponent {

    selectedFloor: any;

    constructor(private floorService: FloorService, private snackBar: MatSnackBar) {}

    ngOnInit() {
        this.floorService.getFloor().subscribe((floor) => {
            this.selectedFloor = floor;
        });
        console.log(this,this.selectedFloor);
    }

    closeForm () {
        this.floorService.closeForm();
    }

    onSubmit() {

        let floorData = ({
            id: this.selectedFloor.id,
            buildingId: this.selectedFloor.buildingId,
            floorNumber: this.selectedFloor.floorNumber,
            description: this.selectedFloor.description,
        }) as Floor;

        this.floorService.updateFloor(floorData)
            .pipe(
                tap((response) => {
                    console.log('Floor updated successfully', response);
                    const message = `Floor updated successfully! | FloorNumber: ${response.floorNumber} | Description: ${response.description}`;
                    this.snackBar.open(message, 'Close', {
                        duration: 5000, //5 seconds
                    });
                }),
                catchError((error) => {
                    console.error('Error occurred while updating the floor, returned code:' + error.status);
                    this.snackBar.open('Failed to updated building, returned code:' + error.status, 'Close', {
                        duration: 5000, //5 seconds
                    });
                    throw error;
                })
            )
            .subscribe();
    }
}