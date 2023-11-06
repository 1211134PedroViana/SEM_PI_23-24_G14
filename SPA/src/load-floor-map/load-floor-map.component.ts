import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, tap } from 'rxjs/operators';
import { FloorMapService } from 'src/floorMapService/floorMap-service';

@Component({
  selector: 'app-load-floor-map',
  templateUrl: './load-floor-map.component.html',
  styleUrls: ['./load-floor-map.component.css']
})
export class LoadFloorMapComponent {

  constructor(private floorMapService: FloorMapService, private snackBar: MatSnackBar) { }

  selectedFile: File | null = null;

  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.selectedFile = fileList[0];
    }
  }

  onSubmit() {

    this.floorMapService.loadFloorMap(this.selectedFile)
      .pipe(
        tap((response) => {
          console.log('Floor Map loaded successfully', response);
          this.snackBar.open('Floor Map uploaded successfully');
        }),
        catchError((error) => {
          console.error('Error occurred while loading the Floor Map', error);
          this.snackBar.open('Failed to upload floor map');
          throw error;
        })
      )
      .subscribe();
  }


}
