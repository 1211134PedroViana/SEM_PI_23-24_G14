import { Component } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { FloorMapService } from 'src/floorMapService/floorMap-service';

@Component({
  selector: 'app-load-floor-map',
  templateUrl: './load-floor-map.component.html',
  styleUrls: ['./load-floor-map.component.css']
})
export class LoadFloorMapComponent {

  constructor(private floorMapService: FloorMapService) { }

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
        }),
        catchError((error) => {
          console.error('Error occurred while loading the Floor Map', error);
          throw error;
        })
      )
      .subscribe();
  }


}
